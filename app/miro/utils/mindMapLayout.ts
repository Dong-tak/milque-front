// 필요한 함수와 타입 임포트
import { AllShapeTypes, isArrow, MindMapNode, FamilyBox } from "./types";
import { getConnectorPoints } from "./arrowUtils";
import {
  createMindMapGroup,
  setCurrentMindMapGroup,
  MindMapGroup,
} from "./mindMapGroupUtils";

// 레이아웃 간격 상수 정의
const GEN_GAP = 48; // 세대 간 간격 (부모-자식 노드 간 X축 간격)
const SIB_GAP = 24; // 형제 노드 간 간격 (같은 부모를 가진 노드 간 Y축 간격)
const NAV_GAP = 36; // 네비게이션 간격 (다른 부모를 가진 같은 레벨 노드 그룹 간 Y축 간격)

// 계층 구조를 구성하는 함수 (변경 없음)
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

  const childrenSet = relationshipMap.get(nodeId) || new Set<string>();
  const childrenIds: string[] = Array.from(childrenSet).map((id) => String(id));
  node.children = childrenIds;

  childrenIds.forEach((childId) => {
    const childNode = nodes.get(childId);
    if (childNode) {
      childNode.parentId = nodeId;
      buildHierarchy(childId, nodes, relationshipMap, visited, level + 1);
    }
  });
};

// 레벨별로 노드를 그룹화하는 함수
const groupNodesByLevelAndParent = (
  nodes: Map<string, MindMapNode>,
): Map<number, Map<string, MindMapNode[]>> => {
  const levels = new Map<number, Map<string, MindMapNode[]>>();

  nodes.forEach((node) => {
    const level = node.level;
    const parentId = node.parentId || "root";

    if (!levels.has(level)) {
      levels.set(level, new Map<string, MindMapNode[]>());
    }

    const levelMap = levels.get(level)!;
    if (!levelMap.has(parentId)) {
      levelMap.set(parentId, []);
    }

    levelMap.get(parentId)!.push(node);
  });

  return levels;
};

// 노드 위치를 레벨별로 계산하는 함수
const calculatePositionsByLevel = (
  levels: Map<number, Map<string, MindMapNode[]>>,
  nodes: Map<string, MindMapNode>,
  rootId: string,
) => {
  const rootNode = nodes.get(rootId)!;
  rootNode.x = rootNode.x || 0;

  const sortedLevels = Array.from(levels.keys()).sort((a, b) => a - b);
  let previousLevelTotalHeight = rootNode.height;
  let previousLevelStartY = rootNode.y || 0;

  sortedLevels.forEach((level) => {
    if (level === 0) return;

    const levelMap = levels.get(level)!;
    const parentIds = Array.from(levelMap.keys());

    // 각 그룹의 높이 계산 (SIB_GAP 포함)
    const groupHeights: number[] = parentIds.map((parentId) => {
      const groupNodes = levelMap.get(parentId)!;
      return groupNodes.reduce(
        (sum, node, index) => sum + node.height + (index > 0 ? SIB_GAP : 0),
        0,
      );
    });

    // 현재 레벨의 총 높이 계산 (NAV_GAP 포함)
    const totalHeight = groupHeights.reduce(
      (sum, height, index) => sum + height + (index > 0 ? NAV_GAP : 0),
      0,
    );

    // 현재 레벨의 Y 시작 위치 계산 (부모 노드 중심 기준)
    const startY =
      previousLevelStartY + (previousLevelTotalHeight - totalHeight) / 2;
    let currentY = startY;

    // 각 그룹에 대해 노드 위치 계산
    parentIds.forEach((parentId, groupIndex) => {
      const groupNodes = levelMap.get(parentId)!;
      const parentNode = nodes.get(parentId);

      if (parentNode) {
        // 부모 노드의 중심점을 기준으로 자식 노드들 배치
        const parentCenterY = parentNode.y + parentNode.height / 2;
        const groupHeight = groupHeights[groupIndex];
        currentY = parentCenterY - groupHeight / 2;
      }

      groupNodes.forEach((node, nodeIndex) => {
        // X 좌표 계산 (세대 간격 적용)
        node.x = (rootNode.x || 0) + level * (rootNode.width + GEN_GAP);

        // Y 좌표 설정 (형제 간격 적용)
        node.y = currentY;
        currentY +=
          node.height + (nodeIndex < groupNodes.length - 1 ? SIB_GAP : 0);
      });

      // 그룹 간 NAV_GAP 적용
      if (groupIndex < parentIds.length - 1) {
        currentY += NAV_GAP;
      }
    });

    // 다음 레벨을 위해 값 업데이트
    previousLevelTotalHeight = totalHeight;
    previousLevelStartY = startY;
  });
};

// 화살표의 위치를 업데이트하는 함수 (변경 없음)
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

