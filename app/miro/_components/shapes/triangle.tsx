// components/shapes/Triangle.tsx
"use client"; // Next.js 클라이언트 컴포넌트에서 사용

import Konva from "konva";
import React from "react";
import { Shape } from "react-konva";

const Triangle: React.FC<Konva.ShapeConfig> = (props) => {
  return (
    <Shape
      {...props}
      sceneFunc={(context, shape) => {
        const width = shape.width() || 260;
        const height = shape.height() || 170;

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(width - 40, height - 90);
        context.quadraticCurveTo(width - 110, height - 70, width, height);
        context.closePath();

        // Konva specific method to fill and stroke the shape
        context.fillStrokeShape(shape);
      }}
    />
  );
};

export default Triangle;
