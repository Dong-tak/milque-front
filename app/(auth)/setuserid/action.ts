"use client"; // Ensure this runs in the client-side environment

import dotenv from "dotenv";
import { useRouter } from "next/navigation";

dotenv.config();

const POST_API_URL = process.env.NEXT_PUBLIC_POST_API_URL;

export async function completeUserProfile(
  router: ReturnType<typeof useRouter>,
  loginId: string,
  password: string,
  job: string,
  isMarketed: boolean,
) {
  try {
    // const csrfToken = "o7XMibme54PGYFbn6z16UhrzQnrK9dkG"; // Get the CSRF token from the cookie

    // if (!csrfToken) {
    //   throw new Error("CSRF token not found");
    // }

    const response = await fetch(`${POST_API_URL}/user/complete_profile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"X-CSRFToken": csrfToken, // Include the CSRF token in the headers
      },
      body: JSON.stringify({
        loginId,
        password,
        job,
        isMarketed,
      }),
      credentials: "include", // Important: ensures cookies (including session cookie) are sent with the request
    });

    if (!response.ok) {
      // 서버에서 보내는 에러 메시지를 가져옴
      const errorData = await response.json();
      const errorMessage =
        errorData?.message || "알 수 없는 오류가 발생했습니다.";
      throw new Error(errorMessage); // 에러를 던져서 catch 블록에서 처리
    }

    const data = await response.json();
    router.push(`/home/${data.data.user}`);
    return { success: true, message: "Profile completed and user logged in" };
  } catch (error) {
    // fetch의 에러를 처리
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    console.error("프로필 생성 실패:", errorMessage);
    throw new Error(errorMessage); // 호출한 곳에서 이 에러를 처리하도록 다시 던짐
  }
}
