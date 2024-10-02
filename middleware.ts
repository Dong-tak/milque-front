// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 현재 URL이 /login인 경우 middleware를 무시하고 진행
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next(); // /login 페이지로 접근하는 경우 무시
  }
  // 쿠키에서 accessToken을 가져옴
  const accessToken = request.cookies.get("accessToken")?.value;

  // accessToken이 없으면 /login으로 리다이렉트
  if (!accessToken) {
    const loginUrl = `${request.nextUrl.origin}/login`;
    return NextResponse.redirect(loginUrl);
  }

  //   // accessToken이 있는 경우, API로 유효성 검사
  //   const apiUrl = `${request.nextUrl.origin}/api/auth/validate_token`; // 토큰 검증 API 경로

  //   try {
  //     // 토큰 유효성 검증을 위해 API 요청을 보냄
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     // 토큰이 유효하지 않으면 /login으로 리다이렉트
  //     if (!response.ok) {
  //       const loginUrl = `${request.nextUrl.origin}/login`;
  //       return NextResponse.redirect(loginUrl);
  //     }

  //     // 토큰이 유효하면 원래 요청을 계속 진행
  //     return NextResponse.next();
  //   } catch (error) {
  //     console.error("Token validation failed:", error);
  //     const loginUrl = `${request.nextUrl.origin}/login`;
  //     return NextResponse.redirect(loginUrl);
  //   }
}

//적용할 경로 (로그인이 필요한 페이지에만 적용)
export const config = {
  matcher: ["/protected/:path*", "/"], // 예: 보호된 경로 설정
};
