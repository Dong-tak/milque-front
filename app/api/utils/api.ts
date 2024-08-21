import { getCsrfToken } from "./csrf";

// Register function
export async function registerUser(
  email: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const csrfToken = getCsrfToken();
    console.log(csrfToken);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_API_URL}/user/verify_email/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken || "", // Include the CSRF token in the headers
        },
        body: JSON.stringify({ email }),
        credentials: "include", // Important: to send cookies (CSRF cookie)
      },
    );

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.error };
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Registration failed",
    };
  }
}

interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Verify Email function
export async function verifyEmail(code: string): Promise<{
  error: string | undefined;
  success: boolean;
  message: string;
}> {
  try {
    const csrfToken = getCsrfToken(); // Get the CSRF token from the cookie

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_API_URL}/user/verify_email/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken || "", // Include the CSRF token in the headers
        },
        body: JSON.stringify({ code }),
        credentials: "include", // Important: to send cookies (CSRF cookie)
      },
    );

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        message: data.message,
        error: undefined, // success인 경우 error는 undefined로 설정
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message,
        error: errorData.error || "Unknown error",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      error: (error as Error).message || "Unknown error", // error가 없으면 기본값 설정
    };
  }
}
