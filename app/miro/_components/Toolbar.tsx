// components/Toolbar.tsx
import { ImageIcon } from "lucide-react";
import React from "react";

interface ToolbarProps {
  onRectangleToolClick: () => void;
  onArrowToolClick: () => void;
  onAddText: () => void;
  onAddImage: () => void;
}

const Toolbar = ({
  onRectangleToolClick,
  onArrowToolClick,
  onAddText,
  onAddImage,
}: ToolbarProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "10px",
        display: "flex",
        gap: "20px",
      }}
    >
      <div
        onClick={onRectangleToolClick}
        style={{ cursor: "pointer", textAlign: "center" }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "blue",
            margin: "auto",
          }}
        ></div>
        <span>사각형</span>
      </div>
      <div
        onClick={onArrowToolClick}
        style={{ cursor: "pointer", textAlign: "center" }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            margin: "auto",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "black",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: "10px solid black",
              transform: "translateY(-50%)",
            }}
          ></div>
        </div>
        <span>화살표</span>
      </div>
      <div
        onClick={onAddText}
        style={{ cursor: "pointer", textAlign: "center" }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            margin: "auto",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          T
        </div>
        <span>텍스트</span>
      </div>
      <div>
        <div
          onClick={onAddImage}
          style={{ cursor: "pointer", textAlign: "center" }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              margin: "auto",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            <ImageIcon />
          </div>
          <span>image</span>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
