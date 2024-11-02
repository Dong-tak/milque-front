import {
  AllShapeTypes,
  isArrow,
  MindMapNode,
  FamilyBox,
  RectangleShape,
} from "./types";
import { getConnectorPoints } from "./arrowUtils";
import {
  createMindMapGroup,
  setCurrentMindMapGroup,
  MindMapGroup,
} from "./mindMapGroupUtils";

// 레이아웃 간격 상수
const GEN_GAP = 48; // 세대 간 간격 (부모-자식 노드 간 X축 간격)
const SIB_GAP = 24; // 형제 노드 간 간격 (같은 부모를 가진 노드 간 Y축 간격)
const NAV_GAP = 36; // 네비게이션 간격 (다른 부모를 가진 같은 레벨 노드 그룹 간 Y축 간격)

function calculateFamilyBox(
  nodeId: string,
  nodes: Map<string, MindMapNode>,
  level: number,
  levelFamilyBoxes: Map<number, FamilyBox[]>,
): FamilyBox {
  const node = nodes.get(nodeId);
  if (!node) {
    return {
      id: nodeId,
      type: "familyBox" as const,
      nodeId,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      childBoxes: [],
    };
  }

  // 리프 노드인 경우
  if (node.children.length === 0) {
    const familyBox: FamilyBox = {
      id: nodeId,
      type: "familyBox" as const,
      nodeId,
      width: node.width,
      height: node.height,
      x: node.x,
      y: node.y,
      childBoxes: [],
    };

    if (!levelFamilyBoxes.has(level)) {
      levelFamilyBoxes.set(level, []);
    }
    levelFamilyBoxes.get(level)!.push(familyBox);

    return familyBox;
  }

  // 자식 노드들의 FamilyBox 계산
  const childFamilyBoxes = node.children.map((childId) =>
    calculateFamilyBox(childId, nodes, level + 1, levelFamilyBoxes),
  );

  // 자식 노드들의 총 높이 계산 (SIB_GAP 포함)
  const totalChildrenHeight = childFamilyBoxes.reduce((sum, box, index) => {
    return sum + box.height + (index > 0 ? SIB_GAP : 0);
  }, 0);

  // FamilyBox의 너비 계산
  const nextGenMaxWidth = Math.max(...childFamilyBoxes.map((box) => box.width));
  const totalWidth = node.width + GEN_GAP + nextGenMaxWidth;

  const familyBox: FamilyBox = {
    id: nodeId,
    type: "familyBox" as const,
    nodeId,
    width: totalWidth,
    height: totalChildrenHeight,
    x: node.x,
    y: node.y,
    childBoxes: childFamilyBoxes,
  };

  if (!levelFamilyBoxes.has(level)) {
    levelFamilyBoxes.set(level, []);
  }
  levelFamilyBoxes.get(level)!.push(familyBox);

  return familyBox;
}

function calculateNodePositions(
  nodeId: string,
  x: number,
  y: number,
  nodes: Map<string, MindMapNode>,
  familyBox: FamilyBox,
): void {
  const node = nodes.get(nodeId);
  if (!node) return;

  // 현재 노드의 X 좌표 설정
  node.x = x;

  // 현재 노드를 FamilyBox의 중앙에 위치시킴
  node.y = y + (familyBox.height - node.height) / 2;

  if (node.children.length === 0) return;

  // 자식 노드들의 X 좌표 계산 (GEN_GAP 적용)
  const childX = x + node.width + GEN_GAP;

  // 자식 노드들의 시작 Y 좌표 계산
  let currentY = y;

  // 자식 노드들의 위치 계산
  node.children.forEach((childId, index) => {
    const childBox = familyBox.childBoxes[index];
    const childNode = nodes.get(childId);
    if (!childNode) return;

    // 형제 노드 간 SIB_GAP 적용
    if (index > 0) {
      currentY += SIB_GAP;
    }

    calculateNodePositions(childId, childX, currentY, nodes, childBox);
    currentY += childBox.height;
  });
}

