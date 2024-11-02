import React from "react";
import { NodeAddButtonsProps } from "../../utils/mindMapNodeManager";

const NodeAddButtons: React.FC<NodeAddButtonsProps> = ({
  nodeId,
  isRoot,
  onAddSibling,
  onAddChild,
}) => {
  return (
    <div className="absolute flex gap-2">
      {/* 루트 노드가 아닌 경우에만 형제 노드 추가 버튼 표시 */}
      {!isRoot && (
        <button
          onClick={onAddSibling}
          className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          + 형제 노드
        </button>
      )}

      {/* 자식 노드 추가 버튼 */}
      <button
        onClick={onAddChild}
        className="rounded-full bg-green-500 p-2 text-white hover:bg-green-600"
        style={{
          position: "absolute",
          right: "-20px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        + 자식 노드
      </button>
    </div>
  );
};

export default NodeAddButtons;
