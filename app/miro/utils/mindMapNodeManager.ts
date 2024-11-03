// utils/mindMapNodeManager.ts
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
    console.log("addSiblingNode called with:", { selectedNodeId, rootId });

    if (selectedNodeId === rootId) {
      console.log(
        "Selected node is the root node. Cannot add sibling to root.",
      );
      return null;
    }

    // 선택된 노드와 부모 노드 찾기
    const selectedNode = shapes.find((shape) => shape.id === selectedNodeId);
    console.log("Selected node found:", selectedNode);

    const parentNode = shapes.find(
      (shape) =>
        shape.type === "mindNode" &&
        (shape as MindMapNode).children?.includes(selectedNodeId),
    ) as MindMapNode | undefined;
    console.log("Parent node found:", parentNode);

    if (!selectedNode || !parentNode || !("children" in parentNode)) {
      console.log(
        "선택된 노드나 부모 노드가 없거나, 부모 노드에 children 속성이 없습니다.",
      );
      return null;
    }

    // 부모의 children 배열에서 선택된 노드의 인덱스 찾기
    const siblingIndex = parentNode.children.indexOf(selectedNodeId);
    console.log("Sibling index:", siblingIndex);

    if (siblingIndex === -1) {
      console.log("Selected node is not a child of the parent node.");
      return null;
    }

    // 좌표 값 확인 및 기본값 설정
    const nodeX = typeof selectedNode.x === "number" ? selectedNode.x : 0;
    const nodeY = typeof selectedNode.y === "number" ? selectedNode.y : 0;
    console.log(`Selected node coordinates: x=${nodeX}, y=${nodeY}`);

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
    console.log("New sibling node created:", newNode);

    // 부모 노드의 children 배열 업데이트
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === parentNode.id && shape.type === "mindNode") {
        const mindMapNode = shape as MindMapNode;
        const newChildren = [...mindMapNode.children];
        // 선택된 노드 바로 다음 위치에 새 노드 추가
        newChildren.splice(siblingIndex + 1, 0, newNodeId);
        console.log("Updated children after adding sibling:", newChildren);
        return {
          ...mindMapNode,
          children: newChildren,
        };
      }
      return shape;
    });
    console.log("Shapes after updating parent node's children:", updatedShapes);

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
    console.log("New arrow created:", newArrow);

    // 새 노드와 화살표 추가
    const shapesWithNewNodes = [...updatedShapes, newNode, newArrow];
    console.log("Shapes with new node and arrow added:", shapesWithNewNodes);

    // 마인드맵 레이아웃 재계산
    const { updatedShapes: finalShapes } = calculateMindMapLayout(
      shapesWithNewNodes,
      rootId,
    );
    console.log("Final shapes after layout recalculation:", finalShapes);

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
    console.log("Parent node found for child:", parentNode);

    if (!parentNode || !("x" in parentNode) || !("y" in parentNode)) {
      console.log("Parent node not found or invalid.");
      throw new Error("Parent node not found or invalid");
    }

    // 좌표 값 확인 및 기본값 설정
    const nodeX = typeof parentNode.x === "number" ? parentNode.x : 0;
    const nodeY = typeof parentNode.y === "number" ? parentNode.y : 0;
    console.log(`Parent node coordinates: x=${nodeX}, y=${nodeY}`);

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
    console.log("New child node created:", newNode);

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
    console.log("New arrow created for child node:", newArrow);

    // 새 노드와 화살표 추가
    const updatedShapes = [...shapes, newNode, newArrow];
    console.log("Shapes after adding child node and arrow:", updatedShapes);

    // 마인드맵 레이아웃 재계산
    const { updatedShapes: finalShapes } = calculateMindMapLayout(
      updatedShapes,
      rootId,
    );
    console.log(
      "Final shapes after layout recalculation (child):",
      finalShapes,
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
