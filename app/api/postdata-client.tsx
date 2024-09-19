"use client";

interface PostDataInClientProps {
  apiUrl: string;
  bodyData?: Record<string, any>;
  isReload?: boolean;
  method?: string;
  goHome?: string;
}

export const DataFetchInClient = async ({
  apiUrl,
  bodyData,
  isReload = false,
  goHome,
  method = "POST",
}: PostDataInClientProps) => {
  try {
    const accessCookies = document.cookie.split("accessToken=")[1];
    const refreshCookies = document.cookie.split("refreshToken=")[1];
    const accessToken = accessCookies;
    const refreshToken = refreshCookies;

    const fetchOptions: RequestInit = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken} ${refreshToken}`,
      },
    };

    // bodyData가 있을 경우에만 body를 추가
    if (bodyData) {
      fetchOptions.body = JSON.stringify(bodyData);
    }

    const response = await fetch(`${apiUrl}`, fetchOptions);

    if (!response.ok) {
      throw new Error("Failed to save the content");
    }

    const data = await response.json();
    console.log("Data saved successfully:", data);

    // Reload the page or perform other actions if necessary
    if (isReload) {
      window.location.reload();
    } else if (goHome) {
      window.location.href = goHome;
    }

    return data; // Return the response data
  } catch (error) {
    console.error("Error saving data:", error);
    throw error; // Re-throw error so that the caller can handle it
  }
};
