// components/shapes/TextNode.tsx
"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Text, Transformer, Group } from "react-konva";
import { remark } from "remark";
import remarkParse from "remark-parse";
import { Html } from "react-konva-utils";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";

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
    console.log("dblclick");
  };

  // const handleTextareaBlur = (e: any) => {
  //   onChange({
  //     ...shapeProps,
  //     text: textValue,
  //   });
  //   setIsEditing(false);
  // };

  // Markdown 텍스트를 파싱하고 Konva Text 요소를 생성합니다.
  const parsedLines = useMemo(() => {
    const tree: any = remark().use(remarkParse).parse(textValue);
    const lines: any[] = [];
    let yOffset = 0;

    const traverse = (node: any, depth = 0) => {
      if (node.type === "root") {
        node.children.forEach((child: any) => traverse(child, depth));
      } else if (node.type === "heading") {
        const text = node.children.map((n: any) => n.value || "").join("");
        lines.push({
          text,
          fontSize: 32 - node.depth * 4, // 헤딩 레벨에 따른 폰트 크기 조정
          fontStyle: "bold",
          x: depth * 20,
          y: yOffset,
        });
        yOffset += 36;
      } else if (node.type === "paragraph") {
        const text = node.children.map((n: any) => n.value || "").join("");
        lines.push({
          text,
          fontSize: shapeProps.fontSize,
          x: depth * 20,
          y: yOffset,
        });
        yOffset += 24;
      } else if (node.type === "list") {
        node.children.forEach((item: any) => {
          traverse(item, depth + 1); // 깊이 증가
        });
      } else if (node.type === "listItem") {
        const text = node.children
          .map((child: any) => {
            if (child.type === "paragraph") {
              return child.children.map((n: any) => n.value || "").join("");
            }
            return "";
          })
          .join("");
        const bullet =
          node.checked !== null
            ? node.checked
              ? "[x] "
              : "[ ] "
            : node.ordered
              ? `${node.index}. `
              : "• ";
        lines.push({
          text: bullet + text,
          fontSize: shapeProps.fontSize,
          x: depth * 20,
          y: yOffset,
        });
        yOffset += 24;
      }
    };

    traverse(tree);
    return lines;
  }, [textValue, shapeProps]);

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: textValue,
      },
    ],
  });

  const handleTextareaBlur = () => {
    onChange({
      ...shapeProps,
      text: textValue,
    });
    setIsEditing(false);
  };

  return (
    <>
      <Html>
        <div
          style={{
            position: "absolute",
            top: shapeProps.y,
            left: shapeProps.x,
            width: shapeProps.width || 200,
          }}
        >
          <BlockNoteView
            editor={editor}
            theme="light"
            onBlur={handleTextareaBlur}
          />
        </div>
      </Html>
    </>
  );
};

export default TextNode;
