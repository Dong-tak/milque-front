// components/shapes/Arrow.tsx
// ArrowLine, ArrowText, ArrowSettings 컴포넌트들을 조합하여 전체 화살표 기능을 제공합니다.

"use client"; // 클라이언트 사이드에서만 실행되도록 지정

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  ArrowShape,
  RelationshipType,
  ArrowHeadState,
} from "../../utils/types"; // ArrowHeadState import 추가
import ArrowLine from "./ArrowLine"; // 화살표 모양 및 방향 컴포넌트
import ArrowText from "./ArrowText"; // 화살표 텍스트 박스 컴포넌트
import ArrowSettings from "./ArrowSettings"; // 화살표 설정 컴포넌트
import Konva from "konva"; // Konva import 추가
import { Stage } from "react-konva"; // Stage 타입을 위한 import 추가
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSettings,
  closeSettings,
  toggleTextBox,
} from "@/redux/features/arrowSlice";
import type { RootState } from "@/redux/store";
import type { AppDispatch } from "@/redux/store";

interface ArrowProps {
  shapeProps: ArrowShape; // 화살표의 속성
  isSelected?: boolean; // 화살표가 선택되었는지 여부
  onSelect?: () => void; // 화살표 선택 시 호출되는 함수
  onChange: (newAttrs: Partial<ArrowShape>) => void; // 속성 변경 시 호출되는 함수
  onDragMove: (id: string, x: number, y: number, type: "from" | "to") => void; // 드래그 이동 시 호출되는 함수
}

const Arrow: React.FC<ArrowProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragMove,
}) => {
  const { points, id, arrowHeads } = shapeProps;
  const dispatch = useDispatch<AppDispatch>(); // AppDispatch 타입 지정
  const { showSettings, isTextBoxVisible } = useSelector(
    (state: RootState) => ({
      showSettings:
        state.arrow.showSettings && state.arrow.selectedArrowId === id,
      isTextBoxVisible: state.arrow.textBoxVisibility[id] || false,
    }),
  );

  // Stage ref 제거
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // 우클릭 이벤트 핸들러 수정
  const handleContextMenu = useCallback(
    (e: any) => {
      e.evt.preventDefault();
      if (isMounted.current) {
        dispatch(toggleSettings(id));
      }
    },
    [dispatch, id],
  );

  // 더블클릭 이벤트 핸들러 수정
  const handleDoubleClick = useCallback(
    (e: any) => {
      e.evt.preventDefault();
      if (e.evt.button === 0 && isMounted.current) {
        // 좌클릭 확인
        dispatch(toggleTextBox(id));
      }
    },
    [dispatch, id],
  );

  const handleSettingsClose = useCallback(() => {
    if (isMounted.current) {
      dispatch(closeSettings());
    }
  }, [dispatch]);

  const handleArrowHeadToggle = useCallback(
    (newHeads: ArrowHeadState) => {
      onChange({ ...shapeProps, arrowHeads: newHeads });
    },
    [onChange, shapeProps],
  );

  // 화살표 클릭 핸들러
  const handleArrowClick = useCallback(() => {
    if (onSelect) {
      onSelect();
    }
  }, [onSelect]);

  return (
    <>
      <ArrowLine
        shapeProps={shapeProps}
        isSelected={isSelected}
        onSelect={handleArrowClick}
        onDragMove={onDragMove}
        onContextMenu={handleContextMenu}
        onDoubleClick={handleDoubleClick}
      />

      {/* 텍스트 박스 조건부 렌더링 수정 */}
      {isTextBoxVisible && (
        <ArrowText
          points={points}
          isSelected={isSelected}
          onDoubleClick={handleDoubleClick}
          arrowId={id} // arrowId 전달
        />
      )}

      {showSettings && (
        <ArrowSettings
          position={{ x: points[0], y: points[1] }}
          arrowHeads={arrowHeads}
          onClose={handleSettingsClose}
          onArrowHeadToggle={handleArrowHeadToggle}
        />
      )}
    </>
  );
};

export default Arrow; // Arrow 컴포넌트 내보내기
