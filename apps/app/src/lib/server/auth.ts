import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@repo/database";
import { users, sessions } from "@repo/database/schema";

const adapter = new DrizzleMySQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev,
		},
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}
