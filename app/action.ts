"use server";

export const getData = async () => {
  const response = await fetch("http://192.168.219.192:8000/v1/feed/");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  return data.data.posts;
};
