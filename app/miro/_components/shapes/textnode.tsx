// components/shapes/TextNode.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Text, Transformer } from "react-konva";

interface TextNodeProps {
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
  onDragMove?: () => void; // 추가된 부분
}

const TextNode = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragMove,
}: TextNodeProps) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected && trRef.current) {
      // attach transformer
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
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
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={["middle-left", "middle-right"]}
          boundBoxFunc={(oldBox: any, newBox: any) => {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TextNode;
