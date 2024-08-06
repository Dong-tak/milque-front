"use client";

import {
  ContentsComment,
  ContentsContainer,
  ContentsImg,
} from "@/styles/contentsStyle";
import { useState } from "react";
import ContentsModal from "./contents-modal";

export default function ContentsPrev() {
  const [isContentsPrev, setIsContentsPrev] = useState(false);
  const clickContentsPrev = () => setIsContentsPrev(!isContentsPrev);
  const closeModal = () => setIsContentsPrev(false);

  return (
    <button onClick={clickContentsPrev}>
      <ContentsContainer>
        <ContentsImg
          src={"/test.png"}
          alt="profile"
          className="border-b-2 border-basic-800"
        />
        <ContentsComment>
          한 줄이 넘어가면 말 줄임표로 점점점이 표시될 예정입니다.
        </ContentsComment>
      </ContentsContainer>
      {isContentsPrev && <ContentsModal onClose={closeModal} />}
    </button>
  );
}
