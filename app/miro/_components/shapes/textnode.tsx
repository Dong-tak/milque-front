// components/shapes/TextNode.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

interface TextNodeProps {
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
  onDragMove?: (e: any) => void;
}

const TextNode = React.forwardRef<any, TextNodeProps>((props, ref) => {
  const { shapeProps, isSelected, onSelect, onChange, onDragMove } = props;
  const shapeRef = ref as React.MutableRefObject<any>;
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected && trRef.current) {
      // attach transformer
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, shapeRef]);

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
        onDragMove={(e) => {
          if (onDragMove) {
            onDragMove(e);
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
});

TextNode.displayName = "TextNode";

export default TextNode;
