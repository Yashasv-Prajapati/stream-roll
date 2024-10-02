import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/schema.ts",
    out: "./drizzle",
    driver:"turso",
    dialect: "sqlite",
    dbCredentials: {
        url: 'file:local.db',
        // url: 'process.env.DATABASE_URL!',
        // authToken: process.env.TURSO_DATABASE_SECRET_TOKEN
    },
    verbose: true,
    strict: true,
});
