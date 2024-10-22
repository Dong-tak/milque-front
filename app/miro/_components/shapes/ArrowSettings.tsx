import React from "react";
import { Group, Rect, Text } from "react-konva";

interface ArrowSettingsProps {
  position: { x: number; y: number };
  showArrowHead: boolean;
  onClose: () => void;
  onArrowHeadToggle: (show: boolean) => void;
}

const ArrowSettings: React.FC<ArrowSettingsProps> = ({
  position,
  showArrowHead,
  onClose,
  onArrowHeadToggle,
}) => {
  const handleToggle = () => {
    onArrowHeadToggle(!showArrowHead);
  };

  return (
    <Group x={position.x} y={position.y - 60}>
      <Rect
        width={200}
        height={50}
        fill="white"
        stroke="black"
        strokeWidth={1}
        cornerRadius={5}
      />
      <Text text="Arrow Head:" x={10} y={15} fontSize={14} fill="black" />
      <Rect
        x={100}
        y={10}
        width={80}
        height={30}
        fill={showArrowHead ? "lightblue" : "lightgray"}
        stroke="black"
        strokeWidth={1}
        cornerRadius={3}
        onClick={handleToggle}
      />
      <Text
        text={showArrowHead ? "On" : "Off"}
        x={125}
        y={15}
        fontSize={14}
        fill="black"
        onClick={handleToggle}
      />
      <Text text="X" x={180} y={5} fontSize={14} fill="red" onClick={onClose} />
    </Group>
  );
};

// /ㅁㄴㅇㄹ
export default ArrowSettings;
