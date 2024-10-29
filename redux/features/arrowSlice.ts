import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 화살표 관련 상태들의 타입 정의
interface ArrowState {
  showSettings: boolean; // 설정 패널의 표시 여부
  textBoxVisibility: { [key: string]: boolean }; // 각 화살표별 텍스트 박스 표시 여부를 저장하는 객체
  selectedArrowId: string | null; // 현재 선택된 화살표의 ID
  lastUpdate: {
    // 마지막 업데이트 정보를 저장하는 객체
    movedShapeId: string; // 이동된 도형의 ID
    newX: number; // 새로운 X 좌표
    newY: number; // 새로운 Y 좌표
    shapes: any[]; // 모든 도형들의 배열
  } | null;
}

// 초기 상태 정의
const initialState: ArrowState = {
  showSettings: false,
  textBoxVisibility: {},
  selectedArrowId: null,
  lastUpdate: null,
};

// 화살표 관련 Redux 슬라이스 생성
const arrowSlice = createSlice({
  name: "arrow",
  initialState,
  reducers: {
    // 설정 패널 토글 및 선택된 화살표 ID 설정
    toggleSettings: (state, action: PayloadAction<string>) => {
      state.showSettings = !state.showSettings;
      state.selectedArrowId = action.payload;
    },

    // 설정 패널 닫기 및 선택된 화살표 초기화
    closeSettings: (state) => {
      state.showSettings = false;
      state.selectedArrowId = null;
    },

    // 특정 화살표의 텍스트 박스 표시 여부 토글
    toggleTextBox: (state, action: PayloadAction<string>) => {
      const arrowId = action.payload;
      state.textBoxVisibility[arrowId] = !state.textBoxVisibility[arrowId];
    },

    // 화살표 위치 업데이트 정보 저장
    updateArrowPositions: (
      state,
      action: PayloadAction<{
        movedShapeId: string;
        newX: number;
        newY: number;
        shapes: any[];
      }>,
    ) => {
      state.lastUpdate = action.payload;
    },
  },
});

// 액션 생성자들을 export
export const {
  toggleSettings,
  closeSettings,
  toggleTextBox,
  updateArrowPositions,
} = arrowSlice.actions;

// 리듀서를 export
export default arrowSlice.reducer;
