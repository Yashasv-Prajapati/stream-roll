import * as z from "zod";

export const loginSchema = z.object({
    loginType: z.enum(["email", "username"]),
    user_identifier: z.string(),
    password: z.string(),
});
