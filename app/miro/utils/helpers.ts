// utils/helpers.ts
import { RectangleShape, TextShape, isRectangle } from "./types";

export const snapDistance = 10;

// 도형의 각 면의 중앙 좌표 반환
export const getShapeSideCenters = (shape: RectangleShape | TextShape) => {
  const shapeX = shape.x;
  const shapeY = shape.y;
  const shapeWidth = isRectangle(shape) ? shape.width : 100;
  const shapeHeight = isRectangle(shape) ? shape.height : 30;

  const centers = [
    { x: shapeX + shapeWidth / 2, y: shapeY }, // 상단 중앙
    { x: shapeX + shapeWidth / 2, y: shapeY + shapeHeight }, // 하단 중앙
    { x: shapeX, y: shapeY + shapeHeight / 2 }, // 좌측 중앙
    { x: shapeX + shapeWidth, y: shapeY + shapeHeight / 2 }, // 우측 중앙
  ];

  return centers;
};

// 특정 위치에서 가장 가까운 도형 찾기
export const findClosestShapeAtPoint = (
  x: number,
  y: number,
  shapes: (RectangleShape | TextShape)[],
): RectangleShape | TextShape | null => {
  let closestShape: RectangleShape | TextShape | null = null;
  shapes.forEach((shape) => {
    const shapeX = shape.x;
    const shapeY = shape.y;
    const shapeWidth = isRectangle(shape) ? shape.width : 100;
    const shapeHeight = isRectangle(shape) ? shape.height : 30;

    if (
      x >= shapeX - snapDistance &&
      x <= shapeX + shapeWidth + snapDistance &&
      y >= shapeY - snapDistance &&
      y <= shapeY + shapeHeight + snapDistance
    ) {
      closestShape = shape;
    }
  });
  return closestShape;
};

// 도형의 가장 가까운 면의 중앙 점 계산
export const getClosestSidePoint = (
  shape: RectangleShape | TextShape,
  x: number,
  y: number,
) => {
  const centers = getShapeSideCenters(shape);
  let closestPoint = centers[0];
  let minDistance = Math.hypot(x - centers[0].x, y - centers[0].y);

  centers.forEach((center) => {
    const distance = Math.hypot(x - center.x, y - center.y);
    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = center;
    }
  });

  return closestPoint;
};
