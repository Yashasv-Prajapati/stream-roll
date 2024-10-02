import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";


const client = createClient({
    url: 'file:local.db' as string,
    // authToken: process.env.TURSO_DATABASE_SECRET_TOKEN,
    // authToken: 'secret',
});

const db = drizzle(client);

export default db;
