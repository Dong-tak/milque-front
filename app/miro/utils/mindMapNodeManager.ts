// utils/mindMapNodeManager.ts
import { AllShapeTypes, MindMapNode, ArrowShape, TextShape } from "./types";
import { v4 as uuidv4 } from "uuid";
import { calculateMindMapLayout } from "./mindMapLayout";
import { getCurrentMindMapGroup } from "./mindMapGroupUtils";

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
    console.log("addSiblingNode called with:", { selectedNodeId, rootId });

    if (selectedNodeId === rootId) return null;

    // 선택된 노드 찾기
    const selectedNode = shapes.find((shape) => shape.id === selectedNodeId);
    console.log("Selected node:", selectedNode);

    // 부모 노드 찾기 로직 수정
    const parentArrow = shapes.find(
      (shape) => shape.type === "arrow" && shape.to === selectedNodeId,
    ) as ArrowShape | undefined;

    const parentNode = parentArrow
      ? shapes.find((shape) => shape.id === parentArrow.from)
      : null;

    console.log("Parent arrow:", parentArrow);
    console.log("Parent node:", parentNode);

    if (!selectedNode || !parentNode) return null;

    // 좌표 값 확인 및 기본값 설정
    const nodeX = typeof selectedNode.x === "number" ? selectedNode.x : 0;
    const nodeY = typeof selectedNode.y === "number" ? selectedNode.y : 0;

    // 새로운 텍스트 노드 생성
    const newNodeId = `text-${uuidv4()}`;
    const newNode: TextShape = {
      id: newNodeId,
      type: "text",
      x: nodeX + 50,
      y: nodeY + 50,
      text: JSON.stringify([
        { type: "paragraph", content: "새로운 형제 노드" },
      ]),
      fontSize: 16,
      width: 200,
      height: 100,
      draggable: true,
      isSelected: false,
    };

    // 부모 노드의 children 배열 업데이트
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === parentNode.id && shape.type === "mindNode") {
        const mindMapNode = shape as MindMapNode;
        const siblingIndex = mindMapNode.children.indexOf(selectedNodeId);
        const newChildren = [...mindMapNode.children];
        // 선택된 노드 바로 다음 위치에 새 노드 추가
        newChildren.splice(siblingIndex + 1, 0, newNodeId);
        return {
          ...mindMapNode,
          children: newChildren,
        };
      }
      return shape;
    });

    // 새로운 화살표 생성
    const newArrow: ArrowShape = {
      id: `arrow-${uuidv4()}`,
      type: "arrow",
      from: parentNode.id,
      to: newNodeId,
      points: [0, 0, 0, 0],
      arrowTipX: 0,
      arrowTipY: 0,
      arrowHeads: { left: false, right: true },
    };

    // 새 노드와 화살표 추가
    const shapesWithNewNodes = [...updatedShapes, newNode, newArrow];

    // 마인드맵 레이아웃 재계산
    const { updatedShapes: finalShapes } = calculateMindMapLayout(
      shapesWithNewNodes,
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
    console.log("addChildNode called with:", { parentNodeId, rootId });

    // 부모 노드 찾기
    const parentNode = shapes.find((shape) => shape.id === parentNodeId);
    console.log("Parent node:", parentNode);

    if (!parentNode) {
      console.log("Parent node not found:", parentNodeId);
      return {
        updatedShapes: shapes,
        newNodeId: "",
      };
    }

    // 좌표 값 확인 및 기본값 설정
    const nodeX = typeof parentNode.x === "number" ? parentNode.x : 0;
    const nodeY = typeof parentNode.y === "number" ? parentNode.y : 0;

    // 새로운 텍스트 노드 생성
    const newNodeId = `text-${uuidv4()}`;
    const newNode: TextShape = {
      id: newNodeId,
      type: "text",
      x: nodeX + 200,
      y: nodeY,
      text: JSON.stringify([
        { type: "paragraph", content: "새로운 자식 노드" },
      ]),
      fontSize: 16,
      width: 200,
      height: 100,
      draggable: true,
      isSelected: false,
    };

    // 부모 노드의 children 배열 업데이트
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === parentNodeId && shape.type === "mindNode") {
        const mindMapNode = shape as MindMapNode;
        return {
          ...mindMapNode,
          children: [...(mindMapNode.children || []), newNodeId],
        };
      }
      return shape;
    });

    // 새로운 화살표 생성
    const newArrow: ArrowShape = {
      id: `arrow-${uuidv4()}`,
      type: "arrow",
      from: parentNodeId,
      to: newNodeId,
      points: [0, 0, 0, 0],
      arrowTipX: 0,
      arrowTipY: 0,
      arrowHeads: { left: false, right: true },
    };

    // 새 노드와 화살표 추가
    const shapesWithNewNodes = [...updatedShapes, newNode, newArrow];

    // 마인드맵 레이아웃 재계산
    const { updatedShapes: finalShapes } = calculateMindMapLayout(
      shapesWithNewNodes,
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
