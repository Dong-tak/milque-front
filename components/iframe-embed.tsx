"use client";
import React from "react";

interface ResponsiveIframeProps {
  src: string;
  title?: string;
}

const ResponsiveIframe: React.FC<ResponsiveIframeProps> = ({ src, title }) => {
  return (
    <div className="h-full w-full">
      <iframe
        src={src}
        title={title || "Embedded content"}
        tabIndex={0} /* Makes iframe focusable */
        onLoad={(e) =>
          e.currentTarget.contentWindow?.focus()
        } /* Set focus on load */
        frameBorder="0"
        allowFullScreen
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default ResponsiveIframe;
