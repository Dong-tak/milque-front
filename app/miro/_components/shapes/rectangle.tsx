// components/shapes/Rectangle.tsx
"use client";
import {
  anchorDragBoundFunc,
  snap,
  snapOnDragEnd,
  snapOnDragMove,
} from "@/lib/snapping";
import React, { useRef, useEffect } from "react";
import { Rect, Transformer } from "react-konva";
import { anchorStyleFunc } from "./anchorStyle";

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
        ref={shapeRef}
        {...shapeProps}
        draggable
        zIndex={10}
        onClick={(e) => {
          onSelect();
          e.cancelBubble = true; // Prevent event bubbling
        }}
        onTap={(e) => {
          onSelect();
          e.cancelBubble = true; // Prevent event bubbling
        }}
        onDragMove={(e) => {
          snapOnDragMove(e); // 스냅핑 로직 실행
          if (onDragMove) {
            onDragMove(e); // 부모로부터 전달된 onDragMove 실행 (updateArrows)
          }
        }}
        onDragEnd={(e) => snapOnDragEnd(e, shapeProps, onChange)}
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
          flipEnabled={false}
          onClick={(e) => (e.cancelBubble = true)} // Prevent event bubbling
          onTap={(e) => (e.cancelBubble = true)} // Prevent event bubbling
          anchorDragBoundFunc={anchorDragBoundFunc}
          anchorStyleFunc={anchorStyleFunc}
          boundBoxFunc={(oldBox, newBox) => {
            // 최소 크기를 제한합니다.
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
