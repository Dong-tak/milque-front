// components/shapes/Arrow.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { Shape, RegularPolygon, Circle } from "react-konva";
import { ArrowShape } from "../../utils/types"; // ArrowShape 타입을 import

// Arrow 컴포넌트의 Props 인터페이스 정의
interface ArrowProps {
  shapeProps: ArrowShape; // 화살표의 속성
  isSelected?: boolean; // 선택 여부
  onSelect?: () => void; // 선택 시 호출되는 함수
  onChange: (newAttrs: Partial<ArrowShape>) => void; // 속성 변경 시 호출되는 함수
  onDragMove: (id: string, x: number, y: number, type: "from" | "to") => void; // 드래그 이동 시 호출되는 함수
}

// Arrow 컴포넌트 정의
const Arrow: React.FC<ArrowProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragMove,
}) => {
  const { points, arrowTipX, arrowTipY } = shapeProps; // 화살표의 점들과 끝점 좌표를 추출

  // 참조를 위한 useRef 훅 사용
  const shapeRef = useRef<any>(null);
  const arrowHeadRef = useRef<any>(null);

  // 선택 상태가 변경될 때 실행되는 useEffect
  useEffect(() => {
    if (isSelected) {
      // 선택 시 처리 (필요한 경우)
      // 예: shapeRef.current.moveToTop();
    }
  }, [isSelected]);

  // 화살표 헤드의 각도 계산
  const len = points.length;
  const x1 = points[len - 4];
  const y1 = points[len - 3];
  const dx = arrowTipX - x1;
  const dy = arrowTipY - y1;
  const angle = Math.atan2(dy, dx);

  return (
    <>
      {/* 화살표의 본체를 그리기 위한 Shape 컴포넌트 */}
      <Shape
        ref={shapeRef}
        sceneFunc={(context, shape) => {
          const radius = 15; // 꺾임 부분의 최대 반지름
          if (points.length < 4) {
            return; // 점이 충분하지 않으면 그리지 않음
          }

          context.beginPath();
          context.moveTo(points[0], points[1]); // 시작점으로 이동

          // 각 점을 순회하며 꺾임을 처리
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

            // 각도 차이를 -π에서 π 사이로 조정
            if (angleDiff > Math.PI) {
              angleDiff -= 2 * Math.PI;
            } else if (angleDiff < -Math.PI) {
              angleDiff += 2 * Math.PI;
            }

            // 꺾임이 거의 없으면 직선으로 연결
            if (Math.abs(angleDiff) < 0.01) {
              context.lineTo(x2, y2);
              continue;
            }

            // 꺾임의 반지름 계산
            const dist = Math.min(
              radius,
              Math.hypot(dx1, dy1) / 2,
              Math.hypot(dx2, dy2) / 2,
            );

            // 꺾임을 위한 제어점 계산
            const x2a = x2 - dist * Math.cos(angle1);
            const y2a = y2 - dist * Math.sin(angle1);
            const x2b = x2 + dist * Math.cos(angle2);
            const y2b = y2 + dist * Math.sin(angle2);

            context.lineTo(x2a, y2a); // 제어점까지 선 그리기
            context.arcTo(x2, y2, x2b, y2b, dist); // 꺾임을 위한 곡선 그리기
          }

          // 마지막 선분 그리기
          context.lineTo(points[points.length - 2], points[points.length - 1]);

          context.strokeShape(shape); // 그린 경로를 실제로 그리기
        }}
        stroke="black" // 선 색상
        strokeWidth={2} // 화살표 선 두께
        lineJoin="round" // 선 연결 방식
        onClick={onSelect} // 클릭 시 선택 함수 호출
      />

      {/* 화살표 머리를 그리기 위한 RegularPolygon 컴포넌트 */}
      <RegularPolygon
        ref={arrowHeadRef}
        sides={3} // 삼각형 (화살표 머리)
        radius={10} // 화살표 머리 반지름
        fill="black" // 채우기 색상
        stroke="black" // 선 색상
        strokeWidth={2} // 화살표 머리 두께
        x={arrowTipX} // 머리의 X 좌표
        y={arrowTipY} // 머리의 Y 좌표
        rotation={(angle * 180) / Math.PI + 90} // 화살표 머리 회전 각도
      />

      {/* 선택된 경우 드래그 가능한 원점 표시 */}
      {isSelected && (
        <>
          {/* 시작점 드래그 핸들 */}
          <Circle
            x={points[0]} // 시작점 X 좌표
            y={points[1]} // 시작점 Y 좌표
            radius={8} // 원의 반지름
            fill="red" // 원의 채우기 색상
            draggable // 드래그 가능하게 설정
            onDragMove={(e) => {
              // 드래그 이동 시 onDragMove 함수 호출
              onDragMove(shapeProps.id, e.target.x(), e.target.y(), "from");
            }}
          />

          {/* 끝점 드래그 핸들 */}
          <Circle
            x={arrowTipX} // 끝점 X 좌표
            y={arrowTipY} // 끝점 Y 좌표
            radius={10} // 원의 반지름
            fill="red" // 원의 채우기 색상
            draggable // 드래그 가능하게 설정
            onDragMove={(e) => {
              // 드래그 이동 시 onDragMove 함수 호출
              onDragMove(shapeProps.id, e.target.x(), e.target.y(), "to");
            }}
          />
        </>
      )}
    </>
  );
};

export default Arrow;
