import { AllShapeTypes, isArrow, MindMapNode, FamilyBox } from "./types";
import { getConnectorPoints } from "./arrowUtils";
import {
  createMindMapGroup,
  setCurrentMindMapGroup,
  calculateAvailablePositions,
} from "./mindMapGroupUtils";

// 레이아웃 간격 상수 정의
const GEN_GAP = 48; // 세대 간 간격
const SIB_GAP = 24; // 형제 노드 간 간격
const NAV_GAP = 36; // 네비게이션 간격

/**
 * Utility 함수: 배열에서 최대 값을 반환
 */
const getMax = (values: number[]): number => Math.max(...values);

/**
 * Utility 함수: 총 높이를 계산 (각 노드의 높이와 간격을 합산)
 */
const calculateTotalHeight = (
  dimensions: { height: number }[],
  gap: number,
): number =>
  dimensions.reduce(
    (sum, dim, index) => sum + dim.height + (index > 0 ? gap : 0),
    0,
  );

/**
 * FamilyBox의 크기를 재귀적으로 계산하는 함수
 * @param nodeId - 현재 노드의 ID
 * @param nodes - 모든 노드의 맵
 * @param familyBoxes - FamilyBox 정보를 저장하는 맵
 * @returns FamilyBox의 너비와 높이
 */
const calculateFamilyBoxDimensions = (
  nodeId: string,
  nodes: Map<string, MindMapNode>,
  familyBoxes: Map<string, FamilyBox>,
): { width: number; height: number } => {
  const node = nodes.get(nodeId);
  if (!node) return { width: 0, height: 0 };

  if (node.children.length === 0) {
    return { width: node.width, height: node.height };
  }

  // 자식 노드들의 FamilyBox 크기 계산
  const childrenDimensions = node.children.map((childId) =>
    calculateFamilyBoxDimensions(childId, nodes, familyBoxes),
  );

  // 다음 세대의 최대 너비 계산
  const nextGenWidth = getMax(childrenDimensions.map((d) => d.width));

  // 전체 너비: 다음 세대의 너비 + 세대 간 간격
  const totalWidth = nextGenWidth + GEN_GAP;

  // 전체 높이: 자식 노드들의 높이 합 + 형제 간 간격
  const totalHeight = calculateTotalHeight(childrenDimensions, SIB_GAP);

  return { width: totalWidth, height: totalHeight };
};

/**
 * 계층 구조를 구성하는 함수
 * @param nodeId - 현재 노드의 ID
 * @param nodes - 모든 노드의 맵
 * @param relationshipMap - 부모-자식 관계 맵
 * @param visited - 방문한 노드의 집합
 * @param level - 현재 노드의 레벨
 */
const buildHierarchy = (
  nodeId: string,
  nodes: Map<string, MindMapNode>,
  relationshipMap: Map<string, Set<string>>,
  visited: Set<string>,
  level: number = 0,
): void => {
  if (visited.has(nodeId)) return;
  visited.add(nodeId);

  const node = nodes.get(nodeId);
  if (!node) return;

  node.level = level;

  // 현재 노드에서 시작하는 모든 화살표를 찾아 자식 노드 설정
  const childrenSet = relationshipMap.get(nodeId) || new Set<string>();
  // Set을 string[] 타입으로 명시적 변환
  const childrenIds: string[] = Array.from(childrenSet).map((id) => String(id));
  node.children = childrenIds;

  // 각 자식 노드에 대해 재귀적으로 처리
  childrenIds.forEach((childId) => {
    const childNode = nodes.get(childId);
    if (childNode) {
      childNode.parentId = nodeId; // 부모-자식 관계 설정
      buildHierarchy(childId, nodes, relationshipMap, visited, level + 1);
    }
  });
};

/**
 * 노드의 위치를 계산하는 함수
 * @param nodeId - 현재 노드의 ID
 * @param parentX - 부모 노드의 X 좌표
 * @param parentY - 부모 노드의 Y 좌표
 * @param parentDimensions - 부모 노드의 너비와 높이
 * @param nodesMap - 모든 노드의 맵
 * @param familyBoxesMap - FamilyBox 정보를 저장하는 맵
 */
