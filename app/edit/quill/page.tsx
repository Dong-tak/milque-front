"use client";

import EditorComponent from "@/components/editor/quill-editor";
import { Editor } from "@/components/editor/text-editor";
import React, { useState } from "react"; // 경로는 실제 파일 경로에 맞게 수정

const ParentComponent = () => {
  const [value, setValue] = useState<string>("");

  const handleEditorChange = (content?: string) => {
    setValue(content || "");
  };

  return (
    <div>
      <EditorComponent value={value} onChange={handleEditorChange} />
      {/* <Editor value={value} onChange={handleEditorChange} /> */}
    </div>
  );
};

export default ParentComponent;
