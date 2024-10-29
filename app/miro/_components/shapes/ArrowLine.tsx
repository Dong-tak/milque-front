// components/shapes/ArrowLine.tsx
// 화살표의 모양과 방향, 드래그 가능한 시작점과 끝점을 관리합니다.

import React, { useRef, useEffect } from "react";
import { Shape, RegularPolygon, Circle } from "react-konva";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { ArrowShape } from "../../utils/types";

interface ArrowLineProps {
  shapeProps: ArrowShape; // 화살표의 속성
  isSelected?: boolean; // 화살표가 선택되었는지 여부
  onSelect?: () => void; // 화살표 선택 시 호출되는 함수
  onDragMove: (id: string, x: number, y: number, type: "from" | "to") => void; // 드래그 이동 시 호출되는 함수
  onContextMenu: (e: any) => void; // 우클릭 이벤트 핸들러 추가
  onDoubleClick: (e: any) => void; // 더블클릭 이벤트 핸들러 추가
}

const ArrowLine: React.FC<ArrowLineProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onDragMove,
  onContextMenu,
  onDoubleClick,
}) => {
  const { points, arrowTipX, arrowTipY, id, arrowHeads } = shapeProps; // showArrowHead를 arrowHeads로 변경

  // Ref 선언
  const shapeRef = useRef<Konva.Shape | null>(null); // 화살표 본체 Shape Ref
  const arrowHeadRef = useRef<Konva.RegularPolygon | null>(null); // 화살표 머리 RegularPolygon Ref

  // 화살표 헤드의 각도 계산
  const len = points.length;
  const x1 = points[len - 4];
  const y1 = points[len - 3];
  const dx = arrowTipX - x1;
  const dy = arrowTipY - y1;
  const angle = Math.atan2(dy, dx); // 라디안 단위의 각도 계산

  // 시작점의 각도 계산 (왼쪽 화살표를 위해)
  const startDx = points[2] - points[0];
  const startDy = points[3] - points[1];
  const startAngle = Math.atan2(startDy, startDx);

  /**
   * 선택 상태에 따른 화살표 스타일 변경
   */
  useEffect(() => {
    if (!shapeRef.current || !arrowHeadRef.current) return;

    if (isSelected) {
      shapeRef.current.moveToTop(); // 화살표 본체를 최상위로 이동
      arrowHeadRef.current.moveToTop(); // 화살표 머리를 최상위로 이동
      shapeRef.current.stroke("#00A3FF"); // 화살표 본체 스트로크 색상 변경
      arrowHeadRef.current.fill("#00A3FF"); // 화살표 머리 채우기 색상 변경
      arrowHeadRef.current.stroke("#00A3FF"); // 화살표 머리 스트로크 색상 변경
    } else {
      shapeRef.current.stroke("black"); // 화살표 본체 스트로크 색상 원래대로
      arrowHeadRef.current.fill("black"); // 화살표 머리 채우기 색상 원래대로
      arrowHeadRef.current.stroke("black"); // 화살표 머리 스트로크 색상 원래대로
    }
  }, [isSelected]);

  /**
   * 마우스가 화살표 본체 위로 올라갔을 때 커서를 포인터로 변경
   * @param {KonvaEventObject<MouseEvent>} e - 마우스 이벤트 객체
   */
  const handleMouseEnter = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = "pointer"; // 커서를 포인터로 변경
    }
  };

  /**
   * 마우스가 화살표 본체를 떠났을 때 커서를 기본으로 변경
   * @param {KonvaEventObject<MouseEvent>} e - 마우스 이벤트 객체
   */
  const handleMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = "default"; // 커서를 기본으로 변경
    }
  };

  /**
   * 화살표 클릭 시 선택 함수 호출
   */
  const handleArrowClick = () => {
    onSelect?.(); // 선택 함수 호출
  };

  return (
    <>
      {/* 투명한 선택 영역 */}
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(points[0], points[1]); // 시작점으로 이동
          for (let i = 2; i < points.length; i += 2) {
            context.lineTo(points[i], points[i + 1]); // 각 점으로 선 그리기
          }
          context.strokeShape(shape); // 그린 경로를 실제로 그리기
        }}
        stroke="transparent" // 투명한 선 상 (선택 영역)
        strokeWidth={20} // 선택 영역의 두께
        onClick={handleArrowClick} // 클릭 이벤트 핸들러 연결
        onContextMenu={(e) => {
          e.cancelBubble = true; // 이벤트 버블링 방지
          onContextMenu(e);
        }}
        onDblClick={(e) => {
          e.cancelBubble = true; // 이벤트 버블링 방지
          onDoubleClick(e);
        }}
        onMouseEnter={handleMouseEnter} // 마우스 엔터 이벤트 핸들러 연결
        onMouseLeave={handleMouseLeave} // 마우스 리브 이벤트 핸들러 연결
      />

      {/* 실제 화살표 */}
      <Shape
        ref={shapeRef} // 화살표 본체 Shape Ref 연결
        onContextMenu={(e) => {
          e.cancelBubble = true;
          onContextMenu(e);
        }}
        onDblClick={(e) => {
          e.cancelBubble = true;
          onDoubleClick(e);
        }}
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
            if (Math.abs(angleDiff) < 0.05) {
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
            context.arcTo(x2, y2, x2b, y2b, dist); // 꺾임을 위하여 곡선 그리기
          }

          // 마지막 선분 그리기
          context.lineTo(points[points.length - 2], points[points.length - 1]);

          context.strokeShape(shape); // 그린 경로를 실제로 그리기
        }}
        stroke="black" // 화살표 선 색상
        strokeWidth={2} // 화살표 선 두께
        lineJoin="round" // 선 연결 방식 (둥글게 연결)
      />

      {/* 오른쪽 화살표 머리 */}
      {arrowHeads.right && (
        <RegularPolygon
          ref={arrowHeadRef}
          sides={3}
          radius={10}
          fill="black"
          stroke="black"
          strokeWidth={2}
          x={arrowTipX}
          y={arrowTipY}
          rotation={(angle * 180) / Math.PI + 90}
          onContextMenu={onContextMenu}
          onDblClick={onDoubleClick}
        />
      )}

      {/* 왼쪽 화살표 머리 */}
      {arrowHeads.left && (
        <RegularPolygon
          sides={3}
          radius={10}
          fill="black"
          stroke="black"
          strokeWidth={2}
          x={points[0]}
          y={points[1]}
          rotation={(startAngle * 180) / Math.PI - 90} // 각도를 180도 반대로 설정
          onContextMenu={onContextMenu}
          onDblClick={onDoubleClick}
        />
      )}

      {/* 선택된 경우 드래그 가능한 시작점 표시 */}
      {isSelected && (
        <Circle
          x={points[0]} // 시작점의 x 좌표
          y={points[1]} // 시작점의 y 좌표
          radius={10} // 원의 반지름
          fill="red" // 원의 채우기 색상
          draggable // 드래그 가능하게 설정
          onDragMove={(e) => {
            // 드래그 이동 시 onDragMove 함수 호출
            onDragMove(id, e.target.x(), e.target.y(), "from");
          }}
        />
      )}

      {/* 선택된 경우 드래그 가능한 끝점 표시 */}
      {isSelected && (
        <Circle
          x={arrowTipX} // 끝점의 x 좌표
          y={arrowTipY} // 끝점의 y 좌표
          radius={15} // 원의 반지름
          fill="red" // 원의 채우기 색상
          draggable // 드래그 가능하게 설정
          onDragMove={(e) => {
            // 드래그 이동 시 onDragMove 함수 호출
            onDragMove(id, e.target.x(), e.target.y(), "to");
          }}
        />
      )}
    </>
  );
};

export default ArrowLine; // ArrowLine 컴포넌트 내보내기
