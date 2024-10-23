// utils/types.ts
export interface ShapeProps {
  id: string;
  type:
    | "rectangle"
    | "arrow"
    | "textbox"
    | "imageEmbed"
    | "pdfEmbed"
    | "iframeEmbed"
    | "markdown";
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

export interface ArrowShape extends ShapeProps {
  type: "arrow";
  from: string; // 시작 객체 ID
  to: string; // 끝 객체 ID
  points: number[];
  arrowTipX: number;
  arrowTipY: number;
  showArrowHead?: boolean; // 추가
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
  src: string;
  draggable: boolean;
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
