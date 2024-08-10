import { signIn } from '@/auth';
import { loginSchema } from '@/lib/validations/login';
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export async function login(credentials:z.infer<typeof loginSchema>){
    const validatedfields = loginSchema.safeParse(credentials);

    if(!validatedfields.success){
        return {error: "Invalid Credentials"};
    }

    const {user_identifier, password} = validatedfields.data;

    try{
        await signIn('credentials', {
            user_identifier,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT_URL
        })
    }catch(err){
        if(err instanceof AuthError){
            switch(err.type){
                case "CredentialsSignin":
                    return {error: "Invalid Credentials"}
                default:
                    return {error: "Something went wrong"}
            }
        }

        throw err;
    }


}
