"use server";
import dotenv from "dotenv";
import { registerUser, verifyEmail } from "@/app/api/utils/api";

dotenv.config();

const POST_API_URL = process.env.POST_API_URL;

export async function handleVerifyEmail(code: string) {
  try {
    const result = await verifyEmail(code);
    console.log(result);
  } catch (error) {
    // console.error("Error in handleVerifyEmail:", error);
  }
}

handleVerifyEmail("example_code");

export async function ourverifyEmail(
  code: string,
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const response = await fetch(
      `${POST_API_URL}/user/verify_email/`, // 환경 변수를 사용하여 URL 설정
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.error };
    }
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    throw error; // 오류를 다시 던져서 handleVerifyEmail 함수로 전파
  }
}
