// utils/arrowUtils.ts

import { RectangleShape, TextShape } from "./types"; // RectangleShape과 TextShape 타입을 import
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

  let minDistance = Infinity; // 최소 거리를 무한대로 초기화
  let bestFromPoint = fromCenters[0]; // 최적의 출발 점을 첫 번째 측면 중앙 점으로 초기화
  let bestToPoint = toCenters[0]; // 최적의 도착 점을 첫 번째 측면 중앙 점으로 초기화

  // 모든 출발 점과 도착 점을 비교하여 가장 가까운 점 쌍을 찾음
  fromCenters.forEach((fromPoint) => {
    toCenters.forEach((toPoint) => {
      const distance = Math.hypot(
        fromPoint.x - toPoint.x,
        fromPoint.y - toPoint.y,
      ); // 두 점 사이의 유클리드 거리 계산
      if (distance < minDistance) {
        minDistance = distance; // 새로운 최소 거리 발견 시 업데이트
        bestFromPoint = fromPoint; // 최적의 출발 점 업데이트
        bestToPoint = toPoint; // 최적의 도착 점 업데이트
      }
    });
  });

  // 최적의 출발 점과 도착 점의 좌표 추출
  const fromX = bestFromPoint.x;
  const fromY = bestFromPoint.y;
  const toX = bestToPoint.x;
  const toY = bestToPoint.y;

  // 출발점과 도착점의 중간 좌표 계산
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;

  const offset = 15; // 화살표의 굴곡을 위한 오프셋 값

  let points: number[]; // 화살표를 그리기 위한 포인트 배열 선언

  // 출발점과 도착점의 수평 거리와 수직 거리를 비교하여 화살표의 방향 결정
  if (Math.abs(toX - fromX) > Math.abs(toY - fromY)) {
    // 수평 방향일 경우
    const direction = toX > fromX ? -1 : 1; // 도착점이 오른쪽에 있으면 왼쪽으로, 왼쪽에 있으면 오른쪽으로 오프셋 적용
    const adjustedToX = toX + direction * offset; // 도착점의 X 좌표를 오프셋만큼 조정
    const bendX = midX; // 굴곡점의 X 좌표를 중간 X로 설정

    // 화살표의 포인트 배열 설정: 출발점 -> 굴곡점 -> 도착점
    points = [fromX, fromY, bendX, fromY, bendX, toY, adjustedToX, toY];
  } else {
    // 수직 방향일 경우
    const direction = toY > fromY ? -1 : 1; // 도착점이 아래쪽에 있으면 위쪽으로, 위쪽에 있으면 아래쪽으로 오프셋 적용
    const adjustedToY = toY + direction * offset; // 도착점의 Y 좌표를 오프셋만큼 조정
    const bendY = midY; // 굴곡점의 Y 좌표를 중간 Y로 설정

    // 화살표의 포인트 배열 설정: 출발점 -> 굴곡점 -> 도착점
    points = [fromX, fromY, fromX, bendY, toX, bendY, toX, adjustedToY];
  }

  // 화살표 머리를 그리기 위한 계산
  const arrowLength = 5; // 화살표 머리의 길이 설정
  const len = points.length; // 포인트 배열의 길이
  const x1 = points[len - 4]; // 화살표 머리 시작점의 X 좌표
  const y1 = points[len - 3]; // 화살표 머리 시작점의 Y 좌표
  const x2 = points[len - 2]; // 화살표 머리 끝점의 X 좌표
  const y2 = points[len - 1]; // 화살표 머리 끝점의 Y 좌표

  const angle = Math.atan2(y2 - y1, x2 - x1); // 화살표 머리의 각도 계산 (라디안)

  // 화살표 머리의 끝점을 조정하여 머리 부분을 그리기 적합하게 함
  const x2_new = x2 - arrowLength * Math.cos(angle);
  const y2_new = y2 - arrowLength * Math.sin(angle);

  // 포인트 배열의 마지막 두 좌표를 업데이트하여 화살표 머리의 위치 조정
  points[len - 2] = x2_new;
  points[len - 1] = y2_new;

  return {
    points, // 화살표를 그리기 위한 포인트 배열
    arrowTipX: x2, // 화살표 머리의 X 좌표
    arrowTipY: y2, // 화살표 머리의 Y 좌표
  };
}
