import React from "react";

import { BsArrowReturnLeft } from "react-icons/bs";
import { MdOutlineLink } from "react-icons/md";
import LinkedAccount from "./linked-account";
import { AccountBtnOutline, AccountBtnSolid } from "@/styles/buttonStyle";
import { linkSvg, returnArrow } from "@/public/svgBag";
import SvgIcon from "./svgIcon";
import { SocialAccount } from "@/styles/socialAccount";
import colors from "@/lib/tailwindColors";

interface AccountPlusModalProps {
  onClose: () => void;
}

function AccountPlusModal({ onClose }: AccountPlusModalProps) {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="inline-flex origin-top-left flex-col items-center justify-start rounded-md border-2 border-basic-800 bg-white"
        style={{
          zIndex: 10,
          minHeight: "100px",
          maxHeight: "80vh",
          minWidth: "300px",
          maxWidth: "80vw",
        }}
      >
        <div className="flex w-full flex-col items-start p-6 shadow-inner-b">
          <div className="text-2xl font-bold text-basic-800">
            메세지를 입력하세요
          </div>
          <div className="text-lg text-basic-800">메세지를 입력하세요</div>
        </div>
        <div className="my-12 flex w-full flex-col gap-4 px-8">
          <LinkedAccount />
          <LinkedAccount />
          <LinkedAccount />
        </div>
        <div className="flex gap-8 px-8 pb-8 pt-4">
          <button>
            <AccountBtnOutline>
              새 계정 연결하기
              {
                <SvgIcon
                  width={25}
                  height={24}
                  children={linkSvg}
                  fill={colors["basic-800"]}
                />
              }
            </AccountBtnOutline>
          </button>
          <button onClick={onClose}>
            <AccountBtnSolid>
              돌아가기
              {<SvgIcon width={25} height={24} children={returnArrow} />}
            </AccountBtnSolid>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPlusModal;
