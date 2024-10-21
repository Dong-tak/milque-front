// utils/arrowUtils.ts

import { RectangleShape, TextShape, isRectangle, isText } from "./types"; // RectangleShape과 TextShape 타입을 import
import { getShapeSideCenters } from "./helpers"; // 도형의 측면 중앙 좌표를 가져오는 헬퍼 함수 import

// /**
//  * 두 도형 사이의 화살표 좌표를 계산하는 함수
//  * @param from - 출발 도형 (RectangleShape 또는 TextShape)
//  * @param to - 도착 도형 (RectangleShape 또는 TextShape)
//  * @returns 화살표를 그리기 위한 포인트 배열과 화살표 머리의 좌표
//  */
export function getConnectorPoints(
  from: RectangleShape | TextShape,
  to: RectangleShape | TextShape,
) {
  // 출발 도형과 도착 도형의 측면 중앙 좌표를 가져옴
  const fromCenters = getShapeSideCenters(from);
  const toCenters = getShapeSideCenters(to);

  // 출발 도형의 중심 좌표 계산
  const fromCenterX =
    from.x + (isRectangle(from) ? from.width / 2 : from.width / 2);
  const fromCenterY =
    from.y + (isRectangle(from) ? from.height / 2 : from.height / 2);

  // 도착 도형의 중심 좌표 계산
  const toCenterX = to.x + (isRectangle(to) ? to.width / 2 : to.width / 2);
  const toCenterY = to.y + (isRectangle(to) ? to.height / 2 : to.height / 2);

  let fromPoint, toPoint;

  // 화살표의 방향을 결정하기 위해 x축과 y축의 차이를 계산
  const dx = toCenterX - fromCenterX;
  const dy = toCenterY - fromCenterY;

  if (Math.abs(dx) > Math.abs(dy)) {
    // 수평 방향의 차이가 더 큰 경우
    if (dx > 0) {
      // 화살표가 오른쪽으로 향함
      fromPoint = fromCenters[3]; // 출발 도형의 오른쪽 측면 중앙
      toPoint = toCenters[2]; // 도착 도형의 왼쪽 측면 중앙
    } else {
      // 화살표가 왼쪽으로 향함
      fromPoint = fromCenters[2]; // 출발 도형의 왼쪽 측면 중앙
      toPoint = toCenters[3]; // 도착 도형의 오른쪽 측면 중앙
    }
  } else {
    // 수직 방향의 차이가 더 큰 경우
    if (dy > 0) {
      // 화살표가 아래쪽으로 향함
      fromPoint = fromCenters[1]; // 출발 도형의 아래 측면 중앙
      toPoint = toCenters[0]; // 도착 도형의 위 측면 중앙
    } else {
      // 화살표가 위쪽으로 향함
      fromPoint = fromCenters[0]; // 출발 도형의 위 측면 중앙
      toPoint = toCenters[1]; // 도착 도형의 아래 측면 중앙
    }
  }

  // 출발점과 도착점의 중간 좌표 계산
  const midX = (fromPoint.x + toPoint.x) / 2;
  const midY = (fromPoint.y + toPoint.y) / 2;

  let points: number[];

  // 꺾임 포인트를 기준으로 화살표의 꺾인 부분을 계산
  if (Math.abs(dx) > Math.abs(dy)) {
    // 수평 방향으로 꺾이는 경우
    const bendX = midX; // 중간 x 좌표를 꺾임 포인트의 x 좌표로 설정
    points = [
      fromPoint.x, // 출발점 x
      fromPoint.y, // 출발점 y
      bendX, // 꺾임점 x (수평 이동)
      fromPoint.y, // 꺾임점 y (출발점 y와 동일)
      bendX, // 꺾임점 x (수평 이동)
      toPoint.y, // 꺾임점 y (도착점 y와 동일)
      toPoint.x, // 도착점 x
      toPoint.y, // 도착점 y
    ];
  } else {
    // 수직 방향으로 꺾이는 경우
    const bendY = midY; // 중간 y 좌표를 꺾임 포인트의 y 좌표로 설정
    points = [
      fromPoint.x, // 출발점 x
      fromPoint.y, // 출발점 y
      fromPoint.x, // 꺾임점 x (출발점 x와 동일)
      bendY, // 꺾임점 y (수직 이동)
      toPoint.x, // 꺾임점 x (도착점 x와 동일)
      bendY, // 꺾임점 y (수직 이동)
      toPoint.x, // 도착점 x
      toPoint.y, // 도착점 y
    ];
  }

  // 화살표 헤드 계산
  const arrowLength = 15; // 화살표 헤드의 길이
  const arrowAngle = Math.atan2(
    toPoint.y - points[points.length - 3],
    toPoint.x - points[points.length - 4],
  );

  // 화살표 헤드를 객체 바깥으로 이동
  const arrowOffset = -15; // 화살표 헤드를 객체로부터 얼마나 떨어뜨릴지 결정하는 값
  const finalArrowTipX = toPoint.x + Math.cos(arrowAngle) * arrowOffset;
  const finalArrowTipY = toPoint.y + Math.sin(arrowAngle) * arrowOffset;

  // 화살표 선의 끝점을 화살표 헤드의 시작점으로 조정
  points[points.length - 2] = finalArrowTipX;
  points[points.length - 1] = finalArrowTipY;

  return {
    points,
    arrowTipX: finalArrowTipX,
    arrowTipY: finalArrowTipY,
  };
}
