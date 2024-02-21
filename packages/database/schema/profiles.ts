import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { themes } from "./themes";
import { userFlags } from "./userFlags";
import { links } from "./links";

export const profiles = mysqlTable("profiles", {
	id: varchar("id", { length: 15 })
		.primaryKey()
		.references(() => users.id),
	uid: serial("uid"),
	username: varchar("username", { length: 16 })
		.unique()
		.references(() => users.username),
	bio: varchar("bio", { length: 1024 }),
	avatar: varchar("avatar", { length: 128 }),
	banner: varchar("banner", { length: 128 }),
	background: varchar("background", { length: 128 }),
});

export const profilesRelations = relations(profiles, ({ one, many }) => ({
	user: one(users, {
		fields: [profiles.id],
		references: [users.id],
	}),
	links: many(links),
	themes: many(themes),
	flags: many(userFlags),
}));
