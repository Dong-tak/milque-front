// components/shapes/ArrowText.tsx
// 화살표에 표시되는 텍스트 박스의 표시, 위치, 편집을 관리합니다.

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Label, Tag, Text, Transformer } from "react-konva";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useSelector, useDispatch } from "react-redux";
import { toggleTextBox } from "@/redux/features/arrowSlice";
import type { RootState, AppDispatch } from "@/redux/store";

interface ArrowTextProps {
  points: number[]; // 화살표의 점들 (x, y 좌표)
  isSelected?: boolean; // 화살표가 선택되었는지 여부
  onDoubleClick?: (e: any) => void; // 더블클릭 이벤트 핸들러 추가
  arrowId: string; // arrowId prop 추가
}

const ArrowText: React.FC<ArrowTextProps> = ({
  points,
  isSelected,
  onDoubleClick,
  arrowId,
}) => {
  // Ref 선언
  const textBoxRef = useRef<Konva.Label | null>(null); // 텍스트 박스 Label Ref
  const textRef = useRef<Konva.Text | null>(null); // 텍스트 Text Ref
  const trRef = useRef<Konva.Transformer | null>(null); // Transformer Ref

  const dispatch = useDispatch<AppDispatch>(); // dispatch 초기화 추가

  // 상태 선언
  const [isEditing, setIsEditing] = useState(false); // 텍스트 편집 중 여부

  // 텍스트 박스의 상대적 위치를 저장할 상태 추가
  const [relativePosition, setRelativePosition] = useState<number>(0.5); // 0~1 사이의 값, 0.5는 중앙

  /**
   * 화살표의 중간 지점을 계산하는 함수
   * @returns {x: number, y: number} 중간 지점의 x, y 좌표
   */
  const calculateArrowMidpoint = useCallback(() => {
    const midIndex = Math.floor(points.length / 2);
    return {
      x: (points[midIndex - 2] + points[midIndex]) / 2,
      y: (points[midIndex - 1] + points[midIndex + 1]) / 2,
    };
  }, [points]);

  // 텍스트 박스의 초기 위치를 설정
  const [textBoxPosition, setTextBoxPosition] = useState(() => {
    const midpoint = calculateArrowMidpoint();
    return midpoint;
  });

  // 화살표가 변경될 때만 위치 업데이트
  useEffect(() => {
    if (points.length >= 4) {
      // points가 유효한지 확인
      const midpoint = calculateArrowMidpoint();
      setTextBoxPosition(midpoint);
    }
  }, [points, calculateArrowMidpoint]); // points와 calculateArrowMidpoint를 의존성 배열에 추가

  /**
   * 텍���트 박스의 표시/숨김을 토글하는 함수
   */
  const handleToggleTextBox = useCallback(() => {
    if (isSelected) {
      dispatch(toggleTextBox(arrowId));
    }
  }, [dispatch, arrowId, isSelected]);

  /**
   * 키보드 이벤트 핸들러
   * 'T' 키를 누르면 텍스트 박스를 토글
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "T" || e.key === "t") && isSelected) {
        handleToggleTextBox();
      }
    };

    window.addEventListener("keydown", handleKeyDown); // 키다운 이벤트 리스너 추가

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 클린업
    };
  }, [isSelected, handleToggleTextBox]);

  /**
   * 텍스트를 더블 클릭하면 편집 모드로 전환
   * @param {KonvaEventObject<MouseEvent>} e - 더블 클릭 이벤트 객체
   */
  const handleTextDblClick = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;

    setIsEditing(true); // 편집 모드 활성화
    const textPosition = textRef.current?.absolutePosition();
    if (!textPosition) return;

    // 텍스트 박스의 절대 위치 계산
    const areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y,
    };

    // textarea 요소 생성 및 스타일링
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);

    // 현재 텍스트 값을 textarea에 설정
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

    textarea.focus(); // textarea에 포커스 ��정

    /**
     * 외부 클릭 시 편집 종료
     * @param {MouseEvent} e - 클릭 이벤트 객체
     */
    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target !== textarea) {
        textRef.current?.text(textarea.value); // 텍스트 업데이트
        setIsEditing(false); // 편집 모드 종료
        document.body.removeChild(textarea); // textarea 제거
        window.removeEventListener("click", handleOutsideClick); // 이벤트 리스너 제거
      }
    };

    // textarea에 키다운 이벤트 핸들러 추가
    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        textRef.current?.text(textarea.value); // 텍스트 업데이트
        setIsEditing(false); // 편집 모드 종료
        document.body.removeChild(textarea); // textarea 제거
        window.removeEventListener("click", handleOutsideClick); // 이벤트 리스너 제거
      }
      if (e.key === "Escape") {
        setIsEditing(false); // 편집 모드 종료
        document.body.removeChild(textarea); // textarea 제거
        window.removeEventListener("click", handleOutsideClick); // 이벤트 리스너 제거
      }
    });

    // 외부 클릭 이벤트 리스너 추가 (비동기로 추가하여 textarea가 생성된 후에 실행)
    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });
  };

  // 선분 위의 가장 가까운 점 계산 함수
  const getClosestPointOnSegment = useCallback(
    (x1: number, y1: number, x2: number, y2: number, x: number, y: number) => {
      const A = x - x1;
      const B = y - y1;
      const C = x2 - x1;
      const D = y2 - y1;

      const dot = A * C + B * D;
      const len_sq = C * C + D * D;
      let param = -1;
      if (len_sq !== 0) param = dot / len_sq;

      let xx, yy;

      if (param < 0) {
        xx = x1;
        yy = y1;
      } else if (param > 1) {
        xx = x2;
        yy = y2;
      } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }

      return { x: xx, y: yy };
    },
    [],
  );

  // 화살표 선 위의 가장 가까운 점 찾기
  const getClosestPointOnLine = useCallback(
    (x: number, y: number) => {
      let closestPoint = { x: points[0], y: points[1] };
      let minDistance = Infinity;

      for (let i = 0; i < points.length - 2; i += 2) {
        const x1 = points[i];
        const y1 = points[i + 1];
        const x2 = points[i + 2];
        const y2 = points[i + 3];

        const point = getClosestPointOnSegment(x1, y1, x2, y2, x, y);
        const distance = Math.hypot(point.x - x, point.y - y);

        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = point;
        }
      }

      return closestPoint;
    },
    [points, getClosestPointOnSegment],
  );

  // 화살표 의 전체 길이 계산 함수
  const calculateTotalLength = useCallback(() => {
    let length = 0;
    for (let i = 0; i < points.length - 2; i += 2) {
      const dx = points[i + 2] - points[i];
      const dy = points[i + 3] - points[i + 1];
      length += Math.sqrt(dx * dx + dy * dy);
    }
    return length;
  }, [points]);

  // 상대적 위치에 따른 실제 좌표 계산 함수
  const getPointAtLength = useCallback(
    (targetLength: number) => {
      let currentLength = 0;

      for (let i = 0; i < points.length - 2; i += 2) {
        const x1 = points[i];
        const y1 = points[i + 1];
        const x2 = points[i + 2];
        const y2 = points[i + 3];

        const dx = x2 - x1;
        const dy = y2 - y1;
        const segmentLength = Math.sqrt(dx * dx + dy * dy);

        if (currentLength + segmentLength >= targetLength) {
          const remainingLength = targetLength - currentLength;
          const ratio = remainingLength / segmentLength;
          return {
            x: x1 + dx * ratio,
            y: y1 + dy * ratio,
          };
        }

        currentLength += segmentLength;
      }

      // 마지막 점 반환
      return {
        x: points[points.length - 2],
        y: points[points.length - 1],
      };
    },
    [points],
  );

  // 텍스트 박스 드래그 핸들러 수정
  const handleDragMove = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      if (!textBoxRef.current) return;

      const box = textBoxRef.current.getClientRect();
      const centerX = e.target.x() + box.width / 2;
      const centerY = e.target.y() + box.height / 2;

      // 화살표 선 위의 가장 가까운 점 찾기
      const closestPoint = getClosestPointOnLine(centerX, centerY);

      // 텍스트 박스 위치 업데이트 (중앙 정렬)
      e.target.position({
        x: closestPoint.x,
        y: closestPoint.y,
      });
    },
    [getClosestPointOnLine],
  );

  // 텍스트 박스가 최상위로 오도록 설정
  useEffect(() => {
    if (textBoxRef.current) {
      textBoxRef.current.moveToTop();
    }
  }, []);

  // 텍스트 박스 변형 핸들러 수정
  const handleTextTransform = useCallback(() => {
    if (textRef.current && textBoxRef.current) {
      const node = textRef.current;
      const labelNode = textBoxRef.current;
      const tagNode = labelNode.findOne("Tag");

      // 새로운 너비 계산 (최소 너비 200px로 고정)
      const newWidth = 200;

      // Text 노드의 크기와 스케일 재설정
      node.setAttrs({
        width: newWidth,
        scaleX: 1,
        scaleY: 1,
      });

      // Tag 크기 조정
      if (tagNode) {
        tagNode.setAttrs({
          width: newWidth + node.padding() * 2,
          height: node.height() + node.padding() * 2,
        });
      }

      // Label 크기 조정
      labelNode.size({
        width: newWidth + node.padding() * 2,
        height: node.height() + node.padding() * 2,
      });

      labelNode.moveToTop();
    }
  }, []);

  /**
   * Transformer 설정을 업데이트하여 텍스트 박스에 변형 기능 제공
   */
  useEffect(() => {
    if (isSelected && !isEditing && textBoxRef.current && trRef.current) {
      trRef.current.nodes([textBoxRef.current]); // Transformer에 텍스트 박스 노드 연결
      trRef.current.getLayer()?.batchDraw(); // 레이어 다시 그리기
    }
  }, [isSelected, isEditing]);

  return (
    <>
      {/* 텍스트 박스가 표시되어야 할 때 */}
      <Label
        ref={textBoxRef}
        x={textBoxPosition.x} // 텍스트 박스의 x 위치
        y={textBoxPosition.y} // 텍스트 박스의 y 위치
        offsetX={100} // 텍스트 박스의 중앙 정렬을 위한 offset
        offsetY={25} // 텍스트 박스의 중앙 정렬을 위한 offset
        draggable={true} // 드래그 가능하도록 설정
        onDragMove={handleDragMove} // 드래그 중 위치 업데이트
        onDragEnd={() => {
          if (textBoxRef.current) {
            textBoxRef.current.moveToTop();
          }
        }}
      >
        {/* 텍스트 박스의 배경 및 테두리 */}
        <Tag
          fill="white" // 배경색
          stroke="black" // 테두리 색상
          strokeWidth={1} // 테두리 두께
          cornerRadius={4} // 모서리 둥글기
          shadowColor="black" // 그림자 색상
          shadowBlur={10} // 그림자 흐림 정도
          shadowOpacity={0.5} // 그림자 불투명도
          shadowOffsetX={5} // 그림자 X 오프셋
          shadowOffsetY={5} // 그림자 Y 오프셋
          width={200} // 고정된 너비
          height={50} // 고정된 높이
        />
        {/* 텍스트 내용 */}
        <Text
          ref={textRef}
          text="텍스트를 입력하세요" // 초기 텍스트
          fontSize={16} // 폰트 크기
          padding={5} // 패딩
          fill="black" // 텍스트 색상
          width={200} // 텍스트 박스 너비
          align="center" // 텍스트 가로 정렬
          verticalAlign="middle" // 텍스트 세로 정렬
          wrap="word" // 단어 단위로 줄바꿈
          ellipsis={false} // 생략 부호 사용하지 않음
          onDblClick={handleTextDblClick}
        />
      </Label>

      {/* Transformer 제거 또는 비활성화 */}
      {/* {isSelected && !isEditing && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            return oldBox; // 크기 변경 방지
          }}
          enabledAnchors={[]} // 앵커 비활성화
          rotateEnabled={false}
          resizeEnabled={false}
        />
      )} */}
    </>
  );
};

export default ArrowText; // ArrowText 컴포넌트 내보내기
