import { AllShapeTypes, MindMapNode } from "./types";
import { calculateMindMapLayout } from "./mindMapLayout";
import { v4 as uuidv4 } from "uuid";

interface NodeAdditionResult {
  updatedShapes: AllShapeTypes[];
  newNodeId: string;
}

export class MindMapNodeManager {
  // 형제 노드 추가
  static addSiblingNode(
    selectedNodeId: string,
    shapes: AllShapeTypes[],
    rootId: string,
  ): NodeAdditionResult | null {
    // 루트 노드인 경우 형제 노드 추가 불가
    if (selectedNodeId === rootId) {
      return null;
    }

    // 새로운 노드 ID 생성
    const newNodeId = `node-${uuidv4()}`;

    // 선택된 노드의 부모 찾기
    const parentNode = shapes.find(
      (shape) =>
        shape.type === "mindNode" &&
        (shape as MindMapNode).children.includes(selectedNodeId),
    ) as MindMapNode | undefined;

    if (!parentNode) return null;

    // 새로운 형제 노드 생성
    const newNode: MindMapNode = {
      id: newNodeId,
      type: "mindNode",
      children: [],
      level: 0, // calculateMindMapLayout에서 업데이트됨
      x: 0,
      y: 0,
      width: 200,
      height: 100,
      isSelected: false,
    };

    // 부모 노드의 children 배열에 새 노드 추가
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === parentNode.id) {
        const mindMapNode = shape as MindMapNode;
        const siblingIndex = mindMapNode.children.indexOf(selectedNodeId);
        const newChildren = [...mindMapNode.children];
        newChildren.splice(siblingIndex + 1, 0, newNodeId);
        return {
          ...mindMapNode,
          children: newChildren,
        };
      }
      return shape;
    });

    // 새 노드 추가
    updatedShapes.push(newNode);

    // 마인드맵 레이아웃 재계산
    const { updatedShapes: finalShapes } = calculateMindMapLayout(
      updatedShapes,
      rootId,
    );

    return {
      updatedShapes: finalShapes,
      newNodeId,
    };
  }

  // 자식 노드 추가
  static addChildNode(
    parentNodeId: string,
    shapes: AllShapeTypes[],
    rootId: string,
  ): NodeAdditionResult {
    // 새로운 노드 ID 생성
    const newNodeId = `node-${uuidv4()}`;

    // 새로운 자식 노드 생성
    const newNode: MindMapNode = {
      id: newNodeId,
      type: "mindNode",
      children: [],
      level: 0, // calculateMindMapLayout에서 ���데이트됨
      x: 0,
      y: 0,
      width: 200,
      height: 100,
      isSelected: false,
    };

    // 부모 노드의 children 배열에 새 노드 추가
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === parentNodeId) {
        const mindMapNode = shape as MindMapNode;
        return {
          ...mindMapNode,
          children: [...mindMapNode.children, newNodeId],
        };
      }
      return shape;
    });

    // 새 노드 추가
    updatedShapes.push(newNode);

    // 마인드맵 레이아웃 재계산
    const { updatedShapes: finalShapes } = calculateMindMapLayout(
      updatedShapes,
      rootId,
    );

    return {
      updatedShapes: finalShapes,
      newNodeId,
    };
  }
}

// 노드 추가 버튼 컴포넌트 인터페이스
export interface NodeAddButtonsProps {
  nodeId: string;
  isRoot: boolean;
  onAddSibling: () => void;
  onAddChild: () => void;
}
