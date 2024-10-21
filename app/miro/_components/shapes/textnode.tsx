"use client";

import React, { useRef, useEffect, useState } from "react";
import { Html } from "react-konva-utils";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { PartialBlock } from "@blocknote/core";
import { Group, Rect, Transformer } from "react-konva";

interface TextNodeProps {
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}

const TextNode: React.FC<TextNodeProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const blockNoteRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState<string>(shapeProps.text || "");
  const [rectWidth, setRectWidth] = useState(shapeProps.width || 500);
  const [rectHeight, setRectHeight] = useState(shapeProps.height || 300);

  useEffect(() => {
    if (isSelected && !isEditing) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, isEditing]);

  const initialContent: PartialBlock[] | undefined = textValue
    ? JSON.parse(textValue)
    : undefined;

  const editor = useCreateBlockNote({
    initialContent,
  });

  const handleDragEnd = (e: any) => {
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleResize = () => {
    if (blockNoteRef.current) {
      setRectWidth(blockNoteRef.current.offsetWidth);
      setRectHeight(blockNoteRef.current.offsetHeight);
    }
  };

  const clickedit = () => {
    console.log("clicked");
  };

  return (
    <>
      <Group
        draggable
        onClick={onSelect}
        onDragEnd={handleDragEnd}
        ref={shapeRef}
        x={shapeProps.x}
        y={shapeProps.y}
      >
        <Rect
          width={rectWidth}
          height={rectHeight + 20}
          y={-20}
          zIndex={99}
          fill="lightgray"
          onClick={clickedit}
        />
        <Html>
          <div
            ref={blockNoteRef}
            style={{
              width: rectWidth,
            }}
            onClick={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
          >
            <BlockNoteView
              editor={editor}
              theme="light"
              editable={isEditing}
              onChange={handleResize}
            />
          </div>
        </Html>
      </Group>
      {isSelected && (
        <Transformer ref={trRef} boundBoxFunc={(oldBox, newBox) => newBox} />
      )}
    </>
  );
};

export default TextNode;
