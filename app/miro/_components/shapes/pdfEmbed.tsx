// components/shapes/pdfEmbed.tsx
"use client";
import React, { useRef, useEffect, useState } from "react";
import { Image, Transformer, Group, Text } from "react-konva";
import { PDFEmbedShape } from "../../utils/types";
import * as pdfjsLib from "pdfjs-dist";
import { anchorStyleFunc } from "./anchorStyle";
import { pdfjs } from "react-pdf";
import { snapOnDragEnd, snapOnDragMove } from "@/lib/snapping";

// workerSrc 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface PDFEmbedProps {
  shapeProps: PDFEmbedShape;
  isSelected?: boolean;
  onSelect: () => void;
  onChange: (newAttrs: Partial<PDFEmbedShape>) => void;
}

export const PDFEmbed: React.FC<PDFEmbedProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    const loadPDFPage = async () => {
      const loadingTask = pdfjsLib.getDocument(shapeProps.src);
      const pdf = await loadingTask.promise;
      setNumPages(pdf.numPages);

      const page = await pdf.getPage(currentPage);

      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      const img = new window.Image();
      img.src = canvas.toDataURL("image/png");
      img.onload = () => {
        setImage(img);
        shapeRef.current.getLayer().batchDraw();
      };
    };

    loadPDFPage();
  }, [shapeProps.src, currentPage]);

  if (!image) {
    return null; // 이미지가 로드되지 않았으면 아무것도 렌더링하지 않음
  }

  // 페이지 변경 핸들러
  const handlePageChange = (delta: number) => {
    let newPage = currentPage + delta;
    if (newPage < 1) newPage = 1;
    if (newPage > numPages) newPage = numPages;
    setCurrentPage(newPage);
  };

  return (
    <>
      <Group
        onClick={onSelect}
        onTap={onSelect}
        draggable
        x={shapeProps.x}
        y={shapeProps.y}
        ref={shapeRef}
        onDragMove={(e) => {
          snapOnDragMove(e); // 스냅핑 로직 실행
        }}
        onDragEnd={(e) => snapOnDragEnd(e, shapeProps, onChange)}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, (shapeProps.width || image.width) * scaleX),
            height: Math.max(5, (shapeProps.height || image.height) * scaleY),
          });
        }}
      >
        <Image
          image={image}
          width={shapeProps.width || image.width}
          height={shapeProps.height || image.height}
        />
        {/* 페이지 네비게이션 버튼 */}
        {isSelected && (
          <>
            {/* 이전 페이지 버튼 */}
            <Text
              text="<"
              fontSize={24}
              fill="black"
              x={-30}
              y={(shapeProps.height || image.height) / 2 - 12}
              width={24}
              height={24}
              onClick={() => handlePageChange(-1)}
              onTap={() => handlePageChange(-1)}
            />
            {/* 다음 페이지 버튼 */}
            <Text
              text=">"
              fontSize={24}
              fill="black"
              x={shapeProps.width || image.width}
              y={(shapeProps.height || image.height) / 2 - 12}
              width={24}
              height={24}
              onClick={() => handlePageChange(1)}
              onTap={() => handlePageChange(1)}
            />
            {/* 페이지 번호 표시 */}
            <Text
              text={`${currentPage} / ${numPages}`}
              fontSize={16}
              fill="black"
              x={(shapeProps.width || image.width) / 2 - 30}
              y={shapeProps.height || image.height}
              width={60}
              height={24}
              align="center"
            />
          </>
        )}
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
          anchorStyleFunc={anchorStyleFunc}
        />
      )}
    </>
  );
};

export default PDFEmbed;
