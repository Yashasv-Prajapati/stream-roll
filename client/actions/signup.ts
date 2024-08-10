import db from '@/db/drizzle';
import { users } from '@/db/schema';
import { signupSchema } from '@/lib/validations/signup';
import { AuthError } from 'next-auth';
import * as z from 'zod';
import bcrypt from 'bcryptjs'
import { DrizzleError } from 'drizzle-orm';

export async function signup(credentials:z.infer<typeof signupSchema>){
    const validatedfields = signupSchema.safeParse(credentials);

    if(!validatedfields.success){
        return {success:false, message: "Invalid Credentials"};
    }

    const {email, username, password} = validatedfields.data;

    try{

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        db.insert(users).values({
            email:email,
            username:username,
            password:passwordHash
        })

        return {
            success:true, 
            message:"Signup Successful"
        }

    }catch(err){
        let message = "Something went wrong, could not signup"
        if(err instanceof DrizzleError){
            message = "Something went wrong, try again later please"
        }

        return {
            success:false,
            message:message,
        }
    }


}
