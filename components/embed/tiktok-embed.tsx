"use client";

import * as React from "react";
import { useEffect } from "react";

interface TiktokEmbedProps {
  content?: string;
}

const TiktokEmbed: React.FC<TiktokEmbedProps> = ({ content }) => {
  const defaultUsername = "@tarankaaa";
  const defaultVideoId = "7399985738428730632";

  let username = defaultUsername;
  let videoId = defaultVideoId;

  if (content) {
    try {
      const url = new URL(content);
      const pathSegments = url.pathname.split("/");
      if (pathSegments.length >= 3) {
        username = `@${pathSegments[1]}`;
        videoId = pathSegments[3];
      }
    } catch (error) {
      console.error("Invalid URL format:", error);
    }
  }

  useEffect(() => {
    // Check if the Instagram embed script is already loaded
    if (window.tiktok) {
      window.tiktok.Embeds.process();
    } else {
      // Create the script element and set its source
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.tiktok) {
          window.tiktok.Embeds.process();
        }
      };
      // Append the script to the document body
      document.body.appendChild(script);

      // Cleanup function to remove the script on component unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <blockquote
      className="tiktok-embed"
      cite={`https://www.tiktok.com/${username}/video/${videoId}`}
      data-video-id={videoId}
      style={{ maxWidth: "605px", minWidth: "325px" }}
    >
      <section>
        <a
          target="_blank"
          title={username}
          href={`https://www.tiktok.com/${username}?refer=embed`}
        >
          {username}
        </a>
      </section>
    </blockquote>
  );
};

export default TiktokEmbed;
