// components/DrawingBoard.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Shape } from "react-konva";
import Rectangle from "../shapes/rectangle";
import Arrow from "../shapes/arrow";
import TextNode from "../shapes/textnode";
import Toolbar from "../Toolbar";
import {
  RectangleShape,
  TextShape,
  ArrowShape,
  isRectangle,
  isArrow,
  isText,
  isImageEmbed,
  ImageEmbedShape,
  isPDFEmbed,
  PDFEmbedShape,
  isIframeEmbed,
  IframeEmbedShape,
  isMarkdown,
  MarkdownShape,
  AllShapeTypes,
} from "../../utils/types";
import {
  findClosestShapeAtPoint,
  getClosestSidePoint,
} from "../../utils/helpers";
import { getConnectorPoints } from "../../utils/arrowUtils";
import ImageEmbed from "../shapes/imageEmbed";
import PDFEmbed from "../shapes/pdfEmbed";
import IframeEmbed from "../shapes/iframeEmbed";

const DrawingBoard = () => {
  // 상태 관리
  const [shapes, setShapes] = useState<any[]>([]); // 모든 도형들을 저장하는 상태
  const stageRef = useRef<any>(null); // Konva Stage에 대한 참조
  const [isDrawing, setIsDrawing] = useState(false); // 현재 그리기 중인지 여부
  const [newShape, setNewShape] = useState<RectangleShape | ArrowShape | null>(
    null,
  ); // 새로 그리는 도형
  const [isRectangleMode, setIsRectangleMode] = useState(false); // 사각형 그리기 모드
  const [isArrowMode, setIsArrowMode] = useState(false); // 화살표 그리기 모드
  const boardRef = useRef<HTMLDivElement>(null); // 보드 컨테이너에 대한 참조
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // 마우스 위치

  // 스테이지 관련 상태
  const initialScale = 1;
  const [stageScale, setStageScale] = useState(initialScale); // 스테이지 확대/축소 비율
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 }); // 스테이지 위치
  const minScale = 0.5;
  const maxScale = 2;
  const [isPanning, setIsPanning] = useState(false); // 팬 모드 (스페이스바로 활성화)
  const [stageSize, setStageSize] = useState({ width: 800, height: 800 }); // 스테이지 크기

  // 도형 변경 함수 예시
  const handleShapeChange = (id: string, newAttrs: Partial<AllShapeTypes>) => {
    const newShapes = shapes.map((s) =>
      s.id === id ? { ...s, ...newAttrs } : s,
    );
    setShapes(newShapes);
  };

  // 윈도우 크기 변경 감지 및 스테이지 크기 조정
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

  // 키보드 이벤트 리스너 (팬 모드 활성화/비활성화)
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

  // 드래그 앤 드롭 이벤트 리스너
  useEffect(() => {
    const board = boardRef.current;
    if (board) {
      board.addEventListener("dragover", handleDragOver);
      board.addEventListener("drop", handleDrop);
    }

    return () => {
      if (board) {
        board.removeEventListener("dragover", handleDragOver);
        board.removeEventListener("drop", handleDrop);
      }
    };
  }, []);

  // 클립보드 붙여넣기 및 마우스 이동 이벤트 리스너
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const pastedText = e.clipboardData?.getData("text");

      if (pastedText) {
        const isUrl = /^(http|https):\/\/[^ "]+$/.test(pastedText);
        const newShape = isUrl
          ? addIframeEmbed(pastedText)
          : addMarkdownDrag(undefined, pastedText);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("paste", handlePaste);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [shapes, mousePosition]);

  // 드래그 오버 핸들러
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 드롭 핸들러
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer && e.dataTransfer.files) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  // 파일 처리 함수
  const handleFile = (file: File) => {
    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      addImageDrag(file);
    } else if (fileType === "application/pdf") {
      addPDFDrag(file);
    } else if (fileType === "text/markdown" || file.name.endsWith(".md")) {
      addMarkdownDrag(file);
    } else {
      alert("지원하지 않는 파일 형식입니다.");
    }
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
  // ... 텍스트 추가 로직 ...
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

  // ... 이미지 드래그 추가 로직 ...
  const addImageDrag = (dragFile?: File) => {
    if (dragFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const id = `imageEmbed-${shapes.length + 1}`;
          setShapes((prevShapes) => [
            ...prevShapes,
            {
              id,
              type: "imageEmbed",
              x: 50,
              y: 50,
              src: event.target!.result as string,
              draggable: true,
            },
          ]);
        }
      };
      reader.readAsDataURL(dragFile);
    }
  };

  // ... 이미지 임베드 추가 로직 ...
  const addImageEmbed = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            const id = `imageEmbed-${shapes.length + 1}`;
            setShapes([
              ...shapes,
              {
                id,
                type: "imageEmbed",
                x: 50,
                y: 50,
                src: event.target.result as string,
                draggable: true,
              },
            ]);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const addPDFDrag = (dragFile?: File) => {
    if (dragFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const id = `pdfEmbed-${shapes.length + 1}`;
          setShapes((prevShapes) => [
            ...prevShapes,
            {
              id,
              type: "pdfEmbed",
              x: 50,
              y: 50,
              src: event.target!.result as string,
              draggable: true,
            },
          ]);
        }
      };
      reader.readAsDataURL(dragFile);
    }
  };

  // ... PDF 임베드 추가 로직 ...
  const addPDFEmbed = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf";
    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            const id = `pdfEmbed-${shapes.length + 1}`;
            setShapes([
              ...shapes,
              {
                id,
                type: "pdfEmbed",
                x: 50,
                y: 50,
                src: event.target.result as string,
                draggable: true,
              },
            ]);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  // ... iframe 임베드 추가 로직 ...
  const addIframeEmbed = (src: string) => {
    const id = `iframeEmbed-${shapes.length + 1}`;
    setShapes([
      ...shapes,
      {
        id,
        type: "iframeEmbed",
        x: 50,
        y: 50,
        src,
        draggable: true,
      },
    ]);
  };

  // ... markdown 드래그 추가 로직 ...
  const addMarkdownDrag = async (dragFile?: File, text?: string) => {
    if (dragFile) {
      const markdown = await dragFile.text();
      const id = `markdown-${shapes.length + 1}`;
      setShapes((prevShapes) => [
        ...prevShapes,
        {
          id,
          type: "markdown",
          x: 50,
          y: 50,
          mkText: markdown,
          width: 500,
          height: 800,
          draggable: true,
        },
      ]);
    } else if (text) {
      const id = `markdown-${shapes.length + 1}`;
      setShapes((prevShapes) => [
        ...prevShapes,
        {
          id,
          type: "markdown",
          x: 50,
          y: 50,
          mkText: text,
          width: 500,
          height: 800,
          draggable: true,
        },
      ]);
    }
  };

  // ... markdown 파일 추가 로직 ...
  const addMarkdown = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "text/markdown";
    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            const id = `markdown-${shapes.length + 1}`;
            setShapes([
              ...shapes,
              {
                id,
                type: "markdown",
                x: 50,
                y: 50,
                src: event.target.result as string,
                fontSize: 24,
                draggable: true,
              },
            ]);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  // Stage 클릭 이벤트 핸들러
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

  // 사각형 생성 모드 활성화
  const handleRectangleToolClick = () => {
    setIsRectangleMode(true); // 사각형 생성 모드 활성화
    setIsArrowMode(false); // 화살표 생성 모드 비활성화
  };

  // 화살표 생성 모드 활성화
  const handleArrowToolClick = () => {
    setIsArrowMode(true); // 화살표 생성 모드 활성화
    setIsRectangleMode(false); // 사각형 생성 모드 비활성화
  };

  // 마우스 다운 이벤트 핸들러
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

  // 마우스 이동 이벤트 핸들러
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

  // 화살표 업데이트 함수
  const updateArrows = (movedShapeId: string, newX: number, newY: number) => {
    const updatedShapes = shapes.map((shape) => {
      if (isArrow(shape)) {
        if (shape.from === movedShapeId || shape.to === movedShapeId) {
          const fromShape =
            shape.from === movedShapeId
              ? ({
                  ...shapes.find((s) => s.id === shape.from),
                  x: newX,
                  y: newY,
                } as RectangleShape | TextShape)
              : (shapes.find((s) => s.id === shape.from) as
                  | RectangleShape
                  | TextShape);
          const toShape =
            shape.to === movedShapeId
              ? ({
                  ...shapes.find((s) => s.id === shape.to),
                  x: newX,
                  y: newY,
                } as RectangleShape | TextShape)
              : (shapes.find((s) => s.id === shape.to) as
                  | RectangleShape
                  | TextShape);

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

  // 마우스 업 이벤트 핸들러
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

  // 화살표 포인트 드래그 핸들러
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

  // 그리드 그리기 함수
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
    <div ref={boardRef}>
      {/* 보드 컨테이너 */}
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
        {/* Konva Stage */}
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
              listening={false}
            />
          </Layer>
          {/* 도형 레이어 */}
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
                    onChange={(newAttrs) =>
                      handleShapeChange(shape.id, newAttrs)
                    }
                    onDragMove={(e: any) => {
                      const node = e.target;
                      updateArrows(shape.id, node.x(), node.y());
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
                    onChange={(newAttrs) =>
                      handleShapeChange(shape.id, newAttrs)
                    }
                    onDragMove={(e: any) => {
                      const node = e.target;
                      updateArrows(shape.id, node.x(), node.y());
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
                    onChange={(newAttrs) =>
                      handleShapeChange(shape.id, newAttrs)
                    }
                    onDragMove={handleArrowPointDrag}
                  />
                );
              } else if (isImageEmbed(shape)) {
                return (
                  <ImageEmbed
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.isSelected}
                    onChange={(newAttrs) =>
                      handleShapeChange(shape.id, newAttrs)
                    }
                    onSelect={() => {
                      const newShapes = shapes.map((s) => ({
                        ...s,
                        isSelected: s.id === shape.id,
                      }));
                      setShapes(newShapes);
                    }}
                  />
                );
              } else if (isPDFEmbed(shape)) {
                return (
                  <PDFEmbed
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.isSelected}
                    onChange={(newAttrs) =>
                      handleShapeChange(shape.id, newAttrs)
                    }
                    onSelect={() => {
                      const newShapes = shapes.map((s) => ({
                        ...s,
                        isSelected: s.id === shape.id,
                      }));
                      setShapes(newShapes);
                    }}
                  />
                );
              } else if (isIframeEmbed(shape)) {
                return (
                  <IframeEmbed
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.isSelected}
                    onChange={(newAttrs) =>
                      handleShapeChange(shape.id, newAttrs)
                    }
                    onSelect={() => {
                      const newShapes = shapes.map((s) => ({
                        ...s,
                        isSelected: s.id === shape.id,
                      }));
                      setShapes(newShapes);
                    }}
                  />
                );
              } else if (isMarkdown(shape)) {
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
                    onChange={(newAttrs) =>
                      handleShapeChange(shape.id, newAttrs)
                    }
                    onDragMove={(e: any) => {
                      const node = e.target;
                      updateArrows(shape.id, node.x(), node.y());
                    }}
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
        {/* 툴바 컴포넌트 */}
        <Toolbar
          onRectangleToolClick={handleRectangleToolClick}
          onArrowToolClick={handleArrowToolClick}
          onAddText={() =>
            addTextAtPosition(stageSize.width / 2, stageSize.height / 2)
          }
          onAddImage={addImageEmbed}
          onAddPDF={addPDFEmbed}
          onAddIframe={addIframeEmbed}
          onAddMarkdown={addMarkdown}
        />
      </div>
    </div>
  );
};

export default DrawingBoard;
