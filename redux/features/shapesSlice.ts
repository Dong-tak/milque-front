import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RectangleShape, // 사각형 도형 타입
  TextShape, // 텍스트 도형 타입
  ArrowShape, // 화살표 도형 타입
  SectionShape, // 섹션 도형 타입
  AllShapeTypes, // 모든 도형 타입들의 유니온 타입
} from "@/app/miro/utils/types";

// 모든 도형 타입을 포함하는 Shape 타입 별칭 정의
type Shape = AllShapeTypes;

// 도형들의 상태를 정의하는 인터페이스
interface ShapesState {
  shapes: Shape[]; // 캔버스에 있는 모든 도형들의 배열
}

// 초기 상태 정의 - 빈 도형 배열로 시작
const initialState: ShapesState = {
  shapes: [],
};

// 도형들을 관리하는 Redux 슬라이스 생성
const shapesSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {
    // 도형 배열 전체를 새로운 배열로 설정하는 리듀서
    setShapes: (state, action: PayloadAction<Shape[]>) => {
      state.shapes = action.payload;
    },

    // 새로운 도형을 배열에 추가하는 리듀서
    addShape: (state, action: PayloadAction<Shape>) => {
      state.shapes.push(action.payload);
    },

    // 특정 도형의 속성을 업데이트하는 리듀서
    updateShape: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Shape> }>,
    ) => {
      const { id, updates } = action.payload;
      const shape = state.shapes.find((s) => s.id === id); // ID로 도형 찾기
      if (shape) {
        Object.assign(shape, updates); // 찾은 도형의 속성 업데이트
      }
    },

    // 화살표의 시작점 또는 끝점을 업데이트하는 리듀서
    updateArrowEndpoints: (
      state,
      action: PayloadAction<{
        arrowId: string; // 업데이트할 화살표의 ID
        type: "from" | "to"; // 시작점("from") 또는 끝점("to")
        shapeId: string; // 연결될 도형의 ID
      }>,
    ) => {
      const { arrowId, type, shapeId } = action.payload;
      const arrow = state.shapes.find((s) => s.id === arrowId); // 화살표 찾기
      if (arrow && arrow.type === "arrow") {
        // 찾은 도형이 화살표인지 확인
        if (type === "from") {
          arrow.from = shapeId; // 시작점 업데이트
        } else {
          arrow.to = shapeId; // 끝점 업데이트
        }
      }
    },
  },
});

// 액션 생성자들을 export
export const { setShapes, addShape, updateShape, updateArrowEndpoints } =
  shapesSlice.actions;
// 리듀서를 export
export default shapesSlice.reducer;
