import "dotenv/config";
import { betterAuth } from "better-auth";
import { Pool } from "pg";

const database = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: database,
  baseURL: process.env.BETTER_AUTH_URL ?? `http://localhost:${process.env.PORT ?? "8081"}`,
  emailAndPassword: { enabled: true },
});
