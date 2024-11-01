import { AllShapeTypes, isArrow, MindMapNode, FamilyBox } from "./types";
import { getConnectorPoints } from "./arrowUtils";

// 레이아웃 간격 상수 정의
const GenGap = 48; // 세대 간 간격
const SibGap = 24; // 형제 노드 간 간격
const NavGap = 36; // 네비게이션 간격

function calculateFamilyBoxDimensions(
  nodeId: string,
  nodes: Map<string, MindMapNode>,
  familyBoxes: Map<string, FamilyBox>,
): { width: number; height: number } {
  const node = nodes.get(nodeId);
  if (!node || !node.children.length) {
    return {
      width: node?.width || 0,
      height: node?.height || 0,
    };
  }

  // 현재 노드의 자식들의 FamilyBox 크기 계산
  const childrenDimensions = node.children.map((childId) =>
    calculateFamilyBoxDimensions(childId, nodes, familyBoxes),
  );

  // 현재 세대의 최대 너비 찾기 (w^n_m)
  const maxNodeWidth = Math.max(
    node.width,
    ...childrenDimensions.map((d) => d.width),
  );

  // 다음 세대의 FamilyBox 너비 (W^{n+1}_i)
  const nextGenWidth = Math.max(...childrenDimensions.map((d) => d.width));

  // 전체 너비 계산: W^n_i = w^n_m + W^{n+1}_i + Gap_gen
  const totalWidth = maxNodeWidth + nextGenWidth + GenGap;

  // 높이 계산: H^n_i = ∑H^{n+1}_z + Gap_sib × (z-1)
  const totalHeight = childrenDimensions.reduce((sum, dim, index) => {
    return sum + dim.height + (index > 0 ? SibGap : 0);
  }, 0);

  return { width: totalWidth, height: totalHeight };
}

function calculateNodePositions(
  nodeId: string,
  parentX: number,
  parentY: number,
  parentDimensions: { width: number; height: number },
  nodesMap: Map<string, MindMapNode>,
  familyBoxesMap: Map<string, FamilyBox>,
) {
  const node = nodesMap.get(nodeId);
  if (!node) return;

  const childDimensions = calculateFamilyBoxDimensions(
    nodeId,
    nodesMap,
    familyBoxesMap,
  );

  // 부모의 형제 노드들 찾기
  const parentNode = node.parentId ? nodesMap.get(node.parentId) : null;
  const grandParentNode = parentNode?.parentId
    ? nodesMap.get(parentNode.parentId)
    : null;

  // parentNode가 null이 아닐 때만 filter 실행
  const parentSiblings =
    parentNode && grandParentNode?.children
      ? grandParentNode.children.filter((id) => id !== parentNode.id)
      : [];

  // 부모의 형제 노드들의 자식들 찾기
  const cousinGroups = parentSiblings.map((siblingId) => {
    const sibling = nodesMap.get(siblingId);
    return sibling ? sibling.children : [];
  });

  // root 노드의 Y 좌표 중앙점 계산
  const rootCenterY = node.y + node.height / 2;

  // FamilyBox의 Y 좌표를 root 노드의 중앙에 맞춤
  const familyBoxY = rootCenterY - childDimensions.height / 2;

  let currentY = familyBoxY;
  node.children.forEach((childId: string, index: number) => {
    const childNode = nodesMap.get(childId);
    if (!childNode) return;

    const childBox = calculateFamilyBoxDimensions(
      childId,
      nodesMap,
      familyBoxesMap,
    );

    // X 좌표: 부모 노드의 오른쪽에 배치
    const x = parentX + parentDimensions.width + GenGap;

    // 이전 그룹과의 간격 계산
    let additionalGap = 0;
    if (index > 0) {
      // 같은 부모의 자식들 사이에는 SibGap 사용
      additionalGap = SibGap;
    } else if (index === 0 && cousinGroups.some((group) => group.length > 0)) {
      // 다른 부모의 자식 그룹과는 NavGap 사용
      additionalGap = NavGap;
    }

    // Y 좌표: 이전 노드들의 높이와 간격을 고려하여 계산
    const y = currentY + additionalGap;

    childNode.x = x;
    childNode.y = y;

    // 재귀적으로 자식 노드들의 위치 계산
    calculateChildPositions(childId, x, y, childBox, nodesMap, familyBoxesMap);

    currentY = y + childBox.height;
  });

  // FamilyBox 정보 저장
  familyBoxesMap.set(nodeId, {
    id: nodeId,
    type: "familyBox",
    nodeId,
    x: parentX,
    y: familyBoxY,
    width: childDimensions.width,
    height: childDimensions.height,
    childBoxes: node.children
      .map((childId) => familyBoxesMap.get(childId)!)
      .filter(Boolean),
  });
}

