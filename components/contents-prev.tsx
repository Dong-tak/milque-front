"use client";

import {
  ContentsComment,
  ContentsContainer,
  ContentsImg,
} from "@/styles/contentsStyle";
import { useState } from "react";
import ContentsModal from "./contents-modal";
import { Post } from "@/lib/types";

interface ContentsPrevProps {
  post: Post;
}

export default function ContentsPrev({ post }: ContentsPrevProps) {
  const [isContentsPrev, setIsContentsPrev] = useState(false);
  const clickContentsPrev = () => setIsContentsPrev(!isContentsPrev);
  const closeModal = () => setIsContentsPrev(false);

  return (
    <button onClick={clickContentsPrev}>
      <ContentsContainer>
        <ContentsImg
          src={`${post.content.length > 0 ? post.content[0].contentImage : ""}`}
          alt="profile"
          className="border-b-2 border-basic-800"
        />
        <ContentsComment>{`${post.comment}`}</ContentsComment>
      </ContentsContainer>
      {isContentsPrev && <ContentsModal post={post} onClose={closeModal} />}
    </button>
  );
}
