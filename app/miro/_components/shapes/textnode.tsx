"use client";

import React, { useRef, useEffect, useState } from "react";
import { Html } from "react-konva-utils";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { PartialBlock } from "@blocknote/core";
import { Group, Rect, Transformer } from "react-konva";
import {
  anchorDragBoundFunc,
  snapOnDragEnd,
  snapOnDragMove,
} from "@/lib/snapping";

interface TextNodeProps {
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
  onDragMove: (e: any) => void;
}

const TextNode: React.FC<TextNodeProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragMove,
}) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const blockNoteRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState<string>(shapeProps.text || "");
  const [rectWidth, setRectWidth] = useState(shapeProps.width || 500);
  const [rectHeight, setRectHeight] = useState(shapeProps.height || 300);

  // 컴포넌트 내에서 마우스 시작 위치를 저장할 상태 변수 추가
  const [dragStartPos, setDragStartPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (isSelected && trRef.current) {
      // attach transformer
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, isEditing, shapeProps]);

  useEffect(() => {
    handleResize();
  }, [rectWidth, rectHeight]);

  const initialContent: PartialBlock[] | undefined = textValue
    ? JSON.parse(textValue)
    : undefined;

  const editor = useCreateBlockNote({
    initialContent,
  });

  if (shapeProps.type === "markdown" && shapeProps.src) {
    //shapeProps.src 파일을 읽어서 markdownContent에 저장
    fetch(shapeProps.src)
      .then((response) => response.text())
      .then((text) => editor.tryParseMarkdownToBlocks(text))
      .then((blocks) => {
        editor.replaceBlocks(editor.document, blocks);
      });
  }

  useEffect(() => {
    if (!isSelected) {
      setIsEditing(false);
    }
  }, [isSelected]);

  const handleResize = () => {
    if (blockNoteRef.current) {
      setRectWidth(blockNoteRef.current.offsetWidth);
      setRectHeight(blockNoteRef.current.offsetHeight);
    }
  };

  // 마우스 다운 이벤트 핸들러
  const handleMouseDown = (e: any) => {
    onSelect();
    if (!isEditing) {
      e.preventDefault();
      e.stopPropagation();
      shapeRef.current.startDrag();
      const stage = shapeRef.current.getStage();
      const pointerPosition = stage.getPointerPosition();
      setDragStartPos(pointerPosition);
    }
  };

  // 마우스 업 이벤트 핸들러
  const handleMouseUp = (e: any) => {
    shapeRef.current.stopDrag();
    if (dragStartPos) {
      const stage = shapeRef.current.getStage();
      const pointerPosition = stage.getPointerPosition();
      const dx = pointerPosition.x - dragStartPos.x;
      const dy = pointerPosition.y - dragStartPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 5) {
        // 이동 거리가 5픽셀 미만이면 클릭으로 간주
        setIsEditing(true);
      }
      setDragStartPos(null);
    }
  };

  return (
    <>
      <Group
        draggable
        onClick={onSelect}
        onDragMove={(e) => {
          snapOnDragMove(e); // 스냅핑 로직 실행
          if (onDragMove) {
            onDragMove(e); // 부모로부터 전달된 onDragMove 실행 (updateArrows)
          }
        }}
        onDragEnd={(e) => snapOnDragEnd(e, shapeProps, onChange)}
        ref={shapeRef}
        x={shapeProps.x}
        y={shapeProps.y}
      >
        <Rect
          width={rectWidth}
          height={rectHeight + 30}
          y={-30}
          fill="lightgray"
        />
        <Html>
          <div
            ref={blockNoteRef}
            style={{
              width: rectWidth,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
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
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => newBox}
          anchorDragBoundFunc={anchorDragBoundFunc}
        />
      )}
    </>
  );
};

TextNode.displayName = "TextNode";

export default TextNode;
