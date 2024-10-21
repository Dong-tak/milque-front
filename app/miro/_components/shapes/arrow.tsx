// components/shapes/Arrow.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { Shape, RegularPolygon, Circle } from "react-konva";
import { ArrowShape } from "../../utils/types"; // ArrowShape 타입을 import

interface ArrowProps {
  shapeProps: ArrowShape;
  isSelected?: boolean;
  onSelect?: () => void;
  onChange: (newAttrs: Partial<ArrowShape>) => void;
  onDragMove: (id: string, x: number, y: number, type: "from" | "to") => void;
}

const Arrow: React.FC<ArrowProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragMove,
}) => {
  const { points, arrowTipX, arrowTipY } = shapeProps;

  const shapeRef = useRef<any>(null);
  const arrowHeadRef = useRef<any>(null);
  const fromPointRef = useRef<any>(null);
  const toPointRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected) {
      // 선택 시 처리 (필요한 경우)
    }
  }, [isSelected]);

  // 화살표 헤드의 각도 계산
  const len = points.length;
  const x1 = points[len - 4];
  const y1 = points[len - 3];
  const dx = arrowTipX - x1;
  const dy = arrowTipY - y1;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <>
      <Shape
        ref={shapeRef}
        sceneFunc={(context, shape) => {
          const radius = 15;
          if (points.length < 4) {
            return;
          }

          context.beginPath();
          context.moveTo(points[0], points[1]);

          for (let i = 2; i < points.length - 2; i += 2) {
            const x1 = points[i - 2];
            const y1 = points[i - 1];
            const x2 = points[i];
            const y2 = points[i + 1];
            const x3 = points[i + 2];
            const y3 = points[i + 3];

            const dx1 = x2 - x1;
            const dy1 = y2 - y1;
            const dx2 = x3 - x2;
            const dy2 = y3 - y2;

            const angle1 = Math.atan2(dy1, dx1);
            const angle2 = Math.atan2(dy2, dx2);

            let angleDiff = angle2 - angle1;

            if (angleDiff > Math.PI) {
              angleDiff -= 2 * Math.PI;
            } else if (angleDiff < -Math.PI) {
              angleDiff += 2 * Math.PI;
            }

            if (Math.abs(angleDiff) < 0.01) {
              context.lineTo(x2, y2);
              continue;
            }

            const dist = Math.min(
              radius,
              Math.hypot(dx1, dy1) / 2,
              Math.hypot(dx2, dy2) / 2,
            );

            const x2a = x2 - dist * Math.cos(angle1);
            const y2a = y2 - dist * Math.sin(angle1);
            const x2b = x2 + dist * Math.cos(angle2);
            const y2b = y2 + dist * Math.sin(angle2);

            context.lineTo(x2a, y2a);
            context.arcTo(x2, y2, x2b, y2b, dist);
          }

          // 마지막 선분 그리기
          context.lineTo(points[points.length - 2], points[points.length - 1]);

          context.strokeShape(shape);
        }}
        stroke="black"
        strokeWidth={2}
        lineJoin="round"
        onClick={onSelect}
      />
      <RegularPolygon
        ref={arrowHeadRef}
        sides={3}
        radius={10}
        fill="black"
        stroke="black"
        strokeWidth={2}
        x={arrowTipX}
        y={arrowTipY}
        rotation={angle + 90}
      />
      {isSelected && (
        <>
          <Circle
            ref={fromPointRef}
            x={points[0]}
            y={points[1]}
            radius={8}
            fill="red"
            draggable
            onDragMove={(e) => {
              onDragMove(shapeProps.id, e.target.x(), e.target.y(), "from");
            }}
          />
          <Circle
            ref={toPointRef}
            x={arrowTipX}
            y={arrowTipY}
            radius={8}
            fill="red"
            draggable
            onDragMove={(e) => {
              onDragMove(shapeProps.id, e.target.x(), e.target.y(), "to");
            }}
          />
        </>
      )}
    </>
  );
};

export default Arrow;
