"use client";

import * as React from "react";
import { useEffect } from "react";

interface TiktokEmbedProps {
  content?: string;
}

const TiktokEmbed: React.FC<TiktokEmbedProps> = ({ content }) => {
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

  return <div dangerouslySetInnerHTML={{ __html: content || "" }} />;
};

export default TiktokEmbed;
