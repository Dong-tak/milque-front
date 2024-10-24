"use client";

import { ImageTextRecognizer } from "@/components/ImageTextRecognizer";

export default function OcrPage() {
  const handleRecognized = (text: string) => {
    console.log("인식된 텍스트:", text);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">이미지 텍스트 인식</h1>
      <ImageTextRecognizer onRecognized={handleRecognized} />
    </div>
  );
}
