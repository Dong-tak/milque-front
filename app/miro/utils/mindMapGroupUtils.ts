import { AllShapeTypes, MindMapNode, FamilyBox } from "./types";

export interface MindMapGroup {
  rootId: string;
  nodeIds: Set<string>;
  nodeRelations: Map<
    string,
    {
      level: number;
      parentId?: string;
      siblings: string[];
      neighbors: string[];
    }
  >;
  availablePositions: Map<string, { x: number; y: number }[]>;
  levelOrderMap: Map<number, string[]>;
}

let currentMindMapGroup: MindMapGroup | null = null;

export function createMindMapGroup(
  rootId: string,
  nodes: Map<string, MindMapNode>,
): MindMapGroup {
  const group: MindMapGroup = {
    rootId,
    nodeIds: new Set([rootId]),
    nodeRelations: new Map(),
    availablePositions: new Map(),
    levelOrderMap: new Map(),
  };

  // 하위 노드들을 재귀적으로 수집하고 관계 정보 저장
  function collectSubNodes(nodeId: string, level: number, parentId?: string) {
    const node = nodes.get(nodeId);
    if (!node) return;

    group.nodeIds.add(nodeId);

    // 같은 부모를 가진 형제 노드들 찾기
    const siblings = node.children.filter(
      (id) => nodes.get(id)?.parentId === parentId,
    );

    // 같은 레벨의 이웃 노드들 찾기
    const neighbors = Array.from(nodes.values())
      .filter(
        (n) => n.level === level && n.id !== nodeId && n.parentId !== parentId,
      )
      .map((n) => n.id);

    // 관계 정보 저장
    group.nodeRelations.set(nodeId, {
      level,
      parentId,
      siblings,
      neighbors,
    });

    // 자식 노드들 처리
    node.children.forEach((childId) => {
      if (!group.nodeIds.has(childId)) {
        collectSubNodes(childId, level + 1, nodeId);
      }
    });
  }

  collectSubNodes(rootId, 0);
  return group;
}

// 노드 위치 교환이 가능한지 확인
function canSwapPositions(nodeId1: string, nodeId2: string): boolean {
  if (!currentMindMapGroup) return false;

  const relation1 = currentMindMapGroup.nodeRelations.get(nodeId1);
  const relation2 = currentMindMapGroup.nodeRelations.get(nodeId2);

  if (!relation1 || !relation2) return false;

  // 같은 레벨의 노드만 교환 가능
  if (relation1.level !== relation2.level) return false;

  // 형제 노드인 경우
  if (relation1.parentId === relation2.parentId) return true;

  // 이웃 노드인 경우
  if (relation1.neighbors.includes(nodeId2)) return true;

  return false;
}

// 노드 위치 교환
export function swapNodePositions(
  nodeId1: string,
  nodeId2: string,
  nodes: Map<string, MindMapNode>,
): void {
  if (!canSwapPositions(nodeId1, nodeId2)) return;

  const node1 = nodes.get(nodeId1);
  const node2 = nodes.get(nodeId2);

  if (!node1 || !node2) return;

  // 위치 교환
  const tempX = node1.x;
  const tempY = node1.y;
  node1.x = node2.x;
  node1.y = node2.y;
  node2.x = tempX;
  node2.y = tempY;
}

// 노드가 현재 마인드맵 그룹에 속하는지 확인
export function isNodeInCurrentGroup(nodeId: string): boolean {
  return currentMindMapGroup?.nodeIds.has(nodeId) ?? false;
}

// 노드가 드래그 가능한지 확인
export function isNodeDraggable(nodeId: string): boolean {
  if (!currentMindMapGroup) return true;

  // root 노드는 자유롭게 이동 가능
  if (nodeId === currentMindMapGroup.rootId) return true;

  // 그룹에 속하지 않은 노드는 자유롭게 이동 가능
  if (!currentMindMapGroup.nodeIds.has(nodeId)) return true;

  // 그룹에 속한 노드는 위치 교환만 가능
  return false;
}

export function setCurrentMindMapGroup(group: MindMapGroup | null): void {
  currentMindMapGroup = group;
}

export function getCurrentMindMapGroup(): MindMapGroup | null {
  return currentMindMapGroup;
}

// 가능한 위치 계산 함수 추가
export function calculateAvailablePositions(
  nodes: Map<string, MindMapNode>,
  familyBoxes: Map<string, FamilyBox>,
): Map<string, { x: number; y: number }[]> {
  const positions = new Map<string, { x: number; y: number }[]>();

  nodes.forEach((node, nodeId) => {
    const availableSpots: { x: number; y: number }[] = [];
    const level = node.level;

    // 같은 레벨의 다른 노드들의 위치를 가능한 위치로 추가
    nodes.forEach((otherNode) => {
      if (otherNode.level === level && otherNode.id !== nodeId) {
        availableSpots.push({ x: otherNode.x, y: otherNode.y });
      }
    });

    positions.set(nodeId, availableSpots);
  });

  return positions;
}

// 노드 레벨 변경 함수 추가
export function changeNodeLevel(
  nodeId: string,
  newParentId: string,
  nodes: Map<string, MindMapNode>,
  familyBoxes: Map<string, FamilyBox>,
): void {
  if (!currentMindMapGroup?.nodeIds.has(nodeId)) return;

  const node = nodes.get(nodeId);
  const newParent = nodes.get(newParentId);
  if (!node || !newParent) return;

  // 이전 부모와의 연결 해제
  if (node.parentId) {
    const oldParent = nodes.get(node.parentId);
    if (oldParent) {
      oldParent.children = oldParent.children.filter((id) => id !== nodeId);
    }
  }

  // 새로운 부모와 연결
  node.parentId = newParentId;
  node.level = (newParent.level ?? 0) + 1;
  if (!newParent.children.includes(nodeId)) {
    newParent.children.push(nodeId);
  }

  // 관계 정보 업데이트
  const relation = currentMindMapGroup.nodeRelations.get(nodeId);
  if (relation) {
    relation.level = (newParent.level ?? 0) + 1;
    relation.parentId = newParentId;

    // 새로운 형제들 찾기
    relation.siblings = newParent.children.filter((id) => id !== nodeId);

    // 새로운 이웃들 찾기
    relation.neighbors = Array.from(nodes.values())
      .filter(
        (n) =>
          n.level === (newParent.level ?? 0) + 1 && n.parentId !== newParentId,
      )
      .map((n) => n.id);
  }
}
