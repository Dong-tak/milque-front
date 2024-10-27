"use client"; // Ensure this runs in the client-side environment

import { DataFetchInClient } from "@/app/api/postdata-client";
import dotenv from "dotenv";
import { useRouter } from "next/navigation";

dotenv.config();

export async function completeUserProfile(
  router: ReturnType<typeof useRouter>,
  job: string,
  isMarketed: boolean,
  username: string,
  token: string | null,
) {
  const apiUrl = `${process.env.NEXT_PUBLIC_POST_API_URL}/user/social/signup/`;
  const bodyData = { job, isMarketed, token };

  const data = await DataFetchInClient({ apiUrl, bodyData });
  console.log(data);
  router.push(`/home/${data.user.id}`);
  return { success: true, message: "Profile completed and user logged in" };
}
