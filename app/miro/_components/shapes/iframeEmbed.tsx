// components/shapes/pdfEmbed.tsx
"use client";
import React, { useRef, useEffect, useState } from "react";
import { Group, Rect, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
import { IframeEmbedShape } from "../../utils/types";
import { anchorStyleFunc } from "./anchorStyle";

interface IframeEmbedProps {
  shapeProps: IframeEmbedShape;
  isSelected?: boolean;
  onSelect: () => void;
  onChange: (newAttrs: Partial<IframeEmbedShape>) => void;
  onDragMove?: (e: any) => void;
}

export const IframeEmbed: React.FC<IframeEmbedProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragMove,
}) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [rectWidth, setRectWidth] = useState(shapeProps.width || 500);
  const [rectHeight, setRectHeight] = useState(shapeProps.height || 800);
  const [dragStartPos, setDragStartPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

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
    if (iframeRef.current) {
      setRectWidth(iframeRef.current.offsetWidth);
      setRectHeight(iframeRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    if (!isSelected) {
      setIsEditing(false);
    }
  }, [isSelected]);

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
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      >
        <Rect
          width={rectWidth}
          height={rectHeight + 30}
          y={-30}
          fill="lightgray"
        />
        <Html
          divProps={{
            style: {
              width: "500px",
              height: "800px",
            },
          }}
        >
          <div
            className="h-full w-full"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <iframe
              ref={iframeRef}
              src={shapeProps.src}
              tabIndex={0}
              onLoad={(e) => e.currentTarget.contentWindow?.focus()}
              allowFullScreen
              width="100%"
              height="100%"
              style={{ pointerEvents: isEditing ? "auto" : "none" }}
            />
          </div>
        </Html>
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
          anchorStyleFunc={anchorStyleFunc}
        />
      )}
    </>
  );
};

export default IframeEmbed;
