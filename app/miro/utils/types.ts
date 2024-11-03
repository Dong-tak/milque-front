// utils/types.ts

// 모든 도형 타입을 포함하는 유니온 타입 정의
export type AllShapeTypes =
  | RectangleShape
  | ArrowShape
  | TextShape
  | ImageEmbedShape
  | PDFEmbedShape
  | IframeEmbedShape
  | MarkdownShape
  | SectionShape
  | BoardShape
  | MindMapNode
  | FamilyBox;

// 새로운 타입을 추가할 때 여기에 | NewShapeType 형태로 추가

export interface ShapeProps {
  id: string;

  type:
    | "rectangle"
    | "arrow"
    | "text"
    | "imageEmbed"
    | "pdfEmbed"
    | "iframeEmbed"
    | "markdown"
    | "section"
    | "board"
    | "mindNode"
    | "familyBox";

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
  type: "text";
  x: number; // 추가
  y: number; // 추가
  text: string;
  fontSize: number;
  width?: number;
  height?: number;
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
  x?: number;
  y?: number;
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

export interface ImageEmbedShape extends ShapeProps {
  type: "imageEmbed";
  src: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  draggable: boolean;
}
export interface PDFEmbedShape extends ShapeProps {
  type: "pdfEmbed";
  x: number;
  y: number;
  width?: number;
  height?: number;
  src: string; // PDF 파일의 URL 또는 데이터 URL
  draggable: boolean;
}

export interface IframeEmbedShape extends ShapeProps {
  type: "iframeEmbed";
  x: number;
  y: number;
  width?: number;
  height?: number;
  src: string;
  draggable: boolean;
}

export interface MarkdownShape extends ShapeProps {
  type: "markdown";
  x: number;
  y: number;
  width?: number;
  height?: number;
  src?: string;
  draggable: boolean;
  mkText?: string;
}

export interface BoardShape extends ShapeProps {
  id: string;
  type: "board";
  x: number;
  y: number;
  width: number;
  height: number;
  titleBlock: string;
  draggable: boolean;
}

// MindMapNode 인터페이스는 각 노드의 속성을 정의합니다.
export interface MindMapNode {
  id: string;
  type: "mindNode";
  children: string[];
  level: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isLeft?: boolean;
  parentId?: string;
  isSelected?: boolean;
  text?: string;
}

// FamilyBox 인터페이스는 노드와 그 자식 노드들을 포함하는 박스를 정의합니다.
// 이는 레이아웃 계산 시 각 노드의 위치와 크기를 관리하는 데 사용됩니다.
export interface FamilyBox {
  id: string;
  type: "familyBox";
  x: number;
  y: number;
  width: number;
  height: number;
  nodeId: string;
  childBoxes: FamilyBox[];
  isSelected?: boolean;
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

// 타입 가드 함수
export function isRectangle(shape: ShapeProps): shape is RectangleShape {
  return shape.type === "rectangle";
}

export function isArrow(shape: ShapeProps): shape is ArrowShape {
  return shape.type === "arrow";
}

export function isText(shape: ShapeProps): shape is TextShape {
  return shape.type === "text";
}

export function isSection(shape: ShapeProps): shape is SectionShape {
  return shape.type === "section";
}

export function isImageEmbed(shape: ShapeProps): shape is ImageEmbedShape {
  return shape.type === "imageEmbed";
}

export const isPDFEmbed = (shape: ShapeProps): shape is PDFEmbedShape => {
  return shape.type === "pdfEmbed";
};

export const isIframeEmbed = (shape: ShapeProps): shape is IframeEmbedShape => {
  return shape.type === "iframeEmbed";
};

export const isMarkdown = (shape: ShapeProps): shape is MarkdownShape => {
  return shape.type === "markdown";
};

export const isBoard = (shape: ShapeProps): shape is BoardShape => {
  return shape.type === "board";
};