export const calculateMindMapLayout = (
  shapes: AllShapeTypes[],
  rootId: string,
) => {
  const nodes = new Map<string, MindMapNode>();
  const familyBoxes = new Map<string, FamilyBox>();
  const relationshipMap = new Map<string, Set<string>>();
  const updatedArrows = new Map<string, AllShapeTypes>();

  // 1. 노드 초기화 및 관계 맵 구성
  shapes.forEach((shape) => {
    if (!isArrow(shape)) {
      nodes.set(shape.id, {
        id: shape.id,
        type: "mindNode",
        children: [],
        level: 0,
        x: typeof shape.x === "number" ? shape.x : 0,
        y: typeof shape.y === "number" ? shape.y : 0,
        width: typeof shape.width === "number" ? shape.width : 100,
        height: typeof shape.height === "number" ? shape.height : 50,
        isSelected: shape.isSelected,
      });
    } else {
      if (!relationshipMap.has(shape.from)) {
        relationshipMap.set(shape.from, new Set());
      }
      relationshipMap.get(shape.from)?.add(shape.to);
      updatedArrows.set(shape.id, shape);
    }
  });

  // 2. 계층 구조 구성
  buildHierarchy(rootId, nodes, relationshipMap, new Set());

  // 3. FamilyBox 계산 및 레벨별 그룹화
  const levelFamilyBoxes = new Map<number, FamilyBox[]>();
  const rootFamilyBox = calculateFamilyBox(rootId, nodes, 0, levelFamilyBoxes);

  // 4. 노드 위치 계산
  calculateNodePositions(
    rootId,
    nodes.get(rootId)!.x,
    nodes.get(rootId)!.y,
    nodes,
    rootFamilyBox,
  );

  // 5. 화살표 위치 업데이트
  shapes.forEach((shape) => {
    if (isArrow(shape)) {
      const fromNode = nodes.get(shape.from);
      const toNode = nodes.get(shape.to);

      if (fromNode && toNode) {
        // MindMapNode를 RectangleShape로 변환
        const fromShape: RectangleShape = {
          id: fromNode.id,
          type: "rectangle",
          x: fromNode.x,
          y: fromNode.y,
          width: fromNode.width,
          height: fromNode.height,
          draggable: true,
          fill: "transparent",
        };

        const toShape: RectangleShape = {
          id: toNode.id,
          type: "rectangle",
          x: toNode.x,
          y: toNode.y,
          width: toNode.width,
          height: toNode.height,
          draggable: true,
          fill: "transparent",
        };

        // 화살표의 시작점과 끝점 계산
        const points = getConnectorPoints(fromShape, toShape);

        // 화살표 업데이트
        const updatedArrow = {
          ...shape,
          points: points.points,
          arrowTipX: points.arrowTipX,
          arrowTipY: points.arrowTipY,
        };

        updatedArrows.set(shape.id, updatedArrow);
      }
    }
  });

  // 6. 마인드맵 그룹 생성 및 설정
  const mindMapGroup = createMindMapGroup(rootId, nodes);
  setCurrentMindMapGroup(mindMapGroup);

  // 7. 업데이트된 도형들 반환
  return {
    nodes,
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
    mindMapGroup,
  };
};

function buildHierarchy(
  rootId: string,
  nodes: Map<string, MindMapNode>,
  relationshipMap: Map<string, Set<string>>,
  visited: Set<string>,
  level: number = 0,
): void {
  if (visited.has(rootId)) return;
  visited.add(rootId);

  const node = nodes.get(rootId);
  if (!node) return;

  node.level = level;

  const childrenSet = relationshipMap.get(rootId) || new Set<string>();
  const childrenIds: string[] = Array.from(childrenSet).map((id) => String(id));
  node.children = childrenIds;

  childrenIds.forEach((childId) => {
    const childNode = nodes.get(childId);
    if (childNode) {
      childNode.parentId = rootId;
      buildHierarchy(childId, nodes, relationshipMap, visited, level + 1);
    }
  });
}
