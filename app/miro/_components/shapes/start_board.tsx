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
import FocusControlBar from "../board/FocusControlBar";

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

// 상수로 제목 영역 높이 정의
const TITLE_HEIGHT = 70; // 제목 영역 높이를 70px로 조정

interface StartBoardProps {
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
  titleBlock: string;
}

const StartBoard: React.FC<StartBoardProps> = ({
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

  // 제목용 BlockNote 에디터 수정
  const titleEditor = useCreateBlockNote({
    initialContent: [
      {
        id: "title",
        type: "heading",
        props: {
          textColor: "default",
          backgroundColor: "default",
          textAlignment: "left",
          level: 1, // heading1으로 설정
        },
        content: [
          {
            type: "text",
            text: titleBlock,
            styles: {
              bold: true,
            },
          },
        ],
        children: [],
      },
    ],
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
      setRectHeight(newHeight + TITLE_HEIGHT); // TITLE_HEIGHT 사용

      onChange({
        ...shapeProps,
        width: newWidth,
        height: newHeight + TITLE_HEIGHT,
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

  // Transform 이벤트 핸들러 추가
  const handleTransformEnd = (e: any) => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // 스케일 초기화
    node.scaleX(1);
    node.scaleY(1);

    // 새로운 크기 계산
    const newWidth = Math.max(200, node.width() * scaleX); // 최소 너비 200px
    const newHeight = Math.max(150, node.height() * scaleY); // 최소 높이 150px

    setRectWidth(newWidth);
    setRectHeight(newHeight);

    onChange({
      ...shapeProps,
      x: node.x(),
      y: node.y(),
      width: newWidth,
      height: newHeight,
    });
  };

  return (
    <>
      <Group
        ref={shapeRef}
        x={shapeProps.x}
        y={shapeProps.y}
        width={rectWidth}
        height={rectHeight}
        draggable={!isEditing}
        onClick={(e) => {
          e.cancelBubble = true;
          onSelect();
        }}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
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
        {/* 제목 영역 스타일 수정 */}
        <Rect
          width={rectWidth}
          height={TITLE_HEIGHT} // TITLE_HEIGHT 사용
          fill="#F0F0F0"
          stroke="#CCCCCC"
          strokeWidth={1}
          shadowColor="black"
          shadowBlur={isSelected ? 10 : 0}
          shadowOpacity={0.2}
          cornerRadius={5}
        />
        <Html>
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: `${rectWidth}px`,
              height: `${TITLE_HEIGHT}px`, // TITLE_HEIGHT 사용
              padding: "0px",
              backgroundColor: "#F0F0F0",
              pointerEvents: "none",
              overflow: "hidden",
              alignItems: "center", // 세로 중앙 정렬
            }}
          >
            <BlockNoteView
              editor={titleEditor}
              theme="light"
              editable={false}
            />
          </div>
        </Html>

        {/* 본문 영역 - y 위치 조정 */}
        <Rect
          width={rectWidth}
          height={rectHeight - TITLE_HEIGHT}
          y={TITLE_HEIGHT} // TITLE_HEIGHT 사용
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
              top: `${TITLE_HEIGHT}px`, // TITLE_HEIGHT 사용
              left: "0px",
              width: `${rectWidth}px`,
              padding: "10px",
              backgroundColor: "white",
              pointerEvents: "auto",
              zIndex: isEditing ? 1000 : 1,
              userSelect: "text",
              cursor: "text",
              minHeight: `${rectHeight - TITLE_HEIGHT}px`, // TITLE_HEIGHT 사용
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
              editable={true}
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
        {/* FocusControlBar를 Html 컴포넌트로 감싸서 렌더링 */}
        <Html>
          <div
            style={{
              position: "absolute",
              top: `${rectHeight - 45}px`, // 보드 아래에 위치
              left: "0px",
              width: `${rectWidth}px`,
              zIndex: 1000,
            }}
          >
            <FocusControlBar
              version="v.3.26"
              createdDate="24.08.17"
              createdTime="08:28"
              showSettings={true}
              showPause={true}
              showPlay={true}
            />
          </div>
        </Html>
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // 최소 크기 제한
            if (newBox.width < 200 || newBox.height < 150) {
              return oldBox;
            }
            return newBox;
          }}
          anchorDragBoundFunc={anchorDragBoundFunc}
          enabledAnchors={[
            "top-left",
            "top-center",
            "top-right",
            "middle-left",
            "middle-right",
            "bottom-left",
            "bottom-center",
            "bottom-right",
          ]}
          rotateEnabled={false}
          flipEnabled={false}
          onClick={(e) => (e.cancelBubble = true)}
          onTap={(e) => (e.cancelBubble = true)}
          anchorStyleFunc={(anchor) => ({
            width: 10,
            height: 10,
            cornerRadius: 5,
            fill: "white",
            stroke: "#00A3FF",
            strokeWidth: 2,
            shadowColor: "black",
            shadowBlur: 2,
            shadowOpacity: 0.5,
          })}
        />
      )}
    </>
  );
};

export default StartBoard;
