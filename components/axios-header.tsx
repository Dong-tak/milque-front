import axios from "axios";

const POST_API_URL = process.env.NEXT_PUBLIC_POST_API_URL || "/";

export const httpClientForCredentials = axios.create({
  baseURL: POST_API_URL,

  withCredentials: true, // 서로 다른 도메인 간 쿠키 공유를 위해 설정
});
