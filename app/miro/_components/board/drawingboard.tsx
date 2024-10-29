// components/DrawingBoard.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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
  isBoard,
  SectionShape,
  isSection,
  isImageEmbed,
  ImageEmbedShape,
  isPDFEmbed,
  PDFEmbedShape,
  isIframeEmbed,
  IframeEmbedShape,
  isMarkdown,
  MarkdownShape,
  AllShapeTypes,
  BoardShape,
} from "../../utils/types";
import {
  findClosestShapeAtPoint,
  getClosestSidePoint,
} from "../../utils/helpers";
import { getConnectorPoints } from "../../utils/arrowUtils";

import { defaultProps } from "@blocknote/core";
import BrainstormInput from "../brainstorm/BrainstormInput";
import CreateBoardDialog from "./creatboard";
import BoardWidget from "../shapes/boardwidget"; // BoardWidget import 추가
import { useDispatch, useSelector } from "react-redux";
import { deselectBoard } from "@/redux/features/boardSlice";
import Section from "../shapes/section"; // Section 컴포넌트 import 추가
import { updateArrowPositions } from "@/redux/features/arrowSlice";
import type { RootState } from "@/redux/store";
import {
  setShapes,
  addShape,
  updateShape,
  updateArrowEndpoints,
} from "@/redux/features/shapesSlice";

import ImageEmbed from "../shapes/imageEmbed";
import PDFEmbed from "../shapes/pdfEmbed";
import IframeEmbed from "../shapes/iframeEmbed";

