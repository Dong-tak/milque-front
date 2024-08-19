"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

export default function App() {
  const [value, setValue] = React.useState("**Hello world!!!**");

  const handleEditorChange = (value?: string) => {
    setValue(value || "");
  };
  return (
    <div className="container">
      <MDEditor value={value} onChange={handleEditorChange} />
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
    </div>
  );
}
