import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { profiles } from "./profiles";

export const themes = mysqlTable("themes", {
	id: varchar("id", { length: 15 }).primaryKey(),
	author: varchar("author", { length: 15 }).references(() => users.id),
	name: varchar("name", { length: 32 }),
	primary: int("primary"),
	secondary: int("secondary"),
});

export const themesRelations = relations(themes, ({ one }) => ({
	author: one(profiles, {
		fields: [themes.author],
		references: [profiles.id],
	}),
}));
