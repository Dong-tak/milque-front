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

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }: any) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected) {
      // Transformer 노드를 연결합니다.
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        ref={shapeRef}
        {...shapeProps}
        draggable
        onClick={(e) => {
          onSelect();
          e.cancelBubble = true; // Prevent event bubbling
        }}
        onTap={(e) => {
          onSelect();
          e.cancelBubble = true; // Prevent event bubbling
        }}
        onDragMove={snapOnDragMove}
        onDragEnd={(e) => snapOnDragEnd(e, shapeProps, onChange)}
        onTransformEnd={(e) => {
          e.cancelBubble = true; // Prevent event bubbling
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          // 크기와 스케일을 업데이트합니다.
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
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
          boundBoxFunc={(oldBox, newBox) => {
            // 최소 크기를 제한합니다.
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Rectangle;
