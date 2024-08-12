"use client";

import React, { useRef } from "react";

const FocusInputButton = () => {
  // useRef를 사용하여 input 요소를 참조합니다.
  const inputRef = useRef<HTMLInputElement>(null);

  // 버튼 클릭 시 호출되는 함수입니다.
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // 버튼 클릭 시 input에 포커스를 설정합니다.
    }
  };

  return (
    <div>
      <input
        ref={inputRef} // input 요소에 ref를 전달합니다.
        type="text"
        placeholder="여기에 입력하세요"
      />
      <button onClick={handleClick}>포커스 설정</button>
    </div>
  );
};

export default FocusInputButton;
