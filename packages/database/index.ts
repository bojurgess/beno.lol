import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { DatabaseError } from "@planetscale/database";
import * as schema from "./schema";

const connection = connect({
	host: process.env["DATABASE_HOST"] as string,
	username: process.env["DATABASE_USERNAME"] as string,
	password: process.env["DATABASE_PASSWORD"] as string,
});

export const db = drizzle(connection, { schema });

export { DatabaseError };