const DrawingBoard = () => {
  // 상태 관리
  // const [shapes, setShapes] = useState<any[]>([]); // 모든 도형들을 저장하는 상태
  // useSelector로 shapes 가져오기
  const dispatch = useDispatch();
  const shapes = useSelector((state: RootState) => state.shapes.shapes);
  const stageRef = useRef<any>(null); // Konva Stage에 대한 참조
  const [isDrawing, setIsDrawing] = useState(false); // 현재 그리기 중인지 여부
  const [newShape, setNewShape] = useState<
    RectangleShape | ArrowShape | SectionShape | null
  >(null); // 새로 그리는 도형
  const [isRectangleMode, setIsRectangleMode] = useState(false); // 사각형 그리기 모드
  const [isArrowMode, setIsArrowMode] = useState(false); // 화살표 그리기 모드
  const [isSectionMode, setIsSectionMode] = useState(false); // 섹션 생성 모드
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
  // const handleShapeChange = (id: string, newAttrs: Partial<AllShapeTypes>) => {
  //   const newShapes = shapes.map((s) =>
  //     s.id === id ? { ...s, ...newAttrs } : s,
  //   );
  //   setShapes(newShapes);
  // };

  const [dialogOpen, setDialogOpen] = useState(false); // 다이얼로그 상태 추가
  const [contentTitle, setContentTitle] = useState(""); // contentTitle 상태 추가
  const [boardPosition, setBoardPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isBoardPlacementMode, setIsBoardPlacementMode] = useState(false);
  const [isSectionPlacementMode, setIsSectionPlacementMode] = useState(false);
  const lastUpdate = useSelector((state: RootState) => state.arrow.lastUpdate);

  // 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentTitle(e.target.value);
  };

  // 저장 클릭 핸들러 수정
  const handleSaveClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!boardPosition || !contentTitle.trim()) return;

      const newBoard = {
        id: `board-${shapes.length + 1}`,
        type: "board" as const,
        x: boardPosition.x,
        y: boardPosition.y,
        width: 500,
        height: 300,
        draggable: true,
        titleBlock: contentTitle,
      };

      dispatch(addShape(newBoard));
      setDialogOpen(false);
      setContentTitle("");
      setBoardPosition(null);
    },
    [boardPosition, contentTitle, shapes],
  );

  // 보드 생성 버튼 클릭 핸들러 수정
  const handleAddBoard = useCallback(() => {
    setIsBoardPlacementMode(true); // 보드 배치 모드 활성화
  }, []);

  // 섹션 생성 버튼 클릭 핸들러 수정
  const handleAddSection = useCallback(() => {
    setIsSectionMode(true); // 섹션 생성 모드 활성화
    setIsRectangleMode(false); // 다른 모드 비활성화
    setIsArrowMode(false);
  }, []);

  //스테이지 클릭 핸들러 수정
  const handleStageClick = useCallback(
    (e: any) => {
      if (isBoardPlacementMode) {
        const stage = e.target.getStage();
        const pointerPos = stage.getPointerPosition();
        if (!pointerPos) return;

        const adjustedPos = {
          x: (pointerPos.x - stagePosition.x) / stageScale,
          y: (pointerPos.y - stagePosition.y) / stageScale,
        };

        setBoardPosition(adjustedPos);
        setDialogOpen(true);
        setIsBoardPlacementMode(false);
      } else if (e.target === e.target.getStage()) {
        dispatch(deselectBoard());
        const newShapes = shapes.map((s) => ({
          ...s,
          isSelected: false, // 빈공간 선택하면 선택해제
        }));
        dispatch(setShapes(newShapes));
      }
    },
    [isBoardPlacementMode, stagePosition, stageScale, dispatch, shapes],
  );

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
    // setShapes([
    //   ...shapes,
    //   {
    //     id,
    //     type: "textbox",
    //     x: x,
    //     y: y,
    //     text: JSON.stringify(initialText),
    //     fontSize: 24,
    //     draggable: true,
    //   },
    // ]);
    dispatch(
      addShape({
        id,
        type: "text",
        x: x,
        y: y,
        text: JSON.stringify(initialText),
        fontSize: 24,
        draggable: true,
      }),
    );
  };

  // ... 이미지 드래그 추가 로직 ...
  const addImageDrag = (dragFile?: File) => {
    if (dragFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const id = `imageEmbed-${shapes.length + 1}`;
          // setShapes((prevShapes) => [
          //   ...prevShapes,
          //   {
          //     id,
          //     type: "imageEmbed",
          //     x: 50,
          //     y: 50,
          //     src: event.target!.result as string,
          //     draggable: true,
          //   },
          // ]);
          dispatch(
            addShape({
              id,
              type: "imageEmbed",
              x: 50,
              y: 50,
              src: event.target!.result as string,
              draggable: true,
            }),
          );
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
            // setShapes([
            //   ...shapes,
            //   {
            //     id,
            //     type: "imageEmbed",
            //     x: 50,
            //     y: 50,
            //     src: event.target.result as string,
            //     draggable: true,
            //   },
            // ]);
            dispatch(
              addShape({
                id,
                type: "imageEmbed",
                x: 50,
                y: 50,
                src: event.target!.result as string,
                draggable: true,
              }),
            );
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
          // setShapes((prevShapes) => [
          //   ...prevShapes,
          //   {
          //     id,
          //     type: "pdfEmbed",
          //     x: 50,
          //     y: 50,
          //     src: event.target!.result as string,
          //     draggable: true,
          //   },
          // ]);
          dispatch(
            addShape({
              id,
              type: "pdfEmbed",
              x: 50,
              y: 50,
              src: event.target!.result as string,
              draggable: true,
            }),
          );
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
            // setShapes([
            //   ...shapes,
            //   {
            //     id,
            //     type: "pdfEmbed",
            //     x: 50,
            //     y: 50,
            //     src: event.target.result as string,
            //     draggable: true,
            //   },
            // ]);
            dispatch(
              addShape({
                id,
                type: "pdfEmbed",
                x: 50,
                y: 50,
                src: event.target!.result as string,
                draggable: true,
              }),
            );
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
    // setShapes([
    //   ...shapes,
    //   {
    //     id,
    //     type: "iframeEmbed",
    //     x: 50,
    //     y: 50,
    //     src,
    //     draggable: true,
    //   },
    // ]);
    dispatch(
      addShape({
        id,
        type: "iframeEmbed",
        x: 50,
        y: 50,
        src,
        draggable: true,
      }),
    );
  };

  // ... markdown 드래그 추가 로직 ...
  const addMarkdownDrag = async (dragFile?: File, text?: string) => {
    if (dragFile) {
      const markdown = await dragFile.text();
      const id = `markdown-${shapes.length + 1}`;
      // setShapes((prevShapes) => [
      //   ...prevShapes,
      //   {
      //     id,
      //     type: "markdown",
      //     x: 50,
      //     y: 50,
      //     mkText: markdown,
      //     width: 500,
      //     height: 800,
      //     draggable: true,
      //   },
      // ]);
      dispatch(
        addShape({
          id,
          type: "markdown",
          x: 50,
          y: 50,
          mkText: markdown,
          width: 500,
          height: 800,
          draggable: true,
        }),
      );
    } else if (text) {
      const id = `markdown-${shapes.length + 1}`;
      // setShapes((prevShapes) => [
      //   ...prevShapes,
      //   {
      //     id,
      //     type: "markdown",
      //     x: 50,
      //     y: 50,
      //     mkText: text,
      //     width: 500,
      //     height: 800,
      //     draggable: true,
      //   },
      // ]);
      dispatch(
        addShape({
          id,
          type: "markdown",
          x: 50,
          y: 50,
          mkText: text,
          width: 500,
          height: 800,
          draggable: true,
        }),
      );
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
            // setShapes([
            //   ...shapes,
            //   {
            //     id,
            //     type: "markdown",
            //     x: 50,
            //     y: 50,
            //     src: event.target.result as string,
            //     draggable: true,
            //   },
            // ]);
            dispatch(
              addShape({
                id,
                type: "markdown",
                x: 50,
                y: 50,
                src: event.target!.result as string,
                draggable: true,
              }),
            );
          }
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  // 사각형 생성 모드 활성화
  const handleRectangleToolClick = () => {
    setIsRectangleMode(true); // 사각형 생성 모드 활성화
    setIsArrowMode(false); // 화살표 생성 모드 비활성화
  };

  // 화살표 생성 모드 활성화
  const handleArrowToolClick = () => {
    setIsArrowMode(true); // 화살표 생성 모드 활성화
    setIsRectangleMode(false); // 사각형 생성 모드 활성화
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
        arrowHeads: { left: false, right: true }, // 기본값으로 단방향 화살표 설정
      };
      setNewShape(newArrow);
      setIsDrawing(true);
    } else if (isSectionMode && !isDrawing) {
      const newSection: SectionShape = {
        id: `section-${shapes.length + 1}`,
        type: "section",
        x,
        y,
        width: 0,
        height: 0,
        fill: "rgba(200, 200, 200, 0.2)",
        draggable: true,
        memberIds: [],
      };
      setNewShape(newSection);
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
        shapes.filter(
          (s): s is RectangleShape | TextShape | BoardShape | SectionShape =>
            isRectangle(s) ||
            isText(s) ||
            isBoard(s) ||
            isSection(s) ||
            isPDFEmbed(s) ||
            isIframeEmbed(s) ||
            isMarkdown(s),
        ),
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
    } else if (isSectionMode && newShape.type === "section") {
      const width = x - newShape.x;
      const height = y - newShape.y;

      setNewShape({
        ...newShape,
        width: Math.abs(width),
        height: Math.abs(height),
        x: width < 0 ? x : newShape.x,
        y: height < 0 ? y : newShape.y,
      });
    }
  };

  // updateArrows 함수를 Redux 액션 디스패치로 변경
  const updateArrows = useCallback(
    (movedShapeId: string, newX: number, newY: number) => {
      dispatch(
        updateArrowPositions({
          movedShapeId,
          newX,
          newY,
          shapes,
        }),
      );
    },
    [dispatch, shapes],
  );

  // lastUpdate가 변경될 때마다 화살표 업데이트
  useEffect(() => {
    if (lastUpdate) {
      const { movedShapeId, newX, newY, shapes: currentShapes } = lastUpdate;

      const updatedShapes = currentShapes.map((shape) => {
        if (isArrow(shape)) {
          if (shape.from === movedShapeId || shape.to === movedShapeId) {
            const fromShape =
              shape.from === movedShapeId
                ? {
                    ...currentShapes.find((s) => s.id === shape.from),
                    x: newX,
                    y: newY,
                  }
                : currentShapes.find((s) => s.id === shape.from);

            const toShape =
              shape.to === movedShapeId
                ? {
                    ...currentShapes.find((s) => s.id === shape.to),
                    x: newX,
                    y: newY,
                  }
                : currentShapes.find((s) => s.id === shape.to);

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

      dispatch(setShapes(updatedShapes));
    }
  }, [lastUpdate, dispatch]);

  // 마우스 업 이벤트 핸들러
  const handleMouseUp = () => {
    if (!isDrawing || !newShape) return;

    if (isRectangleMode && newShape.type === "rectangle") {
      const finalizedRect: RectangleShape = {
        ...newShape,
        fill: "blue",
        draggable: true,
      };
      dispatch(addShape(finalizedRect));
    } else if (isArrowMode && newShape.type === "arrow") {
      dispatch(addShape(newShape));
    } else if (isSectionMode && newShape.type === "section") {
      const finalizedSection: SectionShape = {
        ...newShape,
        memberIds: shapes
          .filter((shape) => {
            if (shape.id === newShape.id) return false;

            // width와 height가 있고, 값이 undefined가 아닌 경우만 필터링
            if (
              !("x" in shape) ||
              !("width" in shape) ||
              !("height" in shape) ||
              shape.width === undefined ||
              shape.height === undefined
            ) {
              return false;
            }

            const isInBounds =
              shape.x >= newShape.x &&
              shape.x + shape.width <= newShape.x + newShape.width &&
              shape.y >= newShape.y &&
              shape.y + shape.height <= newShape.y + newShape.height;
            return isInBounds;
          })
          .map((shape) => shape.id),
      };
      dispatch(addShape(finalizedSection));
    }

    setNewShape(null);
    setIsDrawing(false);
    setIsRectangleMode(false);
    setIsArrowMode(false);
    setIsSectionMode(false);
  };

  // 화살표 (빨간원) 점(from, to) 드래그 함수
  const handleArrowPointDrag = (
    id: string,
    x: number,
    y: number,
    type: "from" | "to",
  ) => {
    const currentArrow = shapes.find((s) => s.id === id && isArrow(s));
    if (!currentArrow || !isArrow(currentArrow)) return;

    const otherShapes = shapes.filter(
      (s) =>
        (isRectangle(s) || isText(s) || isBoard(s) || isSection(s)) &&
        s.id !== (type === "from" ? currentArrow.from : currentArrow.to),
    );

    const closestShape = findClosestShapeAtPoint(
      x,
      y,
      otherShapes.filter(
        (s): s is RectangleShape | TextShape | BoardShape | SectionShape =>
          isRectangle(s) || isText(s) || isBoard(s) || isSection(s),
      ),
    );

    // 가장 가까운 지점 계산
    let finalPoint = { x, y };
    if (closestShape) {
      finalPoint = getClosestSidePoint(closestShape, x, y);
    }

    // points와 arrowTip 업데이트
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === id && isArrow(shape)) {
        const points = [...shape.points];
        if (type === "from") {
          points[0] = finalPoint.x;
          points[1] = finalPoint.y;
        } else {
          points[points.length - 2] = finalPoint.x;
          points[points.length - 1] = finalPoint.y;
          return {
            ...shape,
            points,
            arrowTipX: finalPoint.x,
            arrowTipY: finalPoint.y,
          };
        }
        return { ...shape, points };
      }
      return shape;
    });

    dispatch(setShapes(updatedShapes));

    if (closestShape) {
      dispatch(
        updateArrowEndpoints({
          arrowId: id,
          type,
          shapeId: closestShape.id,
        }),
      );
    }
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

  // 최적의 위치 찾기 함수 수정
  const findOptimalPosition = useCallback(() => {
    const padding = 100; // 벽면과의 최소 거리
    const nodeSize = { width: 200, height: 100 }; // 텍스트 노드의 크기
    const gridSize = 50; // 그리드 셀 크기
    const stageWidth = stageSize.width / stageScale;
    const stageHeight = stageSize.height / stageScale;

    // 기존 위젯들의 위치를 피하기 위한 그리드 생성
    const grid: boolean[][] = Array(Math.ceil(stageHeight / gridSize))
      .fill(false)
      .map(() => Array(Math.ceil(stageWidth / gridSize)).fill(false));

    // 기존 위젯들의 영역을 그리드에 표시
    shapes.forEach((shape) => {
      if (isText(shape)) {
        // 텍스트 노드의 영역을 그리드에 표
        const startX = Math.floor(shape.x / gridSize);
        const startY = Math.floor(shape.y / gridSize);
        const endX = Math.floor((shape.x + nodeSize.width) / gridSize);
        const endY = Math.floor((shape.y + nodeSize.height) / gridSize);

        // 텍스트 노드가 차지하는 모든 그리드 셀을 true로 설정
        for (let y = startY; y <= endY; y++) {
          for (let x = startX; x <= endX; x++) {
            if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
              grid[y][x] = true;
            }
          }
        }
      }
    });

    // 가능한 위치들 수집
    const possiblePositions: { x: number; y: number; distance: number }[] = [];

    for (
      let y = padding;
      y < stageHeight - padding - nodeSize.height;
      y += gridSize
    ) {
      for (
        let x = padding;
        x < stageWidth - padding - nodeSize.width;
        x += gridSize
      ) {
        const gridX = Math.floor(x / gridSize);
        const gridY = Math.floor(y / gridSize);

        // 해당 위치에 노드를 놓을 수 있는지 확인
        let canPlace = true;
        const endX = Math.floor((x + nodeSize.width) / gridSize);
        const endY = Math.floor((y + nodeSize.height) / gridSize);

        // 노드가 차지할 모든 그리드 셀 확인
        for (let checkY = gridY; checkY <= endY; checkY++) {
          for (let checkX = gridX; checkX <= endX; checkX++) {
            if (
              checkY >= 0 &&
              checkY < grid.length &&
              checkX >= 0 &&
              checkX < grid[0].length &&
              grid[checkY][checkX]
            ) {
              canPlace = false;
              break;
            }
          }
          if (!canPlace) break;
        }

        if (canPlace) {
          // 벽면과의 거리 계산
          const distanceToWalls = Math.min(
            x - padding,
            stageWidth - padding - x - nodeSize.width,
            y - padding,
            stageHeight - padding - y - nodeSize.height,
          );

          // 다른 노드들과의 거리 계산
          let minDistanceToNodes = Infinity;
          shapes.forEach((shape) => {
            if (isText(shape)) {
              const dx = Math.abs(x - shape.x);
              const dy = Math.abs(y - shape.y);
              const distance = Math.sqrt(dx * dx + dy * dy);
              minDistanceToNodes = Math.min(minDistanceToNodes, distance);
            }
          });

          possiblePositions.push({
            x,
            y,
            distance: Math.min(distanceToWalls, minDistanceToNodes),
          });
        }
      }
    }

    // 가능한 위치가 없으면 기본 위치 반환
    if (possiblePositions.length === 0) {
      return { x: stageWidth / 2, y: stageHeight / 2 };
    }

    // 벽면과 다른 노드들로부터 가장 먼 위치들 중에서 랜덤 선택
    const maxDistance = Math.max(...possiblePositions.map((p) => p.distance));
    const bestPositions = possiblePositions.filter(
      (p) => p.distance >= maxDistance * 0.9,
    );
    const randomPosition =
      bestPositions[Math.floor(Math.random() * bestPositions.length)];

    return randomPosition;
  }, [shapes, stageSize, stageScale]);

  // 새로운 텍스트 노드 생성 함수
  const handleCreateTextNode = useCallback(
    (text: string) => {
      const position = findOptimalPosition();

      // 텍스트를 BlockNote 형식으로 변환
      const initialText = JSON.stringify([
        {
          type: "paragraph",
          content: text,
        },
      ]);

      const newNode: TextShape = {
        id: `text-${shapes.length + 1}`,
        type: "text",
        x: position.x,
        y: position.y,
        text: initialText, // JSON 문자열로 변환된 텍스트
        fontSize: 16,
        width: 200,
        height: 100,
        draggable: true,
      };

      dispatch(addShape(newNode));
    },
    [shapes, findOptimalPosition],
  );

  // shapes를 업데이트하는 다른 함수들도 Redux 액션을 사용하도록 수정
  const handleShapeChange = (id: string, newAttrs: any) => {
    dispatch(updateShape({ id, updates: newAttrs }));
  };

  const handleShapeSelect = (id: string) => {
    const updatedShapes = shapes.map((s) => ({
      ...s,
      isSelected: s.id === id,
    }));
    dispatch(setShapes(updatedShapes));
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
            // 스테이지 치가 변경되면 Layer를 다시 그립니다.
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
            {/* ��형 렌더링 */}
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
                      dispatch(setShapes(newShapes));
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
                      dispatch(setShapes(newShapes));
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
                      dispatch(setShapes(newShapes));
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
                      dispatch(setShapes(newShapes));
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
                      dispatch(setShapes(newShapes));
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
                      dispatch(setShapes(newShapes));
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
                      dispatch(setShapes(newShapes));
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
              } else if (isSection(shape)) {
                return (
                  <Section
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.isSelected ?? false}
                    onSelect={() => {
                      const newShapes = shapes.map((s) => ({
                        ...s,
                        isSelected: s.id === shape.id,
                      }));
                      dispatch(setShapes(newShapes));
                    }}
                    onChange={(newAttrs: any) => {
                      const newShapes = shapes.map((s) =>
                        s.id === shape.id ? { ...s, ...newAttrs } : s,
                      );
                      dispatch(setShapes(newShapes));
                    }}
                    shapes={shapes}
                    updateShapes={setShapes}
                    updateArrows={updateArrows} // updateArrows prop 전달
                  />
                );
              } else if (shape.type === "board") {
                // BoardWidget 렌더링 추가
                return (
                  <BoardWidget
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.isSelected ?? false}
                    onSelect={() => {
                      const newShapes = shapes.map((s) => ({
                        ...s,
                        isSelected: s.id === shape.id,
                      }));
                      dispatch(setShapes(newShapes));
                    }}
                    onChange={(newAttrs: any) => {
                      const newShapes = shapes.map((s) =>
                        s.id === shape.id ? { ...s, ...newAttrs } : s,
                      );
                      dispatch(setShapes(newShapes));
                    }}
                    titleBlock={shape.titleBlock}
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
                onChange={() => {}}
                onDragMove={() => {}}
              />
            )}
            {newShape && newShape.type === "section" && (
              <Section
                shapeProps={newShape}
                isSelected={false}
                onSelect={() => {}}
                onChange={() => {}}
                shapes={shapes}
                updateShapes={setShapes}
                updateArrows={updateArrows} // updateArrows prop 전달
              />
            )}
          </Layer>
        </Stage>
        {/* 툴바 컴넌트 */}

        <Toolbar
          onRectangleToolClick={handleRectangleToolClick}
          onArrowToolClick={handleArrowToolClick}
          onAddText={() =>
            addTextAtPosition(stageSize.width / 2, stageSize.height / 2)
          }
          onAddBoard={handleAddBoard}
          onAddSection={handleAddSection}
          onAddImage={addImageEmbed}
          onAddPDF={addPDFEmbed}
          onAddIframe={addIframeEmbed}
          onAddMarkdown={addMarkdown}
        />
        <CreateBoardDialog
          contentTitle={contentTitle}
          handleInputChange={handleInputChange}
          handleSaveClick={handleSaveClick}
          className="custom-dialog-class"
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
        <BrainstormInput onCreateNode={handleCreateTextNode} />
      </div>
    </div>
  );
};

export default DrawingBoard;
