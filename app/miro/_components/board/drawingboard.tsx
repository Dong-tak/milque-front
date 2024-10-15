// components/DrawingBoard.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Stage,
  Layer,
  Group,
  Rect,
  Text,
  Arrow as KonvaArrow,
} from "react-konva";
import Rectangle from "../shapes/rectangle";
import Arrow from "../shapes/arrow";
import TextNode from "../shapes/textnode";

const DrawingBoard = () => {
  const [shapes, setShapes] = useState<any[]>([]);
  const stageRef = useRef<any>(null);

  // 스테이지 스케일 및 위치 상태
  const initialScale = 1 / 10;
  const [stageScale, setStageScale] = useState(initialScale);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
  const minScale = initialScale;
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

  // 줌 인/아웃 및 리셋 함수
  const zoomIn = () => {
    const scaleBy = 1.2;
    const newScale = stageScale * scaleBy;
    if (newScale <= maxScale) {
      setStageScale(newScale);
    }
  };

  const zoomOut = () => {
    const scaleBy = 1.2;
    const newScale = stageScale / scaleBy;
    if (newScale >= minScale) {
      setStageScale(newScale);
    }
  };

  const resetTransform = () => {
    setStageScale(initialScale);
    setStagePosition({ x: 0, y: 0 });
  };

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
  const addRectangleAtPosition = (x: number, y: number) => {
    const id = `rect-${shapes.length + 1}`;
    setShapes([
      ...shapes,
      {
        id,
        type: "rectangle",
        x: x,
        y: y,
        width: 100,
        height: 100,
        fill: "red",
        draggable: true,
      },
    ]);
  };

  const addArrowAtPosition = (x: number, y: number) => {
    const id = `arrow-${shapes.length + 1}`;
    setShapes([
      ...shapes,
      {
        id,
        type: "arrow",
        points: [x, y, x + 100, y + 100],
        stroke: "black",
        strokeWidth: 2,
        draggable: true,
      },
    ]);
  };

  const addTextAtPosition = (x: number, y: number) => {
    const id = `text-${shapes.length + 1}`;
    setShapes([
      ...shapes,
      {
        id,
        type: "text",
        x: x,
        y: y,
        text: "텍스트",
        fontSize: 24,
        draggable: true,
      },
    ]);
  };

  // 스테이지 클릭 이벤트 처리
  const handleStageClick = (e: any) => {
    // 다른 곳을 클릭하면 선택 해제
    const newShapes = shapes.map((s) => ({
      ...s,
      isSelected: false,
    }));
    setShapes(newShapes);
  };

  return (
    <div>
      {/* 보드 */}
      <div
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
              switch (shape.type) {
                case "rectangle":
                  return (
                    <Rectangle
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
                      onChange={(newAttrs: Partial<typeof shape>) => {
                        const newShapes = shapes.map((s) =>
                          s.id === shape.id ? { ...s, ...newAttrs } : s,
                        );
                        setShapes(newShapes);
                      }}
                    />
                  );
                case "arrow":
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
                      onChange={(newAttrs: Partial<typeof shape>) => {
                        const newShapes = shapes.map((s) =>
                          s.id === shape.id ? { ...s, ...newAttrs } : s,
                        );
                        setShapes(newShapes);
                      }}
                    />
                  );
                case "text":
                  return (
                    <TextNode
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
                      onChange={(newAttrs: Partial<typeof shape>) => {
                        const newShapes = shapes.map((s) =>
                          s.id === shape.id ? { ...s, ...newAttrs } : s,
                        );
                        setShapes(newShapes);
                      }}
                    />
                  );
                default:
                  return null;
              }
            })}

            {/* 툴팁 */}
            {/* 툴팁 (항상 표시) */}
          </Layer>
        </Stage>
        {/* 툴팁 (Stage 밖으로 이동) */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            backgroundColor: "white",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "10px",
            display: "flex",
            gap: "20px",
          }}
        >
          <div
            onClick={() =>
              addRectangleAtPosition(stageSize.width / 2, stageSize.height / 2)
            }
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "red",
                margin: "auto",
              }}
            ></div>
            <span>사각형</span>
          </div>
          <div
            onClick={() =>
              addArrowAtPosition(stageSize.width / 2, stageSize.height / 2)
            }
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                margin: "auto",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: "black",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  width: 0,
                  height: 0,
                  borderTop: "5px solid transparent",
                  borderBottom: "5px solid transparent",
                  borderLeft: "10px solid black",
                  transform: "translateY(-50%)",
                }}
              ></div>
            </div>
            <span>화살표</span>
          </div>
          <div
            onClick={() =>
              addTextAtPosition(stageSize.width / 2, stageSize.height / 2)
            }
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                margin: "auto",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              T
            </div>
            <span>텍스트</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingBoard;
