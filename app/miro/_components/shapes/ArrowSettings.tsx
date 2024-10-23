// components/shapes/ArrowSettings.tsx
// 화살표 헤드 온/오프 설정 컴포넌트

import React, { useCallback } from "react";
import { Group, Rect, Text } from "react-konva";
import { RelationshipType, ArrowHeadState } from "../../utils/types"; // ArrowHeadState import 추가

interface ArrowSettingsProps {
  position: { x: number; y: number }; // 설정 창의 위치
  arrowHeads: ArrowHeadState;
  onClose: () => void; // 설정 창 닫기 핸들러
  onArrowHeadToggle: (heads: ArrowHeadState) => void; // 화살표 머리 토글 핸들러
}

const ArrowSettings: React.FC<ArrowSettingsProps> = ({
  position,
  arrowHeads,
  onClose,
  onArrowHeadToggle,
}) => {
  const handleLeftHeadToggle = useCallback(() => {
    onArrowHeadToggle({ ...arrowHeads, left: !arrowHeads.left });
  }, [arrowHeads, onArrowHeadToggle]);

  const handleRightHeadToggle = useCallback(() => {
    onArrowHeadToggle({ ...arrowHeads, right: !arrowHeads.right });
  }, [arrowHeads, onArrowHeadToggle]);

  return (
    <Group x={position.x} y={position.y - 100}>
      <Rect
        width={200}
        height={100}
        fill="white"
        stroke="black"
        strokeWidth={1}
        cornerRadius={5}
      />
      {/* 왼쪽 화살표 머리 토글 */}
      <Text text="Left Arrow:" x={10} y={15} fontSize={14} fill="black" />
      <Rect
        x={100}
        y={10}
        width={80}
        height={30}
        fill={arrowHeads.left ? "lightblue" : "lightgray"}
        stroke="black"
        strokeWidth={1}
        cornerRadius={3}
        onClick={handleLeftHeadToggle}
      />
      <Text
        text={arrowHeads.left ? "On" : "Off"}
        x={125}
        y={15}
        fontSize={14}
        fill="black"
        onClick={handleLeftHeadToggle}
      />
      {/* 오른쪽 화살표 머리 토글 */}
      <Text text="Right Arrow:" x={10} y={55} fontSize={14} fill="black" />
      <Rect
        x={100}
        y={50}
        width={80}
        height={30}
        fill={arrowHeads.right ? "lightblue" : "lightgray"}
        stroke="black"
        strokeWidth={1}
        cornerRadius={3}
        onClick={handleRightHeadToggle}
      />
      <Text
        text={arrowHeads.right ? "On" : "Off"}
        x={125}
        y={55}
        fontSize={14}
        fill="black"
        onClick={handleRightHeadToggle}
      />
      <Text text="X" x={180} y={5} fontSize={14} fill="red" onClick={onClose} />
    </Group>
  );
};

export default ArrowSettings;
