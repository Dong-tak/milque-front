// utils/types.ts
export interface ShapeProps {
  id: string;
  type: "rectangle" | "arrow" | "textbox";
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
  x: number;
  y: number;
  text: string;
  fontSize: number;
  draggable: boolean;
}

export interface ArrowShape extends ShapeProps {
  type: "arrow";
  from: string; // 시작 객체 ID
  to: string; // 끝 객체 ID
  points: number[];
  arrowTipX: number;
  arrowTipY: number;
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
