import React from "react";
import LinkedAccount from "./linked-account";
import {
  AccountBtnOutline,
  AccountBtnSolid,
  BarBtnOutline,
} from "@/styles/buttonStyle";
import {
  hiperLinkSvg,
  linkSvg,
  lockSvg,
  returnArrow,
  reWriteSvg,
  smallCircle2px,
  updateSvg16px,
  uploadSvg16px,
} from "@/public/svgBag";
import SvgIcon from "./svgIcon";
import colors from "@/styles/tailwindColors";
import {
  ContentsModalBottom,
  ContentsModalBox,
  ContentsModalComments,
  ContentsModalContainer,
  ContentsModalImg,
  ContentsModalInfo,
  ContentsModalTop,
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
        <ContentsModalImg src={"/test.png"} alt="contents" />
        <ContentsModalBox className="border-l-2 border-basic-800">
          <div className="h-full w-full bg-basic-100">
            <ContentsModalTop>
              <BarBtnOutline>
                잠그기
                <SvgIcon
                  children={lockSvg}
                  width={16}
                  height={16}
                  fill={colors["basic-800"]}
                />
              </BarBtnOutline>
              <BarBtnOutline>
                원문보기
                <SvgIcon
                  children={hiperLinkSvg}
                  width={16}
                  height={16}
                  fill={colors["basic-800"]}
                />
              </BarBtnOutline>
            </ContentsModalTop>
            <ContentsModalComments>
              커멘트를 보낸 것을 약간 메모장 형태로 정리해줌 나중에는 마크다운
              형식으로 정리해주면 좋을거 같긴함. 노션처럼 ###해서 head1 2 3
              설정하고 그러는거 ㅇㅇㅇ 여기는 스크롤이 되게 하는게 핵심이라고
              생각함
            </ContentsModalComments>
          </div>
          <ContentsModalBottom>
            <div className="flex items-center gap-2">
              <SvgIcon
                children={uploadSvg16px}
                width={16}
                height={16}
                fill={colors["basic-600"]}
              />
              <span>최초등록</span>
              <span>1시간 전</span>
            </div>
            <SvgIcon
              children={smallCircle2px}
              width={2}
              height={2}
              fill={colors["basic-600"]}
            />
            <div className="flex items-center gap-2">
              <SvgIcon
                children={updateSvg16px}
                width={16}
                height={16}
                fill={colors["basic-600"]}
              />
              <span>최근수정</span>
              <span>1시간 전</span>
            </div>
          </ContentsModalBottom>
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
