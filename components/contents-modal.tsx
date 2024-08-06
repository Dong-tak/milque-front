import React from "react";
import LinkedAccount from "./linked-account";
import { AccountBtnOutline, AccountBtnSolid } from "@/styles/buttonStyle";
import { linkSvg, returnArrow } from "@/public/svgBag";
import SvgIcon from "./svgIcon";
import colors from "@/styles/tailwindColors";
import {
  ContentsModalBox,
  ContentsModalContainer,
  ContentsModalImg,
  ContentsModalInfo,
} from "@/styles/contentsStyle";
import ContentsDetailInfo from "./contents-detail-info";

interface ContentsModalProps {
  onClose: () => void;
}

function ContentsModal({ onClose }: ContentsModalProps) {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <ContentsModalContainer onClick={(e) => e.stopPropagation()}>
        <ContentsModalImg src={"/netflex.jpg"} alt="contents" />
        <ContentsModalBox>
          <div className="h-40 w-full bg-que-red"></div>
          <ContentsModalInfo>
            <div className="flex w-full justify-between gap-[18px]">
              <div className="flex w-full flex-col gap-3">
                <ContentsDetailInfo label="미디어" labelData="인스타그램" />
                <ContentsDetailInfo label="미디어" labelData="인스타그램" />
                <ContentsDetailInfo label="미디어" labelData="인스타그램" />
              </div>
              <div className="flex w-full flex-col gap-3">
                <ContentsDetailInfo label="미디어" labelData="인스타그램" />
                <ContentsDetailInfo label="미디어" labelData="인스타그램" />
                <ContentsDetailInfo label="미디어" labelData="인스타그램" />
              </div>
            </div>
          </ContentsModalInfo>
        </ContentsModalBox>
      </ContentsModalContainer>
    </div>
  );
}

export default ContentsModal;
