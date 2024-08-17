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
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        Instagram Post
      </a>
    </blockquote>
  );
};

export default InstagramFeedEmbed;
