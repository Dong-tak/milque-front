"use client";

import React from "react";

interface TextOverlayProps {
  text: string;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export function TextOverlay({ text, boundingBox }: TextOverlayProps) {
  return (
    <div
      className="absolute select-text bg-white/30 transition-colors hover:bg-white/50"
      style={{
        left: boundingBox?.x || 0,
        top: boundingBox?.y || 0,
        width: boundingBox?.width || "auto",
        height: boundingBox?.height || "auto",
      }}
    >
      <span className="cursor-text">{text}</span>
    </div>
  );
}
