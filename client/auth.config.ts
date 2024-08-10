import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/validations/login";
import { getUserByEmail } from "./actions/user-actions/user";
import bcrypt from "bcryptjs";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedfields = loginSchema.safeParse(credentials);
                if (validatedfields.success) {
                    const { user_identifier, password } = validatedfields.data;

                    const user = await getUserByEmail(user_identifier);

                    if (!user || !user.password) {
                        return null;
                    }

                    const doPasswordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (doPasswordMatch) {
                        return user;
                    }
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
