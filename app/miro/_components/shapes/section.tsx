// components/shapes/Rectangle.tsx
"use client";
import React, { useRef, useEffect } from "react";
import { Group, Rect, Transformer } from "react-konva";
import {
  anchorDragBoundFunc,
  snapOnDragEnd,
  snapOnDragMove,
} from "@/lib/snapping";
import { SectionShape } from "../../utils/types";

interface SectionProps {
  shapeProps: SectionShape;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
  onDragMove?: (e: any) => void;
  shapes: any[];
  updateShapes: (shapes: any[]) => void;
}

const Section: React.FC<SectionProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragMove,
  shapes,
  updateShapes,
}) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragMove = (e: any) => {
    e.cancelBubble = true;
    snapOnDragMove(e);

    const node = e.target;
    const dx = node.x() - shapeProps.x;
    const dy = node.y() - shapeProps.y;

    // 섹션 내부의 객체들도 함께 이동
    const updatedShapes = shapes.map((shape) => {
      if (shapeProps.memberIds.includes(shape.id)) {
        return {
          ...shape,
          x: shape.x + dx,
          y: shape.y + dy,
        };
      }
      return shape;
    });

    // 섹션의 위치 업데이트
    const updatedSection = {
      ...shapeProps,
      x: node.x(),
      y: node.y(),
    };

    // 모든 변경사항을 한 번에 적용
    const finalShapes = updatedShapes.map((shape) =>
      shape.id === shapeProps.id ? updatedSection : shape,
    );

    updateShapes(finalShapes);

    if (onDragMove) {
      onDragMove(e);
    }
  };

  const handleDragEnd = (e: any) => {
    e.cancelBubble = true;
    snapOnDragEnd(e, shapeProps, onChange);

    const node = e.target;
    onChange({
      ...shapeProps,
      x: node.x(),
      y: node.y(),
    });
  };

  const handleTransformEnd = (e: any) => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    const newWidth = Math.max(100, node.width() * scaleX);
    const newHeight = Math.max(100, node.height() * scaleY);

    // 크기 변경 후 영역 내의 객체들 다시 계산
    const newMemberIds = shapes
      .filter((shape) => {
        if (shape.id === shapeProps.id) return false;

        const shapeRight = shape.x + (shape.width || 0);
        const shapeBottom = shape.y + (shape.height || 0);

        const isInBounds =
          shape.x >= node.x() &&
          shapeRight <= node.x() + newWidth &&
          shape.y >= node.y() &&
          shapeBottom <= node.y() + newHeight;

        return isInBounds;
      })
      .map((shape) => shape.id);

    onChange({
      ...shapeProps,
      x: node.x(),
      y: node.y(),
      width: newWidth,
      height: newHeight,
      memberIds: newMemberIds,
    });
  };

  return (
    <Group
      ref={shapeRef}
      x={shapeProps.x}
      y={shapeProps.y}
      draggable
      onClick={(e) => {
        onSelect();
        e.cancelBubble = true;
      }}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
    >
      <Rect
        width={shapeProps.width}
        height={shapeProps.height}
        fill="rgba(200, 200, 200, 0.2)"
        stroke="rgba(0, 0, 0, 0.3)"
        strokeWidth={1}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 100 || newBox.height < 100) {
              return oldBox;
            }
            return newBox;
          }}
          anchorDragBoundFunc={anchorDragBoundFunc}
        />
      )}
    </Group>
  );
};

export default Section;
