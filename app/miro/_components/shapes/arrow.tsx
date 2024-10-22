// components/shapes/Arrow.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Shape,
  RegularPolygon,
  Circle,
  Label,
  Tag,
  Text,
  Transformer,
} from "react-konva";
import Konva from "konva";
import { ArrowShape } from "../../utils/types"; // ArrowShape 타입을 import
import { KonvaEventObject } from "konva/lib/Node";

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
  const { points, arrowTipX, arrowTipY, id } = shapeProps; // 화살표의 점들과 끝점 좌표를 추출
  const shapeRef = useRef<Konva.Shape | null>(null);
  const arrowHeadRef = useRef<Konva.RegularPolygon | null>(null);
  const textBoxRef = useRef<Konva.Label | null>(null);
  const textRef = useRef<Konva.Text | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);
  const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 선택 상태가 변경될 때 실행되는 useEffect
  useEffect(() => {
    if (!shapeRef.current || !arrowHeadRef.current) return;

    if (isSelected) {
      // 선택된 화살표를 최상위로 이동
      shapeRef.current.moveToTop();
      arrowHeadRef.current.moveToTop();
      // 선택 표시를 위해 스트로크 색상 변경
      shapeRef.current.stroke("#00A3FF");
      arrowHeadRef.current.fill("#00A3FF");
      arrowHeadRef.current.stroke("#00A3FF");
    } else {
      // 선택 해제 시 원래 색상으로 복원
      shapeRef.current.stroke("black");
      arrowHeadRef.current.fill("black");
      arrowHeadRef.current.stroke("black");
    }
  }, [isSelected]);

  useEffect(() => {
    if (isSelected && isTextBoxVisible && textBoxRef.current && trRef.current) {
      trRef.current.nodes([textBoxRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, isTextBoxVisible]);

  // 화살표 본체에 대한 이벤트 핸들러 추가
  const handleMouseEnter = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = "pointer";
    }
  };

  const handleMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = "default";
    }
  };

  // 화살표 헤드의 각도 계산
  const len = points.length;
  const x1 = points[len - 4];
  const y1 = points[len - 3];
  const dx = arrowTipX - x1;
  const dy = arrowTipY - y1;
  const angle = Math.atan2(dy, dx);

  // 꺾임 지점 계산 (중간 지점으로 가정)
  const bendPointIndex = Math.floor(points.length / 2);
  const bendPointX = points[bendPointIndex];
  const bendPointY = points[bendPointIndex + 1];

  const toggleTextBox = React.useCallback(() => {
    setIsTextBoxVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "T" || e.key === "t") && isSelected) {
        toggleTextBox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSelected, toggleTextBox]);

  // 텍스트 박스의 위치를 계산하는 함수
  const calculateTextBoxPosition = () => {
    const bendPointIndex = Math.floor(points.length / 2);
    const bendPointX = points[bendPointIndex];
    const bendPointY = points[bendPointIndex + 1];
    return { x: bendPointX, y: bendPointY };
  };

  // 텍스트 박스의 위치
  const textBoxPosition = calculateTextBoxPosition();

  useEffect(() => {
    if (textBoxRef.current && isTextBoxVisible) {
      textBoxRef.current.moveToTop();
    }
  }, [isTextBoxVisible]);

  const handleTextDblClick = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;

    setIsEditing(true);
    const textPosition = textRef.current?.absolutePosition();
    if (!textPosition) return;

    const areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y,
    };

    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);

    textarea.value = textRef.current?.text() || "";
    textarea.style.position = "absolute";
    textarea.style.top = `${areaPosition.y}px`;
    textarea.style.left = `${areaPosition.x}px`;
    textarea.style.width = `${(textRef.current?.width() || 0) - 5}px`;
    textarea.style.height = `${(textRef.current?.height() || 0) - 5}px`;
    textarea.style.fontSize = `${textRef.current?.fontSize()}px`;
    textarea.style.border = "none";
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.overflow = "hidden";
    textarea.style.background = "none";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    textarea.style.lineHeight = textRef.current?.lineHeight() + "";
    textarea.style.fontFamily = textRef.current?.fontFamily() || "";
    textarea.style.transformOrigin = "left top";
    textarea.style.textAlign = textRef.current?.align() || "left";

    const fill = textRef.current?.fill();
    textarea.style.color = typeof fill === "string" ? fill : "black";

    textarea.focus();

    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target !== textarea) {
        textRef.current?.text(textarea.value);
        setIsEditing(false);
        document.body.removeChild(textarea);
        window.removeEventListener("click", handleOutsideClick);
      }
    };

    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        textRef.current?.text(textarea.value);
        setIsEditing(false);
        document.body.removeChild(textarea);
        window.removeEventListener("click", handleOutsideClick);
      }
      if (e.key === "Escape") {
        setIsEditing(false);
        document.body.removeChild(textarea);
        window.removeEventListener("click", handleOutsideClick);
      }
    });

    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });
  };

  const handleTextTransform = () => {
    if (textRef.current) {
      const node = textRef.current;
      const scaleX = node.scaleX();
      node.setAttrs({
        width: Math.max(node.width() * scaleX, 20),
        scaleX: 1,
      });
    }
  };

  return (
    <>
      {/* 투명한 선택 영역 */}
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(points[0], points[1]);
          for (let i = 2; i < points.length; i += 2) {
            context.lineTo(points[i], points[i + 1]);
          }
          context.strokeShape(shape);
        }}
        stroke="transparent"
        strokeWidth={20}
        onClick={onSelect}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDblClick={toggleTextBox}
      />

      {/* 실제 화살표 */}
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
            context.arcTo(x2, y2, x2b, y2b, dist); // 꺾임을 위 곡선 그리기
          }

          // 마지막 선분 그리기
          context.lineTo(points[points.length - 2], points[points.length - 1]);

          context.strokeShape(shape); // 그린 경로를 실제로 그리기
        }}
        stroke="black" // 선 색상
        strokeWidth={2} // 화살표 선 두께
        lineJoin="round" // 선 연결 방식
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

      {/* 텍스트 박스 */}
      {isTextBoxVisible && (
        <Label
          ref={textBoxRef}
          x={textBoxPosition.x}
          y={textBoxPosition.y}
          offsetX={100}
          offsetY={25}
          draggable
        >
          <Tag
            fill="white"
            stroke="black"
            strokeWidth={1}
            cornerRadius={4}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.5}
            shadowOffsetX={5}
            shadowOffsetY={5}
          />
          <Text
            ref={textRef}
            text="텍스트를 입력하세요"
            fontSize={16}
            padding={5}
            fill="black"
            width={200}
            height={50}
            align="center"
            verticalAlign="middle"
            onDblClick={handleTextDblClick}
            onTransform={handleTextTransform}
          />
        </Label>
      )}

      {isSelected && !isEditing && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }}
          enabledAnchors={["middle-left", "middle-right"]}
          rotateEnabled={false}
        />
      )}

      {/* 선택된 경우 드래그 가능한 원점 표시 */}
      {isSelected && (
        <>
          {/* 시작점 드래그 핸들 */}
          <Circle
            x={points[0]} // 시작점 X 좌표
            y={points[1]} // 시작점 Y 좌표
            radius={10} // 원의 반지름
            fill="red" // 원의 채우기 색상
            draggable // 드래그 가능하게 설정
            onDragMove={(e) => {
              // 드래그 이동 시 onDragMove 함수 호출
              onDragMove(id, e.target.x(), e.target.y(), "from");
            }}
          />

          {/* 끝점 드래그 핸들 */}
          <Circle
            x={arrowTipX} // 끝점 X 좌표
            y={arrowTipY} // 끝점 Y 좌표
            radius={15} // 원의 반지름
            fill="red" // 원의 채우기 색상
            draggable // 드래그 가능하게 설정
            onDragMove={(e) => {
              // 드래그 이동 시 onDragMove 함수 호출
              onDragMove(id, e.target.x(), e.target.y(), "to");
            }}
          />

          {/* 텍스트 박스 드래그 핸들 */}
          <Circle
            x={bendPointX}
            y={bendPointY}
            radius={8}
            fill="blue"
            onDblClick={toggleTextBox}
          />
        </>
      )}
    </>
  );
};

export default Arrow;
