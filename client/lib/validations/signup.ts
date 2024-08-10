import * as z from "zod";

export const signupSchema = z.object({
    email: z.string().email({
        message:"Email is required"
    }),
    username: z.string().min(1, {
        message:"Username is required"
    }),
    password: z.string().min(6, {
        message:"Please use a longer password"
    }),
});
