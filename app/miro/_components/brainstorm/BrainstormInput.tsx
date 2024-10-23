import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  toggleBrainstormMode,
  updateInputText,
  clearInputText,
} from "@/redux/features/brainstormSlice";

interface BrainstormInputProps {
  onCreateNode: (text: string) => void;
}

const BrainstormInput: React.FC<BrainstormInputProps> = ({ onCreateNode }) => {
  const dispatch = useDispatch();
  const { isActive, inputText } = useSelector(
    (state: RootState) => state.brainstorm,
  );

  // 브레인스토밍 모드 토글 (Shift + T)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "T") {
        dispatch(toggleBrainstormMode());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  // 텍스트 입력 처리
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(updateInputText(e.target.value));
    },
    [dispatch],
  );

  // Ctrl/Cmd + Enter 처리
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (inputText.trim()) {
          onCreateNode(inputText);
          dispatch(clearInputText());
        }
      }
    },
    [inputText, onCreateNode, dispatch],
  );

  if (!isActive) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        width: "300px",
        zIndex: 1000,
      }}
    >
      <textarea
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="아이디어를 입력하세요... (Ctrl/Cmd + Enter로 생성)"
        style={{
          width: "100%",
          height: "150px",
          padding: "10px",
          borderRadius: "8px",
          border: "2px solid #00A3FF",
          resize: "none",
          fontSize: "16px",
        }}
        autoFocus
      />
    </div>
  );
};

export default BrainstormInput;
