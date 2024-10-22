// updateArrows 함수 수정

import React from "react";
import {
  ShapeProps,
  RectangleShape,
  TextShape,
  ArrowShape,
  isRectangle,
  isArrow,
  isText,
} from "../utils/types";
import {
  findClosestShapeAtPoint,
  getClosestSidePoint,
  snapDistance,
} from "../utils/helpers";
import { getConnectorPoints } from "../utils/arrowUtils";

export const updateArrows = (
  movedShapeId: string,
  newX: number,
  newY: number,
  shapes: any[],
  setShapes: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  const updatedShapes = shapes.map((shape) => {
    if (isArrow(shape)) {
      if (shape.from === movedShapeId || shape.to === movedShapeId) {
        const fromShape =
          shape.from === movedShapeId
            ? ({
                ...shapes.find((s) => s.id === shape.from),
                x: newX,
                y: newY,
              } as RectangleShape | TextShape)
            : (shapes.find((s) => s.id === shape.from) as
                | RectangleShape
                | TextShape);
        const toShape =
          shape.to === movedShapeId
            ? ({
                ...shapes.find((s) => s.id === shape.to),
                x: newX,
                y: newY,
              } as RectangleShape | TextShape)
            : (shapes.find((s) => s.id === shape.to) as
                | RectangleShape
                | TextShape);

        if (fromShape && toShape) {
          const result = getConnectorPoints(fromShape, toShape);
          return {
            ...shape,
            points: result.points,
            arrowTipX: result.arrowTipX,
            arrowTipY: result.arrowTipY,
          };
        }
      }
    }
    return shape;
  });
  setShapes(updatedShapes);
};
