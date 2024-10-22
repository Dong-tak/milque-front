"use client";

import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Board: React.FC = () => {
  return (
    <div className="boardContainer">
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        wheel={{
          step: 0.1,
        }}
        doubleClick={{
          disabled: true,
        }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <div className="toolbar">
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => resetTransform()}>Reset</button>
            </div>
            <TransformComponent>
              <div className="board w-ful h-full">
                {/* 보드에 추가할 요소들 */}
                <div className="h-screen w-screen">
                  <div className="item">Item 1</div>
                  <div className="item">Item 2</div>
                </div>
                {/* 예시 요소 */}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Board;
