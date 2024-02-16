import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: varchar("id", { length: 15 }).primaryKey(),
	username: varchar("username", { length: 16 }),
	hashed_password: varchar("hashed_password", { length: 64 }).notNull(),
});
