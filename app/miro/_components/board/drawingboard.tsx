// components/DrawingBoard.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import Rectangle from "../shapes/rectangle";
import Arrow from "../shapes/arrow";
import TextNode from "../shapes/textnode";
import Toolbar from "../Toolbar";
import {
  ShapeProps,
  RectangleShape,
  TextShape,
  ArrowShape,
  isRectangle,
  isArrow,
  isText,
} from "../../utils/types";
import {
  findClosestShapeAtPoint,
  getClosestSidePoint,
  snapDistance,
} from "../../utils/helpers";
import { getConnectorPoints } from "../../utils/arrowUtils";

const DrawingBoard = () => {
  const [shapes, setShapes] = useState<
    (RectangleShape | ArrowShape | TextShape)[]
  >([]);
  const stageRef = useRef<any>(null);
  const [isDrawing, setIsDrawing] = useState(false); // 드로잉 상태
  const [newShape, setNewShape] = useState<RectangleShape | ArrowShape | null>(
    null,
  ); // 현재 그리는 도형
  const [isRectangleMode, setIsRectangleMode] = useState(false); // 사각형 생성 모드
  const [isArrowMode, setIsArrowMode] = useState(false); // 화살표 생성 모드

  // 스테이지 스케일 및 위치 상태
  const initialScale = 1;
  const [stageScale, setStageScale] = useState(initialScale);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
  const minScale = 0.5;
  const maxScale = 2;

  // 팬닝 상태 (스페이스바를 누를 때 팬닝 가능)
  const [isPanning, setIsPanning] = useState(false);

  // 스테이지 크기 상태
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    // 클라이언트 사이드에서만 window 객체에 접근
    if (typeof window !== "undefined") {
      setStageSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setStageSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsPanning(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsPanning(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // 휠 이벤트를 통한 줌 제어
  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stageScale;

    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stagePosition.x) / oldScale,
      y: (pointer.y - stagePosition.y) / oldScale,
    };

    let newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    newScale = Math.max(minScale, Math.min(maxScale, newScale));

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    setStageScale(newScale);
    setStagePosition(newPos);
  };

  // 도형 추가 함수들
  const addTextAtPosition = (x: number, y: number) => {
    const id = `text-${shapes.length + 1}`;
    const newText: TextShape = {
      id,
      type: "textbox",
      x: x,
      y: y,
      text: "텍스트",
      fontSize: 24,
      draggable: true,
    };
    setShapes([...shapes, newText]);
  };

  // Stage click event handler
  const handleStageClick = (e: any) => {
    // 빈 공간을 클릭하면 선택 해제
    if (e.target === e.target.getStage()) {
      const newShapes = shapes.map((s) => ({
        ...s,
        isSelected: false,
      }));
      setShapes(newShapes);
    }
  };

  // 사각형 생성 모드 활성화 (툴바 클릭 시 호출)
  const handleRectangleToolClick = () => {
    setIsRectangleMode(true); // 사각형 생성 모드 활성화
    setIsArrowMode(false); // 화살표 생성 모드 비활성화
  };

  // 화살표 생성 모드 활성화
  const handleArrowToolClick = () => {
    setIsArrowMode(true); // 화살표 생성 모드 활성화
    setIsRectangleMode(false); // 사각형 생성 모드 비활성화
  };

  const handleMouseDown = (e: any) => {
    if (isPanning) return;

    const stage = stageRef.current;
    const pointerPos = stage.getPointerPosition(); // 클릭한 포인터 위치
    if (!pointerPos) return;

    // 스케일과 스테이지 위치를 고려해 포인터 좌표를 변환
    const adjustedPos = {
      x: (pointerPos.x - stagePosition.x) / stageScale,
      y: (pointerPos.y - stagePosition.y) / stageScale,
    };

    const { x, y } = adjustedPos;

    if (isRectangleMode && !isDrawing) {
      const newRect: RectangleShape = {
        id: `rect-${shapes.length + 1}`,
        type: "rectangle",
        x,
        y,
        width: 0,
        height: 0,
        fill: "rgba(0, 0, 255, 0.5)", // 미리보기 색상
        draggable: false,
      };
      setNewShape(newRect);
      setIsDrawing(true); // 드로잉 시작
    } else if (isArrowMode && !isDrawing) {
      const startShape = findClosestShapeAtPoint(
        x,
        y,
        shapes.filter((s) => isRectangle(s) || isText(s)) as (
          | RectangleShape
          | TextShape
        )[],
      );
      if (startShape) {
        const startPoint = getClosestSidePoint(startShape, x, y);
        const newArrow: ArrowShape = {
          id: `arrow-${shapes.length + 1}`,
          type: "arrow",
          from: startShape.id,
          to: "", // 끝점은 나중에 설정
          points: [startPoint.x, startPoint.y, startPoint.x, startPoint.y],
          arrowTipX: startPoint.x,
          arrowTipY: startPoint.y,
        };
        setNewShape(newArrow);
        setIsDrawing(true); // 드로잉 시작
      }
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing || !newShape) return;

    const stage = stageRef.current;
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    // 스케일과 위치를 고려해 포인터 좌표를 변환
    const adjustedPos = {
      x: (pointerPos.x - stagePosition.x) / stageScale,
      y: (pointerPos.y - stagePosition.y) / stageScale,
    };

    const { x, y } = adjustedPos;

    if (isRectangleMode && newShape.type === "rectangle") {
      const width = x - newShape.x;
      const height = y - newShape.y;

      setNewShape({
        ...newShape,
        width: Math.abs(width),
        height: Math.abs(height),
        x: width < 0 ? x : newShape.x,
        y: height < 0 ? y : newShape.y,
      });
    } else if (isArrowMode && newShape.type === "arrow") {
      // 끝점에서 가장 가까운 도형 찾기
      const endShape = findClosestShapeAtPoint(
        x,
        y,
        shapes.filter((s) => isRectangle(s) || isText(s)) as (
          | RectangleShape
          | TextShape
        )[],
      );
      let endPoint = { x, y };
      if (endShape) {
        endPoint = getClosestSidePoint(endShape, x, y);
      }
      const newPoints = [
        newShape.points[0],
        newShape.points[1],
        endPoint.x,
        endPoint.y,
      ];

      // 화살표 헤드 계산
      const len = newPoints.length;
      const x1 = newPoints[len - 4];
      const y1 = newPoints[len - 3];
      const x2 = newPoints[len - 2];
      const y2 = newPoints[len - 1];
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const arrowLength = 10;
      const x2_new = x2 - arrowLength * Math.cos(angle);
      const y2_new = y2 - arrowLength * Math.sin(angle);
      newPoints[len - 2] = x2_new;
      newPoints[len - 1] = y2_new;

      setNewShape({
        ...newShape,
        to: endShape ? endShape.id : "",
        points: newPoints,
        arrowTipX: x2,
        arrowTipY: y2,
      });
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing || !newShape) return;

    if (isRectangleMode && newShape.type === "rectangle") {
      const finalizedRect: RectangleShape = {
        ...newShape,
        fill: "blue",
        draggable: true,
      };
      setShapes([...shapes, finalizedRect]);
    } else if (isArrowMode && newShape.type === "arrow") {
      setShapes([...shapes, newShape]);
    }

    setNewShape(null); // 초기화
    setIsDrawing(false); // 드로잉 종료
    setIsRectangleMode(false);
    setIsArrowMode(false);
  };

  // 도형 이동 시 연결된 화살표 업데이트
  const updateArrows = (movedShapeId: string) => {
    const updatedShapes = shapes.map((shape) => {
      if (isArrow(shape)) {
        if (shape.from === movedShapeId || shape.to === movedShapeId) {
          const fromShape = shapes.find((s) => s.id === shape.from) as
            | RectangleShape
            | TextShape;
          const toShape = shapes.find((s) => s.id === shape.to) as
            | RectangleShape
            | TextShape;
          if (fromShape && toShape) {
            const result = getConnectorPoints(fromShape, toShape);
            return {
              ...shape,
              points: result.points,
              arrowTipX: result.arrowTipX,
              arrowTipY: result.arrowTipY,
            };
          }
        }
      }
      return shape;
    });
    setShapes(updatedShapes);
  };

  return (
    <div>
      {/* 보드 */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          width: "100%",
          height: "80vh",
          position: "relative",
        }}
      >
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          style={{ backgroundColor: "#f0f0f0" }}
          ref={stageRef}
          draggable={isPanning}
          scaleX={stageScale}
          scaleY={stageScale}
          x={stagePosition.x}
          y={stagePosition.y}
          onWheel={handleWheel}
          onDragEnd={(e) => {
            if (e.target === e.target.getStage()) {
              // 스테이지 자체가 드래그된 경우에만 위치 업데이트
              setStagePosition({
                x: e.target.x(),
                y: e.target.y(),
              });
            }
          }}
          onMouseDown={handleStageClick}
          onContextMenu={(e) => e.evt.preventDefault()}
        >
          <Layer>
            {/* 도형들 렌더링 */}
            {shapes.map((shape) => {
              if (isRectangle(shape)) {
                return (
                  <Rectangle
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.isSelected ?? false}
                    onSelect={() => {
                      const newShapes = shapes.map((s) => ({
                        ...s,
                        isSelected: s.id === shape.id,
                      }));
                      setShapes(newShapes);
                    }}
                    onChange={(newAttrs: Partial<RectangleShape>) => {
                      const newShapes = shapes.map((s) =>
                        s.id === shape.id ? { ...s, ...newAttrs } : s,
                      ) as (RectangleShape | ArrowShape | TextShape)[];
                      setShapes(newShapes);
                    }}
                    onDragMove={() => updateArrows(shape.id)}
                  />
                );
              } else if (isArrow(shape)) {
                return (
                  <Arrow
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.isSelected}
                    onSelect={() => {
                      const newShapes = shapes.map((s) => ({
                        ...s,
                        isSelected: s.id === shape.id,
                      }));
                      setShapes(newShapes);
                    }}
                  />
                );
              } else if (isText(shape)) {
                return (
                  <TextNode
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.isSelected ?? false}
                    onSelect={() => {
                      const newShapes = shapes.map((s) => ({
                        ...s,
                        isSelected: s.id === shape.id,
                      }));
                      setShapes(newShapes);
                    }}
                    onChange={(newAttrs: Partial<TextShape>) => {
                      const newShapes = shapes.map((s) =>
                        s.id === shape.id ? { ...s, ...newAttrs } : s,
                      ) as (RectangleShape | ArrowShape | TextShape)[];
                      setShapes(newShapes);
                    }}
                    onDragMove={() => updateArrows(shape.id)}
                  />
                );
              }
              return null;
            })}
            {/* 드로잉 중인 도형 미리보기 */}
            {newShape && newShape.type === "rectangle" && (
              <Rectangle
                shapeProps={newShape}
                isSelected={false}
                onSelect={() => {}}
                onChange={() => {}}
              />
            )}
            {newShape && newShape.type === "arrow" && (
              <Arrow
                shapeProps={newShape}
                isSelected={false}
                onSelect={() => {}}
              />
            )}
          </Layer>
        </Stage>
        {/* 툴바 컴포넌트 */}
        <Toolbar
          onRectangleToolClick={handleRectangleToolClick}
          onArrowToolClick={handleArrowToolClick}
          onAddText={() =>
            addTextAtPosition(stageSize.width / 2, stageSize.height / 2)
          }
        />
      </div>
    </div>
  );
};

export default DrawingBoard;
