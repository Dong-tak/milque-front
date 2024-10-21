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
import { defaultProps } from "@blocknote/core";

const DrawingBoard = () => {
  const [shapes, setShapes] = useState<any[]>([]);
  const stageRef = useRef<any>(null);
  const [isDrawing, setIsDrawing] = useState(false); // 드로잉 상태
  const [newShape, setNewShape] = useState<any>(null); // 현재 그리는 사각형
  const [isRectangleMode, setIsRectangleMode] = useState(false); // 사각형 생성 모드

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
    // Only deselect if clicked on empty area (Stage)
    if (e.target === e.target.getStage()) {
      const newShapes = shapes.map((s) => ({
        ...s,
        isSelected: false,
      }));
      setShapes(newShapes);
    }
  };

  // 사각형 생성 모드 활성화 (툴팁 클릭 시 호출)
  const handleRectangleToolClick = () => {
    setIsRectangleMode(true); // 사각형 생성 모드 활성화
  };

  const handleMouseDown = (e: any) => {
    if (!isRectangleMode || isDrawing) return;

    const stage = stageRef.current;
    const pointerPos = stage.getPointerPosition(); // 클릭한 포인터 위치
    if (!pointerPos) return;

    // 스케일과 스테이지 위치를 고려해 포인터 좌표를 변환
    const adjustedPos = {
      x: (pointerPos.x - stagePosition.x) / stageScale,
      y: (pointerPos.y - stagePosition.y) / stageScale,
    };

    const { x, y } = adjustedPos;

    setNewShape({
      id: `rect-${shapes.length + 1}`,
      type: "rectangle",
      x,
      y,
      width: 0,
      height: 0,
      fill: "rgba(255, 0, 0, 0.5)", // 미리보기 색상
      draggable: false,
    });
    setIsDrawing(true); // 드로잉 시작
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

    const width = x - newShape.x;
    const height = y - newShape.y;

    setNewShape({
      ...newShape,
      width: Math.abs(width),
      height: Math.abs(height),
      x: width < 0 ? x : newShape.x,
      y: height < 0 ? y : newShape.y,
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !newShape) return;

    setShapes([...shapes, { ...newShape, fill: "red", draggable: true }]);
    setNewShape(null); // 초기화
    setIsDrawing(false); // 드로잉 종료
    setIsRectangleMode(false); // 사각형 생성 모드 비활성화
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
                case "textbox":
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
                        console.log("Group Clicked");
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
            {/* 드로잉 중인 사각형 미리보기 */}
            {newShape && <Rect {...newShape} />}
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
            onClick={handleRectangleToolClick} // 사각형 생성 모드 활성화
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
