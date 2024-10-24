// components/shapes/Rectangle.tsx
"use client";
import React, { useRef, useEffect, useState } from "react";
import { Image, Transformer } from "react-konva";
import { ImageEmbedShape } from "../../utils/types";

interface ImageEmbedProps {
  shapeProps: ImageEmbedShape;
  isSelected?: boolean;
  onSelect: () => void;
  onChange: (newAttrs: Partial<ImageEmbedShape>) => void;
}

const ImageEmbed: React.FC<ImageEmbedProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    const img = new window.Image();
    img.src = shapeProps.src;
    img.onload = () => {
      setImage(img);
      shapeRef.current.getLayer().batchDraw();
    };
  }, [shapeProps.src]);

  if (!image) {
    return null; // 이미지가 로드되지 않았으면 아무것도 렌더링하지 않음
  }

  return (
    <>
      <Image
        image={image}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
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
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default ImageEmbed;
