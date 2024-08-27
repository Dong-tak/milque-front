import { cookies } from "next/headers";

interface getDataProps {
  userId: string;
  postId: string;
}

export const getPostDetailData = async ({ userId, postId }: getDataProps) => {
  const baseurl = process.env.NEXT_PUBLIC_POST_API_URL;

  if (typeof baseurl === "undefined") {
    console.error("API URL is not defined");
    return;
  }
  const cookieStore = cookies();

  const access = cookieStore.get("accessToken");
  if (!access) {
    return console.log("accessToken no:", access);
  }
  const accessToken = access.value;

  const url = `${baseurl}/feed/${userId}/${postId}/`;
  console.log("Fetching data from:", url);
  try {
    const response = await fetch(url, {
      cache: "no-store",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
        "Content-Type": "application/json", // 필요에 따라 다른 헤더 추가
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
