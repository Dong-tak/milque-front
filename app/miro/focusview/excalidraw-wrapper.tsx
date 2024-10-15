"use client";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";

const ExcalidrawWrapper: React.FC = () => {
  console.info(
    convertToExcalidrawElements([
      {
        type: "rectangle",
        id: "rect-1",
        width: 186.47265625,
        height: 141.9765625,
        x: 0, // x 좌표 추가
        y: 0, // y 좌표 추가
      },
    ]),
  );
  return (
    <div className="h-screen w-screen">
      <Excalidraw />
    </div>
  );
};
export default ExcalidrawWrapper;
