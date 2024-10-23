import React, { useRef, useEffect, useState } from "react";
import { Html } from "react-konva-utils";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { Group, Rect, Transformer, Text } from "react-konva";
import {
  anchorDragBoundFunc,
  snapOnDragEnd,
  snapOnDragMove,
} from "@/lib/snapping";

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

  const editor = useCreateBlockNote({
    initialContent: undefined,
  });

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    handleResize();
  }, [rectWidth, rectHeight]);

  const handleResize = () => {
    if (blockNoteRef.current) {
      setRectWidth(blockNoteRef.current.offsetWidth);
      setRectHeight(blockNoteRef.current.offsetHeight);
    }
  };

  // 드래그 핸들러 추가
  const handleDragStart = () => {
    onSelect(); // 드래그 시작 시 선택 상태로 변경
  };

  const handleDragMove = (e: any) => {
    snapOnDragMove(e); // 스냅핑 적용
  };

  const handleDragEnd = (e: any) => {
    snapOnDragEnd(e, shapeProps, onChange); // 스냅핑 적용
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  return (
    <>
      <Group
        ref={shapeRef}
        x={shapeProps.x}
        y={shapeProps.y}
        draggable={true}
        onClick={onSelect}
        onTap={onSelect}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        // `onMouseDown` 핸들러 제거 또는 수정
        // onMouseDown={(e) => {
        //   e.cancelBubble = true; // 이벤트 버블링 방지 (제거)
        // }}
      >
        {/* 제목 영역 - 수정 불가 */}
        <Rect
          listening={false} // 이벤트 수신 비활성화
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
          listening={false} // 이벤트 수신 비활성화
          text={titleBlock}
          fontSize={24}
          fontStyle="bold"
          x={10}
          y={10}
          width={rectWidth - 20}
          height={30}
          fill="#333333"
        />

        {/* 본문 영역 - 수정 가능 */}
        <Rect
          listening={false} // 이벤트 수신 비활성화
          width={rectWidth}
          height={rectHeight}
          y={50}
          fill="white"
          stroke="#CCCCCC"
          strokeWidth={1}
          shadowColor="black"
          shadowBlur={isSelected ? 10 : 0}
          shadowOpacity={0.2}
          cornerRadius={5}
        />

        {/* Html 컴포넌트 수정 */}
        <Html
          divProps={{
            style: {
              pointerEvents: isEditing ? "auto" : "none", // 편집 중일 때만 이벤트 허용
            },
          }}
        >
          <div
            ref={blockNoteRef}
            style={{
              width: rectWidth,
              marginTop: "50px",
              padding: "10px",
              backgroundColor: "white",
              // `pointerEvents` 제거
              // pointerEvents: isEditing ? "auto" : "none",
            }}
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
          enabledAnchors={["middle-left", "middle-right"]}
          rotateEnabled={false}
        />
      )}
    </>
  );
};

export default BoardWidget;
