"use server";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { signupSchema } from "@/lib/validations/signup";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { DrizzleError, eq } from "drizzle-orm";
import {
  AuthError,
  CustomError,
  SuccessResponse,
} from "@/service/response-handler";

export async function signup(credentials: z.infer<typeof signupSchema>) {
  const validatedfields = signupSchema.safeParse(credentials);

  if (!validatedfields.success) {
    return new AuthError("Invalid credentials", 401).toJSON();
  }

  const { email, username, password } = validatedfields.data;

  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const exists = await db.select().from(users).where(eq(users.email, email));
    if (exists.length > 0) {
      return new AuthError("User already exists", 409).toJSON();
    }

    await db.insert(users).values({
      email: email,
      username: username,
      password: passwordHash,
    });

    return new SuccessResponse("User created successfully", 200).toJSON();
  } catch (err) {
    let message = "Something went wrong, could not add user";
    if (err instanceof DrizzleError) {
      message = "Something went wrong, try again later please";
    }

    return new CustomError("CUSTOM", message, 500).toJSON();
  }
}
