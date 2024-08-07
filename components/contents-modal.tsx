import React, { useEffect, useState } from "react";
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
import colors from "@/lib/tailwindColors";
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
import { getData } from "@/app/action";
import Link from "next/link";
import { Post } from "@/lib/types";

interface ContentsModalProps {
  onClose: () => void;
  post: Post;
}

function ContentsModal({ onClose, post }: ContentsModalProps) {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <ContentsModalContainer onClick={(e) => e.stopPropagation()}>
        <ContentsModalImg
          src={
            post.content.length > 0 ? post.content[0].contentImage : "/test.png"
          }
          alt="contents"
        />
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
            <ContentsModalComments>{post.comment}</ContentsModalComments>
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
                <ContentsDetailInfo label="미디어" labelData={post.media} />
                <ContentsDetailInfo label="좋아요" labelData={post.likes} />
                <ContentsDetailInfo label="댓글" labelData={post.comments} />
              </div>
              <div className="flex w-full flex-col gap-3">
                <ContentsDetailInfo label="계정명" labelData="인스타그램" />
                <ContentsDetailInfo label="게시물" labelData="인스타그램" />
                <ContentsDetailInfo label="팔로워" labelData="인스타그램" />
              </div>
            </div>
          </ContentsModalInfo>
        </ContentsModalBox>
      </ContentsModalContainer>
    </div>
  );
}

export default ContentsModal;
