// utils/types.ts
export interface ShapeProps {
  id: string;
  type: "rectangle" | "arrow" | "textbox" | "section";
  isSelected?: boolean;
}

export interface RectangleShape extends ShapeProps {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  draggable: boolean;
}

export interface TextShape extends ShapeProps {
  type: "textbox";
  x: number; // 추가
  y: number; // 추가
  text: string;
  fontSize: number;
  width: number;
  height: number;
  draggable: boolean;
}

export enum RelationshipType {
  Unidirectional = "unidirectional", // 단방향 관계
  Bidirectional = "bidirectional", // 양방향 관계
  Equal = "equal", // 동등관계
}

export interface ArrowHeadState {
  left: boolean; // 왼쪽 화살표 머리 표시 여부
  right: boolean; // 오른쪽 화살표 머리 표시 여부
}

export interface ArrowShape extends ShapeProps {
  type: "arrow";
  from: string;
  to: string;
  points: number[];
  arrowTipX: number;
  arrowTipY: number;
  arrowHeads: ArrowHeadState; // 화살표 머리 상태 추가
}

export interface SectionShape extends ShapeProps {
  type: "section";
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  draggable: boolean;
  memberIds: string[]; // 섹션에 포함된 객체들의 ID 배열
}

// 타입 가드 함수
export function isRectangle(shape: ShapeProps): shape is RectangleShape {
  return shape.type === "rectangle";
}

export function isArrow(shape: ShapeProps): shape is ArrowShape {
  return shape.type === "arrow";
}

export function isText(shape: ShapeProps): shape is TextShape {
  return shape.type === "textbox";
}

export function isSection(shape: ShapeProps): shape is SectionShape {
  return shape.type === "section";
}

// 관계 타입을 결정하는 헬퍼 함수
export function determineRelationshipType(
  arrowHeads: ArrowHeadState,
): RelationshipType {
  if (arrowHeads.left && arrowHeads.right) {
    return RelationshipType.Bidirectional;
  } else if (!arrowHeads.left && !arrowHeads.right) {
    return RelationshipType.Equal;
  } else {
    return RelationshipType.Unidirectional;
  }
}
