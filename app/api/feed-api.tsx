interface getDataProps {
  userId: string;
}

export const getPostData = async ({ userId }: getDataProps) => {
  const baseurl = process.env.NEXT_PUBLIC_POST_API_URL;

  if (typeof baseurl === "undefined") {
    console.error("API URL is not defined");
    return;
  }

  const url = `${baseurl}/feed/${userId}/`;
  console.log("Fetching data from:", url);
  try {
    const response = await fetch(url, {
      cache: "no-store",
      credentials: "include",
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
