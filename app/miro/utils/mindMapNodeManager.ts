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

    // 선택된 노드 찾기
    const selectedNode = shapes.find((shape) => shape.id === selectedNodeId);
    if (!selectedNode || !("x" in selectedNode) || !("y" in selectedNode))
      return null;

    // 좌표 값이 있는지 확인하고 기본값 설정
    const nodeX = typeof selectedNode.x === "number" ? selectedNode.x : 0;
    const nodeY = typeof selectedNode.y === "number" ? selectedNode.y : 0;

    // 새로운 텍스트 노드 생성
    const newNodeId = `text-${uuidv4()}`;
    const newNode: TextShape = {
      id: newNodeId,
      type: "text",
      x: nodeX + 200,
      y: nodeY,
      text: JSON.stringify([{ type: "paragraph", content: "새로운 노드" }]),
      fontSize: 16,
      width: 200,
      height: 100,
      draggable: true,
      isSelected: false,
    };

    // 새로운 화살표 생성
    const newArrow: ArrowShape = {
      id: `arrow-${uuidv4()}`,
      type: "arrow",
      from: selectedNodeId,
      to: newNodeId,
      points: [0, 0, 0, 0],
      arrowTipX: 0,
      arrowTipY: 0,
      arrowHeads: { left: false, right: true },
    };

    // 화살표 위치 계산
    if (
      (isText(selectedNode) || isRectangle(selectedNode)) &&
      "width" in selectedNode &&
      "height" in selectedNode
    ) {
      const connectorPoints = getConnectorPoints(selectedNode, newNode);
      newArrow.points = connectorPoints.points;
      newArrow.arrowTipX = connectorPoints.arrowTipX;
      newArrow.arrowTipY = connectorPoints.arrowTipY;
    }

    // 새 노드와 화살표 추가
    const updatedShapes = [...shapes, newNode, newArrow];

    return {
      updatedShapes,
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

    // 좌표 값이 있는지 확인하고 기본값 설정
    const nodeX = typeof parentNode.x === "number" ? parentNode.x : 0;
    const nodeY = typeof parentNode.y === "number" ? parentNode.y : 0;

    // 새로운 텍스트 노드 생성
    const newNodeId = `text-${uuidv4()}`;
    const newNode: TextShape = {
      id: newNodeId,
      type: "text",
      x: nodeX + 200,
      y: nodeY,
      text: JSON.stringify([{ type: "paragraph", content: "새로운 노드" }]),
      fontSize: 16,
      width: 200,
      height: 100,
      draggable: true,
      isSelected: false,
    };

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

    // 화살표 위치 계산
    if (
      (isText(parentNode) || isRectangle(parentNode)) &&
      "width" in parentNode &&
      "height" in parentNode
    ) {
      const connectorPoints = getConnectorPoints(parentNode, newNode);
      newArrow.points = connectorPoints.points;
      newArrow.arrowTipX = connectorPoints.arrowTipX;
      newArrow.arrowTipY = connectorPoints.arrowTipY;
    }

    // 새 노드와 화살표 추가
    const updatedShapes = [...shapes, newNode, newArrow];

    return {
      updatedShapes,
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
