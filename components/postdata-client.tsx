import cookie from "cookie";

interface PostDataInClientProps {
  apiUrl: string;
  bodyData: Record<string, any>;
}

export const postDataInClient = async ({
  apiUrl,
  bodyData,
}: PostDataInClientProps) => {
  try {
    const cookies = cookie.parse(document.cookie);
    console.log("Cookie:", cookies);
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;

    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken} ${refreshToken}`,
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error("Failed to save the content");
    }

    const data = await response.json();
    console.log("Data saved successfully:", data);

    // Reload the page or perform other actions if necessary
    window.location.reload();

    return data; // Return the response data
  } catch (error) {
    console.error("Error saving data:", error);
    throw error; // Re-throw error so that the caller can handle it
  }
};
