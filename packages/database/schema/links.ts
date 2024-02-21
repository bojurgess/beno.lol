import { mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const links = mysqlTable("links", {
	id: varchar("id", { length: 15 }).primaryKey(),
	userId: varchar("user_id", { length: 15 }).references(() => users.id),
	action: mysqlEnum("action", ["clipboard", "link"]),
	name: varchar("name", { length: 32 }),
	icon: varchar("icon", { length: 128 }),
	content: varchar("content", { length: 256 }),
	tooltip: varchar("tooltip", { length: 32 }),
});

export const linksRelations = relations(links, ({ one, many }) => ({
	user: one(users, {
		fields: [links.userId],
		references: [users.id],
	}),
}));
