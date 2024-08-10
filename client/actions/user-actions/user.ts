import db from "@/db/drizzle"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getUserByEmail(email:string){

    const user = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if(user.length){
        return user[0];
    }
    throw new CustomError('User not found', 404);

}

export async function getUserByUsername(username:string){
    const user = await db.select().from(users).where(eq(users.username, username)).limit(1)

    if(user.length){
        return user[0];
    }

    throw new CustomError('User not found', 404);
}