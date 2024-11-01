import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AllShapeTypes, MindMapNode } from "../utils/types";
import { calculateMindMapLayout } from "../utils/mindMapLayout";
import { setShapes } from "@/redux/features/shapesSlice";
import {
  swapNodePositions,
  changeNodeLevel,
  isNodeInCurrentGroup,
  getCurrentMindMapGroup,
} from "../utils/mindMapGroupUtils";

export function useMindMap(shapes: AllShapeTypes[]) {
  const dispatch = useDispatch();
  const [isMindMapView, setIsMindMapView] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // 마인드맵 변환 핸들러
  const handleMindMapView = useCallback(() => {
    const selectedShape = shapes.find((shape) => shape.isSelected);
    if (!selectedShape) {
      alert("마인드맵의 루트로 사용할 객체를 선택해주세요.");
      return;
    }

    if (!isMindMapView) {
      const { updatedShapes, mindMapGroup } = calculateMindMapLayout(
        shapes,
        selectedShape.id,
      );
      if (mindMapGroup) {
        const finalShapes = updatedShapes.map((shape) => ({
          ...shape,
          draggable:
            shape.id === selectedShape.id ||
            !mindMapGroup.nodeIds.has(shape.id),
        }));
        dispatch(setShapes(finalShapes));
      }
    }
    setIsMindMapView(!isMindMapView);
  }, [shapes, isMindMapView, dispatch]);

  // 마인드맵 노드 드래그 핸들러들
  const handleMindMapNodeDragStart = useCallback((e: any, nodeId: string) => {
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    setDragStartPosition({
      x: pointerPos.x,
      y: pointerPos.y,
    });
  }, []);

  const handleMindMapNodeDragMove = useCallback(
    (e: any, nodeId: string) => {
      if (!isMindMapView) return;

      const mindMapGroup = getCurrentMindMapGroup();
      if (!mindMapGroup || !mindMapGroup.nodeIds.has(nodeId)) return;

      const stage = e.target.getStage();
      const pointerPos = stage.getPointerPosition();
      if (!pointerPos) return;

      // 그룹 내의 다른 노드들 찾기
      const groupNodes = shapes.filter(
        (shape) => mindMapGroup.nodeIds.has(shape.id) && shape.id !== nodeId,
      );

      // 가장 가까운 노드 찾기
      const closestNode = groupNodes.reduce(
        (closest, node) => {
          if (!("x" in node && "y" in node)) return closest;

          const nodeX = typeof node.x === "number" ? node.x : 0;
          const nodeY = typeof node.y === "number" ? node.y : 0;

          const distance = Math.sqrt(
            Math.pow(nodeX - pointerPos.x, 2) +
              Math.pow(nodeY - pointerPos.y, 2),
          );

          if (!closest || distance < closest.distance) {
            return { node, distance };
          }
          return closest;
        },
        null as { node: AllShapeTypes; distance: number } | null,
      );

      if (closestNode && closestNode.distance < 50) {
        const mindMapNodesMap = new Map<string, MindMapNode>();

        // 모든 그룹 노드를 MindMapNode로 변환
        groupNodes.forEach((shape) => {
          if (
            "x" in shape &&
            "y" in shape &&
            "width" in shape &&
            "height" in shape
          ) {
            const x = typeof shape.x === "number" ? shape.x : 0;
            const y = typeof shape.y === "number" ? shape.y : 0;
            const width = typeof shape.width === "number" ? shape.width : 100;
            const height = typeof shape.height === "number" ? shape.height : 50;

            mindMapNodesMap.set(shape.id, {
              id: shape.id,
              type: "mindNode",
              children: [],
              level: 0,
              x,
              y,
              width,
              height,
              isSelected: shape.isSelected,
            });
          }
        });

        // 위치 교환 실행
        swapNodePositions(nodeId, closestNode.node.id, mindMapNodesMap);

        // 업데이트된 위치 적용
        const updatedShapes = shapes.map((shape) => {
          const mindNode = mindMapNodesMap.get(shape.id);
          if (mindNode) {
            return {
              ...shape,
              x: mindNode.x,
              y: mindNode.y,
            };
          }
          return shape;
        });

        dispatch(setShapes(updatedShapes));
      }
    },
    [shapes, isMindMapView, dispatch],
  );

  const handleMindMapNodeDragEnd = useCallback(() => {
    setDragStartPosition(null);
  }, []);

  return {
    isMindMapView,
    handleMindMapView,
    handleMindMapNodeDragStart,
    handleMindMapNodeDragMove,
    handleMindMapNodeDragEnd,
  };
}
