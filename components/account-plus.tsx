import React from "react";

import { BsArrowReturnLeft } from "react-icons/bs";
import { MdOutlineLink } from "react-icons/md";
import LinkedAccount from "./linked-account";

interface AccountPlusModalProps {
  onClose: () => void;
}

function AccountPlusModal({ onClose }: AccountPlusModalProps) {
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="inline-flex h-[296px] origin-top-left flex-col items-center justify-start gap-4 rounded-md border-2 border-basic-800 bg-white p-6"
        style={{
          zIndex: 10,
          minHeight: "100px",
          maxHeight: "80vh",
          minWidth: "300px",
          maxWidth: "80vw",
        }}
      >
        <div className="flex w-full flex-col items-start">
          <div className="text-2xl font-bold text-basic-800">
            메세지를 입력하세요
          </div>
          <div className="text-lg text-basic-800">메세지를 입력하세요</div>
        </div>
        <div>
          <LinkedAccount />
        </div>
        <div className="flex gap-6">
          <button onClick={onClose} className="lg-outline-btn gap-2">
            새 계정 연결하기
            <MdOutlineLink className="size-8" />
          </button>
          <button onClick={onClose} className="lg-solid-btn gap-2">
            돌아가기
            <BsArrowReturnLeft className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPlusModal;
