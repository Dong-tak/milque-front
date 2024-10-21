// components/shapes/Rectangle.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { Rect, Transformer } from "react-konva";

interface RectangleProps {
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
  onDragMove?: (e: any) => void;
}

const Rectangle: React.FC<RectangleProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragMove,
}) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      // 트랜스포머 연결
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        onClick={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={shapeProps.draggable}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onDragMove={(e) => {
          if (onDragMove) {
            onDragMove(e);
          }
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // 스케일을 초기화합니다
          node.scaleX(1);
          node.scaleY(1);
          onChange({
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
          boundBoxFunc={(oldBox: any, newBox: any) => {
            // 크기 조정 제한
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

export default Rectangle;
