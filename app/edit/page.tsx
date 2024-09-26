"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import ResponsiveIframe from "@/components/embed/iframe-embed";

export default function App() {
  const [value, setValue] = React.useState("**Hello world!!!**");

  const handleEditorChange = (value?: string) => {
    setValue(value || "");
  };
  return (
    <div className="container">
      <MDEditor value={value} onChange={handleEditorChange} />
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />

      <ResponsiveIframe src="https://toss.tech/article/nodejs_pipeline_plugin" />
    </div>
  );
}
