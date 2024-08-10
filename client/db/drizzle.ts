import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";


const client = createClient({
    url: 'http://localhost:8080' as string,
    authToken: process.env.TURSO_DATABASE_SECRET_TOKEN,
});

const db = drizzle(client);

export default db;
