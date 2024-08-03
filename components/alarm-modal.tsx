import React from "react";
import Alarm from "./alarm";

interface AlarmModalProps {
  onClose: () => void;
}

function AlarmModal({ onClose }: AlarmModalProps) {
  return (
    <div className="fixed inset-0 z-10 flex" onClick={onClose}>
      <div
        className="absolute left-[340px] top-[44.44px] size-[22px] rotate-45 transform border-l-2 border-t-2 border-basic-800 bg-white"
        style={{ zIndex: 11 }}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute left-[267px] top-[55px] inline-flex origin-top-left flex-col items-center justify-start gap-4 rounded-md border-2 border-basic-800 bg-white p-6"
        style={{
          zIndex: 10,
          minHeight: "100px",
          maxHeight: "80vh",
          minWidth: "300px",
          maxWidth: "80vw",
        }}
      >
        <Alarm />
      </div>
    </div>
  );
}

export default AlarmModal;
