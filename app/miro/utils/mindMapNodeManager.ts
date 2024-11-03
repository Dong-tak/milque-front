import {
  AllShapeTypes,
  TextShape,
  ArrowShape,
  isText,
  isRectangle,
  MindMapNode,
} from "./types";
import { v4 as uuidv4 } from "uuid";
import { getConnectorPoints } from "./arrowUtils";
import { calculateMindMapLayout } from "./mindMapLayout";

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
    if (selectedNodeId === rootId) return null;

    // 선택된 노드와 부모 노드 찾기
    const selectedNode = shapes.find((shape) => shape.id === selectedNodeId);
    const parentNode = shapes.find(
      (shape) =>
        shape.type === "mindNode" &&
        (shape as MindMapNode).children?.includes(selectedNodeId),
    );

    console.log("Selected node:", selectedNode);
    console.log("Parent node:", parentNode);

    if (!selectedNode || !parentNode || !("children" in parentNode))
      return null;

    // 부모의 children 배열에서 선택된 노드의 인덱스 찾기
    const siblingIndex = parentNode.children.indexOf(selectedNodeId);
    console.log("Sibling index:", siblingIndex);

    // 좌표 값 확인 및 기본값 설정
    const nodeX = typeof selectedNode.x === "number" ? selectedNode.x : 0;
    const nodeY = typeof selectedNode.y === "number" ? selectedNode.y : 0;

    // 형제 노드 생성
    const newNodeId = `text-${uuidv4()}`;
    const newNode: TextShape = {
      id: newNodeId,
      type: "text",
      x: nodeX + 50, // 이제 nodeX는 확실히 number 타입
      y: nodeY + 50, // 이제 nodeY는 확실히 number 타입
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
        const newChildren = [...mindMapNode.children];
        // 선택된 노드 바로 다음 위치에 새 노드 추가
        newChildren.splice(siblingIndex + 1, 0, newNodeId);
        console.log("Updated children:", newChildren);
        return {
          ...mindMapNode,
          children: newChildren,
        };
      }
      return shape;
    });

    // 새로운 화살표 생성 (부모 노드와 연결)
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
    // 부모 노드 찾기
    const parentNode = shapes.find((shape) => shape.id === parentNodeId);
    if (!parentNode || !("x" in parentNode) || !("y" in parentNode)) {
      throw new Error("Parent node not found or invalid");
    }

    // 좌표 값 확인 및 기본값 설정
    const nodeX = typeof parentNode.x === "number" ? parentNode.x : 0;
    const nodeY = typeof parentNode.y === "number" ? parentNode.y : 0;

    // 새로운 텍스트 노드 생성 (자식 노드는 다음 레벨에 생성)
    const newNodeId = `text-${uuidv4()}`;
    const newNode: TextShape = {
      id: newNodeId,
      type: "text",
      x: nodeX + 300, // 이제 nodeX는 확실히 number 타입
      y: nodeY, // 이제 nodeY는 확실히 number 타입
      text: JSON.stringify([
        { type: "paragraph", content: "새로운 자식 노드" },
      ]),
      fontSize: 16,
      width: 200,
      height: 100,
      draggable: true,
      isSelected: false,
    };

    // 새로운 화살표 생성 (부모 노드와 연결)
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
    const updatedShapes = [...shapes, newNode, newArrow];

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
