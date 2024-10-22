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
import { updateArrows } from "../../utils/updatearrow";
import { defaultProps } from "@blocknote/core";


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
  const [stageSize, setStageSize] = useState({ width: 800, height: 800 });

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
    const initialText = [
      {
        type: "heading",
        props: {
          textColor: "default",
          backgroundColor: "default",
          textAlignment: "left",
          level: 3,
        },
        content: "",
      },
      {
        type: "bulletListItem",
        content: "",
      },
      {
        type: "paragraph",
        content: "",
      },
    ];
    setShapes([
      ...shapes,
      {
        id,
        type: "textbox",
        x: x,
        y: y,
        text: JSON.stringify(initialText),
        fontSize: 24,
        draggable: true,
      },
    ]);
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
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

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

      let startPoint = { x, y };
      if (startShape) {
        startPoint = getClosestSidePoint(startShape, x, y);
      }

      const newArrow: ArrowShape = {
        id: `arrow-${shapes.length + 1}`,
        type: "arrow",
        from: startShape ? startShape.id : "",
        to: "",
        points: [startPoint.x, startPoint.y, startPoint.x, startPoint.y],
        arrowTipX: startPoint.x,
        arrowTipY: startPoint.y,
      };
      setNewShape(newArrow);
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing || !newShape) return;

    const stage = stageRef.current;
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

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

      setNewShape({
        ...newShape,
        to: endShape ? endShape.id : "",
        points: newPoints,
        arrowTipX: endPoint.x,
        arrowTipY: endPoint.y,
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

    setNewShape(null);
    setIsDrawing(false);
    setIsRectangleMode(false);
    setIsArrowMode(false);
  };

  const handleArrowPointDrag = (
    id: string,
    x: number,
    y: number,
    type: "from" | "to",
  ) => {
    const updatedShapes = shapes.map((shape) => {
      if (isArrow(shape) && shape.id === id) {
        const otherShapes = shapes.filter(
          (s) =>
            (isRectangle(s) || isText(s)) &&
            s.id !== (type === "from" ? shape.from : shape.to),
        );
        const closestShape = findClosestShapeAtPoint(
          x,
          y,
          otherShapes as (RectangleShape | TextShape)[],
        );

        if (closestShape) {
          const closestPoint = getClosestSidePoint(closestShape, x, y);
          x = closestPoint.x;
          y = closestPoint.y;

          if (type === "from") {
            shape.from = closestShape.id;
          } else {
            shape.to = closestShape.id;
          }
        } else {
          if (type === "from") {
            shape.from = "";
          } else {
            shape.to = "";
          }
        }

        const newPoints = [...shape.points];
        if (type === "from") {
          newPoints[0] = x;
          newPoints[1] = y;
        } else {
          newPoints[newPoints.length - 2] = x;
          newPoints[newPoints.length - 1] = y;
        }

        return {
          ...shape,
          points: newPoints,
          arrowTipX: type === "to" ? x : shape.arrowTipX,
          arrowTipY: type === "to" ? y : shape.arrowTipY,
        };
      }
      return shape;
    });

    setShapes(updatedShapes);
  };

  const drawGrid = (context: CanvasRenderingContext2D, shape: any) => {
    let baseSpacing = 30; // 기본 간격
    let basePointSize = 2; // 기본 점 크기

    const stage = shape.getStage();
    const scale = stage.scaleX(); // scaleX와 scaleY가 동일하다고 가정
    const position = stage.position(); // 스테이지의 현재 위치
    const stageWidth = stage.width();
    const stageHeight = stage.height();

    if (scale < 0.3) {
      baseSpacing = 60;
      basePointSize = 4;
    } else {
      baseSpacing = 30;
    }
    // 화면에 보이는 영역의 좌표 계산
    const visibleStartX = -position.x / scale;
    const visibleEndX = (stageWidth - position.x) / scale;
    const visibleStartY = -position.y / scale;
    const visibleEndY = (stageHeight - position.y) / scale;

    context.fillStyle = "#E6E6E6";

    // 보이는 영역 전체에 점 그리기
    for (
      let x = Math.floor(visibleStartX / baseSpacing) * baseSpacing;
      x <= visibleEndX;
      x += baseSpacing
    ) {
      for (
        let y = Math.floor(visibleStartY / baseSpacing) * baseSpacing;
        y <= visibleEndY;
        y += baseSpacing
      ) {
        context.beginPath();
        context.arc(x, y, basePointSize, 0, 2 * Math.PI);
        context.fill();
      }
    }
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
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          style={{ backgroundColor: "#ffffff" }}
          ref={stageRef}
          draggable={isPanning}
          scaleX={stageScale}
          scaleY={stageScale}
          x={stagePosition.x}
          y={stagePosition.y}
          onWheel={handleWheel}
          onDragMove={() => {
            // 스테이지 위치가 변경되면 Layer를 다시 그립니다.
            const layer = stageRef.current.findOne("Layer");
            layer.batchDraw();
          }}
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
          {/* 그리드 레이어 */}
          <Layer>
            <Shape
              sceneFunc={(context: any, shape: any) => {
                drawGrid(context, shape);
              }}
              listening={false} // 그리드가 이벤트를 받지 않도록 설정
            />
          </Layer>
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
                    onDragMove={(e: any) => {
                      const node = e.target;
                      updateArrows(
                        shape.id,
                        node.x(),
                        node.y(),
                        shapes,
                        setShapes,
                      );
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
                    onChange={(newAttrs: Partial<ArrowShape>) => {
                      const newShapes = shapes.map((s) =>
                        s.id === shape.id ? { ...s, ...newAttrs } : s,
                      ) as (RectangleShape | ArrowShape | TextShape)[];
                      setShapes(newShapes);
                    }}
                    onDragMove={handleArrowPointDrag}
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
                onChange={() => {}} // 빈 함수로 설정
                onDragMove={() => {}} // 빈 함수로 설정
              />
            )}
          </Layer>
        </Stage>
        {/* 툴바 컴��넌트 */}
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
