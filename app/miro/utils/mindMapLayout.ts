import { AllShapeTypes, isArrow } from "./types";
import { getConnectorPoints } from "./arrowUtils";

interface MindMapNode {
  id: string;
  children: string[];
  level: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isLeft?: boolean;
  parentId?: string;
}

interface FamilyBox {
  x: number;
  y: number;
  width: number;
  height: number;
  nodeId: string;
  childBoxes: FamilyBox[];
}

const GenGap = 48;
const SibGap = 24;
const NavGap = 36;

export function calculateMindMapLayout(
  shapes: AllShapeTypes[],
  rootId: string,
) {
  const nodes = new Map<string, MindMapNode>();
  const familyBoxes = new Map<string, FamilyBox>();
  const relationshipMap = new Map<string, Set<string>>();
  const updatedArrows = new Map<string, AllShapeTypes>();

  // 1. 노드 초기화 및 관계 맵 구성
  shapes.forEach((shape) => {
    if (!isArrow(shape)) {
      const width = typeof shape.width === "number" ? shape.width : 100;
      const height = typeof shape.height === "number" ? shape.height : 50;
      const x = typeof shape.x === "number" ? shape.x : 0;
      const y = typeof shape.y === "number" ? shape.y : 0;

      nodes.set(shape.id, {
        id: shape.id,
        children: [],
        level: 0,
        x,
        y,
        width,
        height,
      });
    } else if (isArrow(shape)) {
      if (!relationshipMap.has(shape.from)) {
        relationshipMap.set(shape.from, new Set());
      }
      relationshipMap.get(shape.from)?.add(shape.to);
      updatedArrows.set(shape.id, shape);
    }
  });

  // 2. 계층 구조 구성 (DFS)
  function buildHierarchy(
    nodeId: string,
    visited: Set<string>,
    level: number,
    parentId?: string,
  ) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = nodes.get(nodeId);
    if (!node) return;

    node.level = level;
    node.parentId = parentId;

    const children = relationshipMap.get(nodeId) || new Set();
    node.children = Array.from(children);

    children.forEach((childId) => {
      buildHierarchy(childId, visited, level + 1, nodeId);
    });
  }

  // 3. FamilyBox 계산 (bottom-up 방식)
  function calculateFamilyBox(
    nodeId: string,
    visited: Set<string>,
  ): FamilyBox | null {
    if (visited.has(nodeId)) return familyBoxes.get(nodeId) || null;
    visited.add(nodeId);

    const node = nodes.get(nodeId);
    if (!node) return null;

    const childBoxes: FamilyBox[] = [];
    let totalChildHeight = 0;
    let maxChildWidth = 0;

    // 자식 노드들의 FamilyBox 계산
    for (const childId of node.children) {
      const childBox = calculateFamilyBox(childId, visited);
      if (childBox) {
        childBoxes.push(childBox);
        totalChildHeight += childBox.height + SibGap;
        maxChildWidth = Math.max(maxChildWidth, childBox.width);
      }
    }

    // 현재 노드의 FamilyBox 계산
    const familyBox: FamilyBox = {
      nodeId,
      x: node.x,
      y: node.y,
      width: Math.max(node.width, maxChildWidth + GenGap),
      height: Math.max(node.height, totalChildHeight - SibGap),
      childBoxes,
    };

    familyBoxes.set(nodeId, familyBox);
    return familyBox;
  }

  // 화살표 위치 업데이트 함수 수정
  function updateArrowPosition(
    arrow: AllShapeTypes,
    nodes: Map<string, MindMapNode>,
  ) {
    if (!isArrow(arrow)) return arrow;

    const fromNode = nodes.get(arrow.from);
    const toNode = nodes.get(arrow.to);

    if (!fromNode || !toNode) return arrow;

    // fromShape와 toShape를 생성할 때 모든 필수 속성 포함
    const fromShape = {
      id: fromNode.id,
      type: "rectangle" as const,
      x: fromNode.x,
      y: fromNode.y,
      width: fromNode.width,
      height: fromNode.height,
      draggable: true,
      fill: "transparent",
    };

    const toShape = {
      id: toNode.id,
      type: "rectangle" as const,
      x: toNode.x,
      y: toNode.y,
      width: toNode.width,
      height: toNode.height,
      draggable: true,
      fill: "transparent",
    };

    const { points, arrowTipX, arrowTipY } = getConnectorPoints(
      fromShape,
      toShape,
    );

    return {
      ...arrow,
      points,
      arrowTipX,
      arrowTipY,
    };
  }

  // 4. 노드 위치 계산 (수정)
  function calculateNodePositions(nodeId: string, parentBox?: FamilyBox) {
    const node = nodes.get(nodeId);
    if (!node) return;

    const familyBox = familyBoxes.get(nodeId);
    if (!familyBox) return;

    if (parentBox) {
      const isLeft = node.isLeft ?? false;
      const newX = isLeft
        ? parentBox.x - GenGap - familyBox.width
        : parentBox.x + parentBox.width + GenGap;
      const newY = parentBox.y + (parentBox.height - familyBox.height) / 2;

      node.x = newX;
      node.y = newY;

      // 노드 위치가 변경될 때마다 관련된 화살표 업데이트
      shapes.forEach((shape) => {
        if (isArrow(shape)) {
          if (shape.from === nodeId || shape.to === nodeId) {
            const updatedArrow = updateArrowPosition(shape, nodes);
            updatedArrows.set(shape.id, updatedArrow);
          }
        }
      });
    }

    let currentY = node.y;
    node.children.forEach((childId, index) => {
      const childNode = nodes.get(childId);
      if (!childNode) return;

      const childBox = familyBoxes.get(childId);
      if (!childBox) return;

      childNode.isLeft = index >= node.children.length / 2;
      calculateNodePositions(childId, familyBox);
      currentY += (childBox?.height || 0) + SibGap;
    });
  }

  // 레이아웃 계산 실행
  buildHierarchy(rootId, new Set(), 0);
  calculateFamilyBox(rootId, new Set());
  calculateNodePositions(rootId);

  return {
    nodes,
    familyBoxes,
    updatedShapes: shapes.map((shape) => {
      if (isArrow(shape)) {
        return updatedArrows.get(shape.id) || shape;
      }
      const node = nodes.get(shape.id);
      if (node) {
        return {
          ...shape,
          x: node.x,
          y: node.y,
        };
      }
      return shape;
    }),
  };
}
