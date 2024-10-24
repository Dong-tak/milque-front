"use client";

import React, { useState, useRef, useEffect } from "react";
import { OcrService } from "../lib/ocr";
import { TextOverlay } from "./TextOverlay";

interface Props {
  onRecognized?: (text: string) => void;
}

interface RecognizedWord {
  text: string;
  bbox: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  };
}

export function ImageTextRecognizer({ onRecognized }: Props) {
  const [words, setWords] = useState<RecognizedWord[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const imageRef = useRef<HTMLImageElement>(null);
  const ocrService = useRef(new OcrService());

  useEffect(() => {
    return () => {
      ocrService.current.cleanup();
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    const newImageUrl = URL.createObjectURL(file);
    setImageUrl(newImageUrl);

    try {
      const result = await ocrService.current.recognizeText(file);

      if (result.status === "success") {
        setWords(result.words || []);
        onRecognized?.(result.text);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isProcessing}
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
      />

      {isProcessing && <div className="text-blue-600">Processing text...</div>}

      {imageUrl && (
        <div className="relative mt-4">
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Uploaded image"
            className="h-auto max-w-full"
          />
          {words.map((word, index) => (
            <TextOverlay
              key={index}
              text={word.text}
              boundingBox={{
                x: word.bbox.x0,
                y: word.bbox.y0,
                width: word.bbox.x1 - word.bbox.x0,
                height: word.bbox.y1 - word.bbox.y0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
