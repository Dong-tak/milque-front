"use client";

import * as React from "react";
import { useEffect } from "react";

interface InstagramFeedEmbedProps {
  url: string;
}

const InstagramFeedEmbed: React.FC<InstagramFeedEmbedProps> = ({ url }) => {
  useEffect(() => {
    // Check if the Instagram embed script is already loaded
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      // Create the script element and set its source
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => window.instgrm.Embeds.process();
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
      className="instagram-media"
      data-instgrm-captioned
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        border: "0",
        borderRadius: "3px",
        boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
        margin: "1px",
        maxWidth: "540px",
        minWidth: "326px",
        padding: "0",
        width: "99.375%",
      }}
    >
      <a
        href={url}
        style={{
          background: "#FFFFFF",
          lineHeight: "0",
          padding: "0 0",
          textAlign: "center",
          textDecoration: "none",
          width: "100%",
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram Post
      </a>
    </blockquote>
  );
};

export default InstagramFeedEmbed;
