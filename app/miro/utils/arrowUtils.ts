// utils/arrowUtils.ts
import { RectangleShape, TextShape } from "./types";
import { getShapeSideCenters } from "./helpers";

// 두 도형 사이의 화살표 좌표 계산 함수
export function getConnectorPoints(
  from: RectangleShape | TextShape,
  to: RectangleShape | TextShape,
) {
  const fromCenters = getShapeSideCenters(from);
  const toCenters = getShapeSideCenters(to);

  let minDistance = Infinity;
  let bestFromPoint = fromCenters[0];
  let bestToPoint = toCenters[0];

  fromCenters.forEach((fromPoint) => {
    toCenters.forEach((toPoint) => {
      const distance = Math.hypot(
        fromPoint.x - toPoint.x,
        fromPoint.y - toPoint.y,
      );
      if (distance < minDistance) {
        minDistance = distance;
        bestFromPoint = fromPoint;
        bestToPoint = toPoint;
      }
    });
  });

  const fromX = bestFromPoint.x;
  const fromY = bestFromPoint.y;
  const toX = bestToPoint.x;
  const toY = bestToPoint.y;

  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;

  const offset = 15;

  let points;
  if (Math.abs(toX - fromX) > Math.abs(toY - fromY)) {
    // 수평 방향
    const direction = toX > fromX ? -1 : 1;
    const adjustedToX = toX + direction * offset;
    const bendX = midX;

    points = [fromX, fromY, bendX, fromY, bendX, toY, adjustedToX, toY];
  } else {
    // 수직 방향
    const direction = toY > fromY ? -1 : 1;
    const adjustedToY = toY + direction * offset;
    const bendY = midY;

    points = [fromX, fromY, fromX, bendY, toX, bendY, toX, adjustedToY];
  }

  // 화살표 헤드 계산
  const arrowLength = 10;
  const len = points.length;
  const x1 = points[len - 4];
  const y1 = points[len - 3];
  const x2 = points[len - 2];
  const y2 = points[len - 1];

  const angle = Math.atan2(y2 - y1, x2 - x1);

  const x2_new = x2 - arrowLength * Math.cos(angle);
  const y2_new = y2 - arrowLength * Math.sin(angle);

  points[len - 2] = x2_new;
  points[len - 1] = y2_new;

  return {
    points,
    arrowTipX: x2,
    arrowTipY: y2,
  };
}
