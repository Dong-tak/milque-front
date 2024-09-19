"use server";
import dotenv from "dotenv";
import { verifyEmail } from "@/app/api/utils/api";

dotenv.config();

const POST_API_URL = process.env.NEXT_PUBLIC_POST_API_URL;

export async function handleVerifyEmail(code: string) {
  try {
    const result = await verifyEmail(code);
    console.log(result);
  } catch (error) {
    // console.error("Error in handleVerifyEmail:", error);
  }
}

handleVerifyEmail("example_code");
