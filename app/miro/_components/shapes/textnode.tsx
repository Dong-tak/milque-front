"use client";

import React, { useRef, useEffect, useState } from "react";
import { Transformer, Group } from "react-konva";
import { Html } from "react-konva-utils";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { PartialBlock } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

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
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState<string>(shapeProps.text || "");

  useEffect(() => {
    if (isSelected && !isEditing) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, isEditing]);

  // 초기 콘텐츠를 PartialBlock[] 형태로 파싱
  const initialContent: PartialBlock[] | undefined = textValue
    ? JSON.parse(textValue)
    : undefined;

  const editor = useCreateBlockNote({
    initialContent,
  });

  return (
    <>
      <Html>
        <div
          style={{
            position: "absolute",
            top: shapeProps.y,
            left: shapeProps.x,
            width: shapeProps.width || 400,
            height: shapeProps.height || 200,
            backgroundColor: "bg-white",
          }}
        >
          <BlockNoteView editor={editor} theme="light" />
        </div>
      </Html>
    </>
  );
};

export default TextNode;
