"use client";

import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

interface YouTubeEmbedProps {
  url: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    //iframeClassName: { autoplay: 1 },
    // playerVars: {
    //   autoplay: 1,
    // },
  };
  return (
    // <div className="video-responsive">
    //   <iframe
    //     width="560"
    //     height="315"
    //     src={url}
    //     title="YouTube video player"
    //     frameBorder="0"
    //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //     referrerPolicy="strict-origin-when-cross-origin"
    //     allowFullScreen
    //   ></iframe>
    // </div>
    <YouTube videoId={url} opts={opts} />
  );
};

export default YouTubeEmbed;
