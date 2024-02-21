import { relations } from "drizzle-orm";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { profiles } from "./profiles";
import { userFlags } from "./userFlags";

export const users = mysqlTable("users", {
	id: varchar("id", { length: 15 }).primaryKey(),
	username: varchar("username", { length: 16 }).unique().notNull(),
	hashed_password: varchar("hashed_password", { length: 128 }).notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
	profile: one(profiles, {
		fields: [users.id],
		references: [profiles.id],
	}),
	flags: many(userFlags),
}));
