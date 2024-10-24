"use client";

import Editor from "@/components/editor";
import { Toolbar } from "@/components/sidebar/toolbar";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const DocumentIdPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const documents = useSelector((state: RootState) => state.documents.items);
  const document = documents[params.documentsId as string];
  const [content, setContent] = useState(document?.content);

  const handleChange = async (newContent: string) => {
    setContent(newContent);
  };

  if (document === undefined) {
    return <p>로딩 중...</p>;
  }

  if (document === null) {
    return null;
  }

  return (
    <div className="pb-40">
      <div className="h-[35px]" />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} />
        <Editor onChange={handleChange} initialContent={content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
