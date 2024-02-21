import { relations } from "drizzle-orm";
import { boolean, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const flags = mysqlTable("flags", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 32 }),
	icon: varchar("icon", { length: 128 }),
	public: boolean("public"),
});