function buildHierarchy(
  nodeId: string,
  nodes: Map<string, MindMapNode>,
  relationshipMap: Map<string, Set<string>>,
  visited: Set<string>,
  level: number,
) {
  if (visited.has(nodeId)) return;
  visited.add(nodeId);

  const node = nodes.get(nodeId);
  if (!node) return;

  node.level = level;

  // 현재 노드와 연결된 모든 화살표를 찾아서 자식 노드들을 수집
  const children = relationshipMap.get(nodeId) || new Set<string>();
  node.children = Array.from(children);

  // 각 자식 노드에 대해 재귀적으로 계층 구조 구성
  children.forEach((childId) => {
    buildHierarchy(childId, nodes, relationshipMap, visited, level + 1);
  });
}

function updateArrowPosition(
  arrow: AllShapeTypes,
  nodes: Map<string, MindMapNode>,
) {
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
}

function calculateChildPositions(
  nodeId: string,
  parentX: number,
  parentY: number,
  parentDimensions: { width: number; height: number },
  nodesMap: Map<string, MindMapNode>,
  familyBoxesMap: Map<string, FamilyBox>,
) {
  const node = nodesMap.get(nodeId);
  if (!node) return;

  let currentY = parentY;
  node.children.forEach((childId: string, index: number) => {
    const childNode = nodesMap.get(childId);
    if (!childNode) return;

    const childDimensions = calculateFamilyBoxDimensions(
      childId,
      nodesMap,
      familyBoxesMap,
    );

    // X 좌표: 부모 노드의 오른쪽에 배치
    const x = parentX + parentDimensions.width + GenGap;

    // Y 좌표: 부모 노드를 기준으로 수직 배치
    const y = currentY + index * (childDimensions.height + SibGap);

    childNode.x = x;
    childNode.y = y;
    childNode.isLeft = false; // 모든 노드를 오른쪽에 배치

    // 재귀적으로 자식 노드들의 위치 계산
    calculateChildPositions(
      childId,
      x,
      y,
      childDimensions,
      nodesMap,
      familyBoxesMap,
    );

    currentY = y;
  });
}

/**
 * 마인드맵 레이아웃을 계산하는 함수
 * @param shapes - 모든 도형 (노드 및 화살표)
 * @param rootId - 루트 노드의 ID
 * @returns 계산된 노드 위치, familyBoxes, 업데이트된 도형들
 */
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
        type: "mindNode",
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

  // 2. 계층 구조 구성
  buildHierarchy(rootId, nodes, relationshipMap, new Set(), 0);

  // 3. 루트 노드의 위치는 유지
  const rootNode = nodes.get(rootId);
  if (!rootNode) return { nodes, familyBoxes, updatedShapes: shapes };

  // 4. FamilyBox 크기 계산
  const rootDimensions = calculateFamilyBoxDimensions(
    rootId,
    nodes,
    familyBoxes,
  );

  // 5. 자식 노드들의 위치 계산 수정
  const childrenNodes = rootNode.children
    .map((id) => nodes.get(id))
    .filter((node): node is MindMapNode => node !== undefined);

  // 모든 자식 노드의 총 높이 계산 (SibGap 포함)
  const totalChildrenHeight = childrenNodes.reduce((sum, node, index) => {
    const height = node.height;
    return sum + height + (index > 0 ? SibGap : 0);
  }, 0);

  // root 노드의 중앙점 계산
  const rootCenterY = rootNode.y + rootNode.height / 2;

  // 자식 노드들의 시작 Y 좌표 계산 (root 노드의 중앙에서 총 높이의 절반을 뺀 위치)
  let currentY = rootCenterY - totalChildrenHeight / 2;

  rootNode.children.forEach((childId, index) => {
    const childNode = nodes.get(childId);
    if (!childNode) return;

    const childDimensions = calculateFamilyBoxDimensions(
      childId,
      nodes,
      familyBoxes,
    );

    // X 좌표: 루트 노드의 오른쪽에 배치
    const x = rootNode.x + rootNode.width + GenGap;

    // Y 좌표: 이전 노드들의 높이와 간격을 고려하여 계산
    childNode.x = x;
    childNode.y = currentY;
    childNode.isLeft = false;

    // 재귀적으로 하위 노드들의 위치 계산
    calculateChildPositions(
      childId,
      childNode.x,
      childNode.y,
      childDimensions,
      nodes,
      familyBoxes,
    );

    // 다음 노드의 Y 좌표 계산
    currentY += childNode.height + SibGap;
  });

  // 6. 화살표 업데이트
  shapes.forEach((shape) => {
    if (isArrow(shape)) {
      const updatedArrow = updateArrowPosition(shape, nodes);
      updatedArrows.set(shape.id, updatedArrow);
    }
  });

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