// FamilyBox 계산 함수
const calculateFamilyBox = (
  nodeId: string,
  nodes: Map<string, MindMapNode>,
  level: number,
  levelFamilyBoxes: Map<number, FamilyBox[]>,
): FamilyBox => {
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

    // 레벨별 FamilyBox 그룹화
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

  // 다음 세대의 최대 너비 계산
  const nextGenMaxWidth = Math.max(...childFamilyBoxes.map((box) => box.width));

  // 전체 너비 산: 현재 노드 너비 + 세대 간 간격 + 자식 노드들의 최대 너비
  const totalWidth = node.width + GEN_GAP + nextGenMaxWidth;

  // 자식 노드들의 높이 합산 (형제 간 SIB_GAP 적용)
  const totalHeight = childFamilyBoxes.reduce(
    (sum, box, index) => sum + box.height + (index > 0 ? SIB_GAP : 0),
    0,
  );

  const familyBox: FamilyBox = {
    id: nodeId,
    type: "familyBox" as const,
    nodeId,
    width: totalWidth,
    height: totalHeight,
    x: node.x,
    y: node.y,
    childBoxes: childFamilyBoxes,
  };

  // 레벨별 FamilyBox 그룹화
  if (!levelFamilyBoxes.has(level)) {
    levelFamilyBoxes.set(level, []);
  }
  levelFamilyBoxes.get(level)!.push(familyBox);

  return familyBox;
};

// 레벨별로 FamilyBox를 그룹화하며 계산하는 함수
const calculateFamilyBoxWithLevel = (
  nodeId: string,
  nodes: Map<string, MindMapNode>,
  level: number,
  levelFamilyBoxes: Map<number, FamilyBox[]>,
): FamilyBox => {
  const familyBox = calculateFamilyBox(nodeId, nodes, level, levelFamilyBoxes);

  // 레벨별로 FamilyBox 그룹화
  if (!levelFamilyBoxes.has(level)) {
    levelFamilyBoxes.set(level, []);
  }
  levelFamilyBoxes.get(level)!.push(familyBox);

  return familyBox;
};

// NAV_GAP을 적용하는 함수
const applyNavGap = (
  levelFamilyBoxes: Map<number, FamilyBox[]>,
  nodes: Map<string, MindMapNode>,
): void => {
  levelFamilyBoxes.forEach((familyBoxes, level) => {
    let currentY = 0;
    familyBoxes.forEach((familyBox, index) => {
      // 첫 번째 그룹이 아닌 경우 NAV_GAP 적용
      if (index > 0) {
        currentY += NAV_GAP;
      }

      // FamilyBox와 관련 노드들의 Y 좌표 조정
      const deltaY = currentY - familyBox.y;
      shiftFamilyBoxY(familyBox, deltaY, nodes);

      // 다음 그룹의 Y 위치 계산
      currentY += familyBox.height;
    });
  });
};

// FamilyBox와 관련 노드들의 Y 좌표를 이동시키는 함수
const shiftFamilyBoxY = (
  familyBox: FamilyBox,
  deltaY: number,
  nodes: Map<string, MindMapNode>,
): void => {
  familyBox.y += deltaY;

  // 해당 노드의 Y 좌표도 함께 이동
  const node = nodes.get(familyBox.nodeId);
  if (node) {
    node.y += deltaY;
  }

  // 자식 FamilyBox들도 함께 이동
  familyBox.childBoxes.forEach((childBox) => {
    shiftFamilyBoxY(childBox, deltaY, nodes);
  });
};

// 노드 위치 계산 함수 수정
const calculateNodePositions = (
  nodeId: string,
  x: number,
  y: number,
  nodes: Map<string, MindMapNode>,
  familyBox: FamilyBox,
): void => {
  const node = nodes.get(nodeId);
  if (!node) return;

  // 현재 노드의 위치 설정
  node.x = x;
  node.y = y;

  if (node.children.length === 0) return;

  // 자식 노드들의 X 좌표 계산 (GEN_GAP 적용)
  const childX = x + node.width + GEN_GAP;

  // 자식 노드들의 총 높이 계산 (SIB_GAP 포함)
  const totalChildrenHeight = node.children.reduce((sum, childId, index) => {
    const childNode = nodes.get(childId);
    if (!childNode) return sum;
    return sum + childNode.height + (index > 0 ? SIB_GAP : 0);
  }, 0);

  // 부모 노드의 중심점 계산
  const parentCenterY = y + node.height / 2;

  // 자식 노드들의 시작 Y 좌표 계산 (부모의 중심점 기준)
  let currentY = parentCenterY - totalChildrenHeight / 2;

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
    currentY += childNode.height;
  });
};

// 마인드맵 레이아웃을 계산하는 함수
export const calculateMindMapLayout = (
  shapes: AllShapeTypes[],
  rootId: string,
): {
  nodes: Map<string, MindMapNode>;
  updatedShapes: AllShapeTypes[];
  mindMapGroup: MindMapGroup;
} => {
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

  // 3. 레벨별로 노드를 그룹화
  const levels = groupNodesByLevelAndParent(nodes);

  // 4. 노드 위치를 레벨별로 계산
  calculatePositionsByLevel(levels, nodes, rootId);

  // 5. 화살표 업데이트
  shapes.forEach((shape) => {
    if (isArrow(shape)) {
      const updatedArrow = updateArrowPosition(shape, nodes);
      updatedArrows.set(shape.id, updatedArrow);
    }
  });

  // 마인드맵 그룹 생성 및 설정
  const mindMapGroup = createMindMapGroup(rootId, nodes);
  setCurrentMindMapGroup(mindMapGroup);

  // 6. 최종 도형 업데이트
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
    updatedShapes,
    mindMapGroup,
  };
};
