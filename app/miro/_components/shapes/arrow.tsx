// components/shapes/Arrow.tsx
"use client";

import React from "react";
import { Shape, RegularPolygon } from "react-konva";

interface ArrowShape {
  id: string;
  type: "arrow";
  points: number[];
  arrowTipX: number;
  arrowTipY: number;
}

interface ArrowProps {
  shapeProps: ArrowShape;
  isSelected?: boolean;
  onSelect?: () => void;
}

const Arrow = ({ shapeProps, onSelect }: ArrowProps) => {
  const { points, arrowTipX, arrowTipY } = shapeProps;

  // 화살표 헤드의 각도 계산
  const len = points.length;
  const x1 = points[len - 2];
  const y1 = points[len - 1];
  const dx = arrowTipX - x1;
  const dy = arrowTipY - y1;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <>
      <Shape
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
      {/* 화살표 헤드 */}
      <RegularPolygon
        sides={3}
        radius={10}
        fill="black"
        stroke="black"
        strokeWidth={2}
        x={arrowTipX}
        y={arrowTipY}
        rotation={angle + 90}
      />
    </>
  );
};

export default Arrow;
