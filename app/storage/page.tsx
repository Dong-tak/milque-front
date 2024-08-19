"use client";
import "github-markdown-css/github-markdown.css";
import React, { useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import { marked } from "marked";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [outputHtml, setOutputHtml] = useState("");

  // 입력값 변경 핸들러
  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 마크다운을 HTML로 변환
    const processedContent = marked(value);

    // 변환된 HTML을 상태로 저장
    setOutputHtml(processedContent.toString());
  };

  return (
    <div>
      <h1>markdown test</h1>
      {/* 텍스트 입력 필드 */}
      <textarea
        value={inputValue}
        onChange={handleChange}
        placeholder="마크다운 구문 입력"
        rows={10}
        cols={50}
      />
      {/* 변환된 HTML 출력 */}
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: outputHtml }}
      />
    </div>
  );
}
