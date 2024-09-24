import dynamic from "next/dynamic";
import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorComponentProps {
  value: string;
  onChange: (content: string) => void;
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

class EditorComponent extends Component<EditorComponentProps> {
  constructor(props: EditorComponentProps) {
    super(props);
  }

  modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };

  formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  render() {
    const { value, onChange } = this.props;
    return (
      <div style={{ height: "650px" }}>
        <ReactQuill
          style={{ height: "600px" }}
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          value={value || ""}
          onChange={(content, delta, source, editor) =>
            onChange(editor.getHTML())
          }
        />
      </div>
    );
  }
}
export default EditorComponent;
