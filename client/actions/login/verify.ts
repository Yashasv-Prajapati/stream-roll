import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { sign } from "@/lib/jwt";
import { and, eq } from "drizzle-orm";

export async function verifyLoginCredentialsAndReturnToken(
    loginType: "email" | "username",
    user_identifier: string,
    password: string
) {
    let user;

    // const passwordHash = 

    if (loginType === "email") {
        user = await db
            .select()
            .from(users)
            .where(and(eq(users.email, user_identifier), eq(users.password, password)))
            .limit(1);
    } else {
        user = await db
            .select()
            .from(users)
            .where(and(eq(users.username, user_identifier), eq(users.password, password)))
            .limit(1);
    }

    if (!user.length) {
        throw new CustomError("User not found", 404);
    }

    // generate token

    const token = sign(JSON.stringify(user), String(process.env.JWT_SECRET));

    return token;
}
