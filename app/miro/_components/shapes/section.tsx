// components/shapes/Rectangle.tsx
"use client";
import React, { useRef, useEffect } from "react";
import { Group, Rect, Transformer } from "react-konva";
import {
  anchorDragBoundFunc,
  snapOnDragEnd,
  snapOnDragMove,
} from "@/lib/snapping";
import { SectionShape, isArrow } from "../../utils/types";
import { useDispatch } from "react-redux";
import { updateArrowPositions } from "@/redux/features/arrowSlice";

interface SectionProps {
  shapeProps: SectionShape;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
  onDragMove?: (e: any) => void;
  shapes: any[];
  updateShapes: (shapes: any[]) => void;
  updateArrows: (movedShapeId: string, newX: number, newY: number) => void;
}

const Section: React.FC<SectionProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragMove,
  shapes,
  updateShapes,
  updateArrows,
}) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // 섹션과 내부 객체들의 이동을 처리하는 함수
  const handleDragMove = (e: any) => {
    e.cancelBubble = true;
    snapOnDragMove(e);

    const node = e.target;
    const dx = node.x() - shapeProps.x;
    const dy = node.y() - shapeProps.y;

    // 섹션과 내부 객체들의 새 위치를 계산
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === shapeProps.id) {
        // 섹션 자체의 위치 업데이트
        return {
          ...shape,
          x: node.x(),
          y: node.y(),
        };
      } else if (shapeProps.memberIds.includes(shape.id)) {
        // 멤버 객체의 새 위치 계산
        const newX = shape.x + dx;
        const newY = shape.y + dy;

        // 멤버 객체와 연결된 화살표 업데이트
        if (isArrow(shape)) {
          // 화살표인 경우 points 업데이트
          const points = [...shape.points];
          for (let i = 0; i < points.length; i += 2) {
            points[i] += dx;
            points[i + 1] += dy;
          }
          return {
            ...shape,
            x: newX,
            y: newY,
            points,
            arrowTipX: shape.arrowTipX + dx,
            arrowTipY: shape.arrowTipY + dy,
          };
        }

        // 멤버 객체의 위치가 변경될 때마다 연결된 화살표 업데이트
        updateArrows(shape.id, newX, newY);

        // 일반 객체의 경우
        return {
          ...shape,
          x: newX,
          y: newY,
        };
      }
      return shape;
    });

    // 모든 변경사항을 한 번에 적용
    updateShapes(updatedShapes);

    // 섹션 내부 객체들과 연결된 모든 화살표 찾기
    const allConnectedArrows = shapes.filter(
      (shape) =>
        isArrow(shape) &&
        shapeProps.memberIds.some(
          (memberId) => shape.from === memberId || shape.to === memberId,
        ),
    );

    // 각 화살표에 대해 업데이트 수행
    allConnectedArrows.forEach((arrow) => {
      if (isArrow(arrow)) {
        const fromShape = shapes.find((s) => s.id === arrow.from);
        const toShape = shapes.find((s) => s.id === arrow.to);

        if (fromShape && toShape) {
          // from이 섹션 내부 객체인 경우
          if (shapeProps.memberIds.includes(fromShape.id)) {
            const newX = fromShape.x + dx;
            const newY = fromShape.y + dy;
            dispatch(
              updateArrowPositions({
                movedShapeId: fromShape.id,
                newX,
                newY,
                shapes: updatedShapes,
              }),
            );
          }

          // to가 섹션 내부 객체인 경우
          if (shapeProps.memberIds.includes(toShape.id)) {
            const newX = toShape.x + dx;
            const newY = toShape.y + dy;
            dispatch(
              updateArrowPositions({
                movedShapeId: toShape.id,
                newX,
                newY,
                shapes: updatedShapes,
              }),
            );
          }
        }
      }
    });
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
