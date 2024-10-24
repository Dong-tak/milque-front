import React, { useRef, useEffect, useState, useMemo } from "react";
import { Group, Rect, Transformer, Text } from "react-konva";
import { Html } from "react-konva-utils";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { PartialBlock } from "@blocknote/core";
import {
  anchorDragBoundFunc,
  snapOnDragEnd,
  snapOnDragMove,
} from "@/lib/snapping";

// 기본 콘텐츠 구조를 수정
const DEFAULT_CONTENT: PartialBlock[] = [
  {
    id: "1",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "내용을 입력하세요",
        styles: {},
      },
    ],
    children: [],
  },
] as const;

interface BoardWidgetProps {
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
  titleBlock: string;
}

const BoardWidget: React.FC<BoardWidgetProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  titleBlock,
}) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const blockNoteRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [rectWidth, setRectWidth] = useState(shapeProps.width || 500);
  const [rectHeight, setRectHeight] = useState(shapeProps.height || 300);

  // BlockNote 에디터 초기화 수정
  const editor = useCreateBlockNote({
    initialContent: useMemo(() => {
      if (!shapeProps.content) return DEFAULT_CONTENT;

      try {
        const parsedContent = JSON.parse(shapeProps.content);
        if (!Array.isArray(parsedContent)) return DEFAULT_CONTENT;

        // 각 블록이 필요한 속성 가지고 있는지 확인
        const isValidContent = parsedContent.every(
          (block) =>
            block.type &&
            typeof block.type === "string" &&
            block.props &&
            Array.isArray(block.content),
        );

        return isValidContent ? parsedContent : DEFAULT_CONTENT;
      } catch {
        return DEFAULT_CONTENT;
      }
    }, [shapeProps.content]),
  });

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleResize = () => {
    if (blockNoteRef.current) {
      const newWidth = blockNoteRef.current.offsetWidth;
      const newHeight = blockNoteRef.current.offsetHeight;

      setRectWidth(newWidth);
      setRectHeight(newHeight + 50); // 제목 영역 높이 포함

      onChange({
        ...shapeProps,
        width: newWidth,
        height: newHeight + 50,
      });
    }
  };

  const handleDragStart = (e: any) => {
    e.cancelBubble = true;
    onSelect();
  };

  const handleDragMove = (e: any) => {
    e.cancelBubble = true;
    if (!isEditing) {
      snapOnDragMove(e);
    }
  };

  const handleDragEnd = (e: any) => {
    e.cancelBubble = true;
    if (!isEditing) {
      snapOnDragEnd(e, shapeProps, onChange);
      onChange({
        ...shapeProps,
        x: e.target.x(),
        y: e.target.y(),
      });
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    onSelect(); // 클릭 시 선택 상태로 변경
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (!blockNoteRef.current?.contains(e.target as Node)) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      window.addEventListener("mousedown", handleOutsideClick);
    } else {
      window.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isEditing]);

  return (
    <>
      <Group
        ref={shapeRef}
        x={shapeProps.x}
        y={shapeProps.y}
        draggable={!isEditing}
        onClick={(e) => {
          e.cancelBubble = true;
          onSelect();
        }}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onMouseEnter={(e) => {
          const container = e.target.getStage()?.container();
          if (container && !isEditing) {
            container.style.cursor = "move";
          }
        }}
        onMouseLeave={(e) => {
          const container = e.target.getStage()?.container();
          if (container) {
            container.style.cursor = "default";
          }
        }}
      >
        {/* 제목 영역 */}
        <Rect
          width={rectWidth}
          height={50}
          fill="#F0F0F0"
          stroke="#CCCCCC"
          strokeWidth={1}
          shadowColor="black"
          shadowBlur={isSelected ? 10 : 0}
          shadowOpacity={0.2}
          cornerRadius={5}
        />
        <Text
          text={titleBlock}
          fontSize={24}
          fontStyle="bold"
          x={10}
          y={10}
          width={rectWidth - 20}
          height={30}
          fill="#333333"
        />

        {/* 본문 영역 */}
        <Rect
          width={rectWidth}
          height={rectHeight - 50}
          y={50}
          fill="white"
          stroke="#CCCCCC"
          strokeWidth={1}
          shadowColor="black"
          shadowBlur={isSelected ? 10 : 0}
          shadowOpacity={0.2}
          cornerRadius={5}
        />

        <Html>
          <div
            ref={blockNoteRef}
            style={{
              position: "absolute",
              top: "50px",
              left: "0px",
              width: `${rectWidth}px`,
              padding: "10px",
              backgroundColor: "white",
              pointerEvents: "auto", // 항상 이벤트 수신 가능하도록 변경
              zIndex: isEditing ? 1000 : 1,
              userSelect: "text", // 텍스트 선택 항상 가능하도록 변경
              cursor: "text", // 커서를 항상 text로 설정
              minHeight: `${rectHeight - 50}px`,
              overflow: "auto",
            }}
            onClick={handleContentClick}
            onMouseDown={(e) => {
              if (!isEditing) {
                e.stopPropagation();
              }
            }}
          >
            <BlockNoteView
              editor={editor}
              theme="light"
              editable={true} // 항상 편집 가능하도록 설정
              onChange={() => {
                const content = editor.topLevelBlocks;
                onChange({
                  ...shapeProps,
                  content: JSON.stringify(content),
                });
                handleResize();
              }}
            />
          </div>
        </Html>
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => newBox}
          anchorDragBoundFunc={anchorDragBoundFunc}
          enabledAnchors={["middle-left", "middle-right"]}
          rotateEnabled={false}
        />
      )}
    </>
  );
};

export default BoardWidget;
