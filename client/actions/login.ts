"use server";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { RETRY } from "@/lib/constants/message-types";
import { encryptData } from "@/lib/utils";
import { loginSchema } from "@/lib/validations/login";
import { AuthError, CustomError } from "@/service/response-handler";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import * as z from "zod";
import bcrypt from "bcryptjs";

export async function login(credentials: z.infer<typeof loginSchema>) {
  const validatedfields = loginSchema.safeParse(credentials);

  if (!validatedfields.success) {
    return new AuthError("Invalid credentials", 401).toJSON();
  }

  const { email, password } = validatedfields.data;

  try {
    const response = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    const user = response[0];

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return new AuthError("Invalid credentials", 401).toJSON();
    }

    if (response.length <= 0) {
      return new AuthError("User not found", 401).toJSON();
    }

    // Encrypt user data for cookies
    const encryptedUserData = await encryptData(
      JSON.stringify({
        id: user.id,
        email: user.email,
        username: user.username,
      })
    );

    // Set the cookie
    cookies().set("userAuth", encryptedUserData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return {
      username: user.username,
      email: user.email,
      id: user.id,
      code: 200,
    };
  } catch (err) {
    console.log(err);
    return new CustomError(RETRY, "", 500).toJSON();
  }
}
