import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Logout API 호출");
  const url = new URL(request.nextUrl.origin);
  const loginUrl = url.origin + "/login"; // 로그인 페이지 경로
  const response = NextResponse.redirect(loginUrl); // 로그아웃 후 리디렉션할 경로 설정

  // 쿠키를 적절히 삭제
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");

  return response;
}
