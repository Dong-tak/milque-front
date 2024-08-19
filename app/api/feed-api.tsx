interface getDataProps {
  user_id: string;
}

export const getData = async ({ user_id }: getDataProps) => {
  const baseurl = process.env.POST_API_URL;

  if (typeof baseurl === "undefined") {
    console.error("API URL is not defined");
    return;
  }

  const url = `${baseurl}/feed/${user_id}/`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
