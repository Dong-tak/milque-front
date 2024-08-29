import { cookies } from "next/headers";

interface getDataProps {
  userId: string;
}

export const getPostData = async ({ userId }: getDataProps) => {
  const baseurl = process.env.NEXT_PUBLIC_POST_API_URL;

  if (typeof baseurl === "undefined") {
    console.error("API URL is not defined");
    return;
  }

  // const cookieStore = cookies();

  // const access = cookieStore.get("accessToken");
  // const refresh = cookieStore.get("refreshToken");
  // if (!access || !refresh) {
  //   return console.log("accessToken no:", access, "refreshToken no:", refresh);
  // }
  // const accessToken = access.value;
  // const refreshToken = refresh.value;

  const url = `${baseurl}/feed/${userId}/`;
  console.log("Fetching data from:", url);
  try {
    const response = await fetch(url, {
      cache: "no-store",
      credentials: "include",
      // headers: {
      //   Authorization: `Bearer ${accessToken} ${refreshToken}`, // Authorization 헤더 추가
      //   "Content-Type": "application/json", // 필요에 따라 다른 헤더 추가
      // },
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
