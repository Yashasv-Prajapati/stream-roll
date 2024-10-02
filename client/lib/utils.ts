import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { sign } from "./jwt";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function encryptData(JSONString: string){
  const token = await sign(
    JSONString,
    String(process.env.JWT_SECRET)
  );
  return token;
}