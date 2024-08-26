"use client"; // Ensure this runs in the client-side environment

import dotenv from "dotenv";

dotenv.config();

const POST_API_URL = process.env.NEXT_PUBLIC_POST_API_URL;

export async function completeUserProfile(
  nickname: string,
  socialName: string,
  socialClientId: string,
  password: string,
) {
  try {
    const csrfToken = "o7XMibme54PGYFbn6z16UhrzQnrK9dkG"; // Get the CSRF token from the cookie

    if (!csrfToken) {
      throw new Error("CSRF token not found");
    }

    const response = await fetch(`${POST_API_URL}/user/complete_profile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"X-CSRFToken": csrfToken, // Include the CSRF token in the headers
      },
      body: JSON.stringify({
        nickname,
        social_name: socialName,
        social_client_id: socialClientId,
        password,
      }),
      credentials: "include", // Important: ensures cookies (including session cookie) are sent with the request
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: "Profile completed and user logged in" };
    } else {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return {
          success: false,
          error: data.message,
          message: "Profile completion failed",
        };
      } else {
        return {
          success: false,
          error: "Unexpected response format",
          message: "Profile completion failed",
        };
      }
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "An error occurred" };
  }
}
