import React from "react";
import Alarm from "./alarm";
import { AlarmModalContainer, AlarmTriangle } from "@/styles/alarmStyle";

interface AlarmModalProps {
  onClose: () => void;
}

function AlarmModal({ onClose }: AlarmModalProps) {
  return (
    <div className="fixed inset-0 z-10 flex" onClick={onClose}>
      <AlarmTriangle />
      <AlarmModalContainer
        onClick={(e) => e.stopPropagation()}
        className="absolute left-[267px] top-[55px] inline-flex origin-top-left"
        style={{
          zIndex: 10,
          minHeight: "100px",
          maxHeight: "80vh",
          minWidth: "300px",
          maxWidth: "80vw",
        }}
      >
        <Alarm />
        <Alarm />
        <Alarm />
        <Alarm />
      </AlarmModalContainer>
    </div>
  );
}

export default AlarmModal;
