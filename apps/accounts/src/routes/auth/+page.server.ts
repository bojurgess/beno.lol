import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { lucia } from "$lib/server/auth";
import { db } from "@repo/database";
import { users } from "@repo/database/schema";
import { Argon2id } from "oslo/password";
import { DatabaseError } from "@repo/database";
import { eq } from "drizzle-orm";
import { dev } from "$app/environment";

const defaultRedirect = dev ? "http://localhost:3000" : "https://beno.lol";

export const load: PageServerLoad = async ({ url, locals, cookies }) => {
	const flow = url.searchParams.get("flow") || "login";
	const goto = url.searchParams.get("redirect") || defaultRedirect;

	if (flow === "logout") {
		if (!locals.session) {
			throw redirect(302, goto);
		}

		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes,
		});

		throw redirect(302, goto);
	}

	if (locals.user) throw redirect(302, goto);

	return {
		flow,
		redirect: goto,
	};
};

export const actions: Actions = {
	signup: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 16 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: "Invalid username",
			});
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 64) {
			return fail(400, {
				message: "Invalid password",
			});
		}

		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(password);

		try {
			await db.insert(users).values({
				id: userId,
				username,
				hashed_password: hashedPassword,
			});
		} catch (e) {
			if (e instanceof DatabaseError) {
				const match = /code = (\w+)/.exec(e.message)!;

				if (match) return fail(e.status, { error: match[1] });
			}

			return fail(400);
		}

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes,
		});

		throw redirect(302, defaultRedirect);
	},

	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");

		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 16 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: "Invalid username",
			});
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 64) {
			return fail(400, {
				message: "Invalid password",
			});
		}

		const existingUser = await db.query.users.findFirst({
			where: eq(users.username, username),
		});
		if (!existingUser) {
			return fail(400, {
				error: "Incorrect username or password",
			});
		}

		const validPassword = await new Argon2id().verify(existingUser.hashed_password, password);
		if (!validPassword) {
			return fail(400, {
				error: "Incorrect username or password",
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes,
		});

		throw redirect(302, defaultRedirect);
	},
};
