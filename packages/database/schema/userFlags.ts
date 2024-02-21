import { bigint, int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { flags } from "./flags";
import { relations } from "drizzle-orm";
import { profiles } from "./profiles";

export const userFlags = mysqlTable("user_flags", {
	id: serial("id").primaryKey(),
	userId: varchar("user_id", { length: 15 }).references(() => users.id),
	flagId: bigint("flag_id", { unsigned: true, mode: "number" }).references(() => flags.id),
});

export const userFlagsRelations = relations(userFlags, ({ one, many }) => ({
	user: one(users, {
		fields: [userFlags.userId],
		references: [users.id],
	}),
	profile: one(profiles, {
		fields: [userFlags.userId],
		references: [profiles.id],
	}),
}));