const calculateNodePositions = (
  nodeId: string,
  parentX: number,
  parentY: number,
  parentDimensions: { width: number; height: number },
  nodesMap: Map<string, MindMapNode>,
  familyBoxesMap: Map<string, FamilyBox>,
): void => {
  const node = nodesMap.get(nodeId);
  if (!node) return;

  const childDimensions = calculateFamilyBoxDimensions(
    nodeId,
    nodesMap,
    familyBoxesMap,
  );

  // 부모 노드의 중심점 계산
  const parentCenterY = parentY + parentDimensions.height / 2;

  // FamilyBox의 Y 좌표를 부모의 중심점을 기준으로 계산
  const familyBoxY = parentCenterY - childDimensions.height / 2;

  // 자식 노드들의 시작 Y 좌표 계산
  let currentY = familyBoxY;
  const totalChildrenHeight = node.children.reduce((sum, childId) => {
    const childNode = nodesMap.get(childId);
    if (!childNode) return sum;
    return sum + childNode.height + (sum > 0 ? SIB_GAP : 0);
  }, 0);

  // 자식 노드들의 시작 Y 좌표를 FamilyBox의 중심을 기준으로 조정
  const startY =
    familyBoxY + (childDimensions.height - totalChildrenHeight) / 2;
  currentY = startY;

  node.children.forEach((childId, index) => {
    const childNode = nodesMap.get(childId);
    if (!childNode) return;

    const childBox = calculateFamilyBoxDimensions(
      childId,
      nodesMap,
      familyBoxesMap,
    );

    // X 좌표: 부모 노드의 오른쪽에 배치
    const x = parentX + parentDimensions.width + GEN_GAP;

    // Y 좌표: 이전 노드들의 높이와 간격을 고려하여 계산
    childNode.x = x;
    childNode.y = currentY;

    // 재귀적으로 자식 노드들의 위치 계산
    calculateNodePositions(
      childId,
      x,
      currentY,
      { width: childNode.width, height: childNode.height },
      nodesMap,
      familyBoxesMap,
    );

    // 다음 노드의 Y 위치 업데이트
    currentY += childNode.height + SIB_GAP;
  });

  // FamilyBox 정보 저장
  familyBoxesMap.set(nodeId, {
    id: nodeId,
    type: "familyBox",
    nodeId: nodeId,
    x: parentX,
    y: familyBoxY,
    width: childDimensions.width,
    height: childDimensions.height,
    childBoxes: node.children
      .map((childId) => familyBoxesMap.get(childId)!)
      .filter(Boolean),
  });
};

/**
 * 화살표의 위치를 업데이트하는 함수
 * @param arrow - 업데이트할 화살표
 * @param nodes - 모든 노드의 맵
 * @returns 업데이트된 화살표
 */
const updateArrowPosition = (
  arrow: AllShapeTypes,
  nodes: Map<string, MindMapNode>,
): AllShapeTypes => {
  if (!isArrow(arrow)) return arrow;

  const fromNode = nodes.get(arrow.from);
  const toNode = nodes.get(arrow.to);

  if (!fromNode || !toNode) return arrow;

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
};

/**
 * 마인드맵 레이아웃을 계산하는 함수
 * @param shapes - 모든 도형 (노드 및 화살표)
 * @param rootId - 루트 노드의 ID
 * @returns 계산된 노드 위치, familyBoxes, 업데이트된 도형들
 */
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
      // MindMapNode로 변환
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
      // 화살표 관계 저장
      if (!relationshipMap.has(shape.from)) {
        relationshipMap.set(shape.from, new Set());
      }
      relationshipMap.get(shape.from)?.add(shape.to);
      updatedArrows.set(shape.id, shape);
    }
  });

  // 2. 계층 구조 구성
  buildHierarchy(rootId, nodes, relationshipMap, new Set());

  // 3. 마인드맵 그룹 생성 및 설정
  const mindMapGroup = createMindMapGroup(rootId, nodes);
  setCurrentMindMapGroup(mindMapGroup);

  // 레이아웃 계산
  calculateFamilyBoxDimensions(rootId, nodes, familyBoxes);
  calculateNodePositions(
    rootId,
    nodes.get(rootId)!.x,
    nodes.get(rootId)!.y,
    { width: nodes.get(rootId)!.width, height: nodes.get(rootId)!.height },
    nodes,
    familyBoxes,
  );

  // 가능한 위치 계산
  mindMapGroup.availablePositions = calculateAvailablePositions(
    nodes,
    familyBoxes,
  );

  // 6. 화살표 업데이트
  shapes.forEach((shape) => {
    if (isArrow(shape)) {
      const updatedArrow = updateArrowPosition(shape, nodes);
      updatedArrows.set(shape.id, updatedArrow);
    }
  });

  // 7. 최종 도형 업데이트
  const updatedShapes = shapes.map((shape) => {
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
  });

  return {
    nodes,
    familyBoxes,
    updatedShapes,
    mindMapGroup,
  };
};
