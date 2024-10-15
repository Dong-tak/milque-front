// components/shapes/TextNode.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { Text, Transformer } from "react-konva";

const TextNode = ({ shapeProps, isSelected, onSelect, onChange }: any) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(shapeProps.text);

  useEffect(() => {
    if (isSelected && !isEditing) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, isEditing]);

  const handleDblClick = (e: any) => {
    setIsEditing(true);
  };

  const handleTextareaBlur = (e: any) => {
    onChange({
      ...shapeProps,
      text: textValue,
    });
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <textarea
          style={{
            position: "absolute",
            top: shapeProps.y,
            left: shapeProps.x,
            width: shapeProps.width,
            fontSize: shapeProps.fontSize,
          }}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onBlur={handleTextareaBlur}
          autoFocus
        />
      ) : (
        <Text
          onClick={onSelect}
          onTap={onSelect}
          onDblClick={handleDblClick}
          onDblTap={handleDblClick}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragStart={(e) => {
            e.cancelBubble = true;
          }}
          onDragMove={(e) => {
            e.cancelBubble = true;
          }}
          onDragEnd={(e) => {
            e.cancelBubble = true;
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();

            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              fontSize: node.fontSize() * scaleX,
              scaleX: 1,
            });
          }}
        />
      )}
      {isSelected && !isEditing && (
        <Transformer
          ref={trRef}
          enabledAnchors={["middle-left", "middle-right"]}
          boundBoxFunc={(oldBox, newBox) => {
            newBox.height = oldBox.height;
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TextNode;
