import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

const connection = connect({
	host: process.env["DATABASE_HOST"] as string,
	username: process.env["DATABASE_USERNAME"] as string,
	password: process.env["DATABASE_PASSWORD"] as string,
});

export const db = drizzle(connection);
