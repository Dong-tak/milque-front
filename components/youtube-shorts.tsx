import React from "react";

interface YouTubeShortsEmbedProps {
  url: string;
}

const YouTubeShortsEmbed: React.FC<YouTubeShortsEmbedProps> = ({ url }) => {
  return (
    <div
      style={{
        maxWidth: "605px",
        minWidth: "325px",
        margin: "0 auto",
        position: "relative",
        height: "100%",
      }}
    >
      <iframe
        style={{
          position: "absolute",
          width: "315px",
          height: "560px",
          border: "0",
          borderRadius: "3px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
        }}
        src={`https://www.youtube.com/embed/${url}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      ㅅ
    </div>
  );
};

export default YouTubeShortsEmbed;
