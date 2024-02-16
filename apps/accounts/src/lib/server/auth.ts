import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db, users, sessions } from "@repo/database";

const adapter = new DrizzleMySQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev,
		},
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}
