// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

// 인증이 필요 없는 페이지 경로 배열
const AUTH_PAGES = ["/", "/login"];

// API 호출 함수: accessToken을 이용하여 userId 가져오기
async function getUserId(accessToken: string) {
  const apiUrl = `${process.env.NEXT_PUBLIC_POST_API_URL}/user/auth/`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`, // accessToken을 Bearer 토큰으로 보냄
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();

    // userId가 포함된 경우 반환
    if (data.user && data.user.id) {
      return data.user.id;
    } else {
      throw new Error("User ID not found");
    }
  } catch (error) {
    console.error("Error fetching userId:", error);
    return null; // 오류가 발생하면 null 반환
  }
}

export default async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const { pathname } = nextUrl;
  const accessTokenCookie = cookies.get("accessToken"); // 쿠키에서 accessToken 가져옴
  const accessToken = accessTokenCookie?.value; // 쿠키의 실제 값 가져오기

  // 로그인이 필요 없는 페이지 처리
  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    if (accessToken) {
      // accessToken이 있을 경우 userId를 가져와 리다이렉트
      const userId = await getUserId(accessToken);
      if (userId) {
        return NextResponse.redirect(`/home/${userId}`);
      }
    }
    return NextResponse.next(); // 로그인 페이지 또는 메인 페이지 처리
  }

  // 로그인이 필요한 페이지 처리
  if (!accessToken) {
    return NextResponse.redirect("/login"); // accessToken이 없으면 로그인 페이지로 리다이렉트
  }

  // accessToken이 있는 경우 userId를 가져와 리다이렉트
  const userId = await getUserId(accessToken);
  if (userId) {
    return NextResponse.next(); // 로그인되어 있는 경우 원래 요청한 페이지로 진행
  } else {
    return NextResponse.redirect("/login"); // userId를 가져올 수 없으면 로그인 페이지로 리다이렉트
  }
}
