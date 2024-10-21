// components/shapes/Rectangle.tsx
"use client";

import React from "react";
import { Rect, Transformer } from "react-konva";

interface RectangleProps {
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
  onDragMove?: () => void; // 추가된 부분
}

const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragMove,
}: RectangleProps) => {
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>();

  React.useEffect(() => {
    if (isSelected && trRef.current) {
      // attach transformer
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
        onDragMove={() => {
          onChange({
            x: shapeRef.current.x(),
            y: shapeRef.current.y(),
          });
          if (onDragMove) {
            onDragMove();
          }
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
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
            // limit resize
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
