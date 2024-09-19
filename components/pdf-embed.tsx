"use client";
// components/PdfViewer.js
import { Document, Page } from "react-pdf";
import { useState } from "react";

interface PdfViewerProps {
  contentUrl: string; // contentUrl의 타입을 명시적으로 지정
}

const PdfViewer: React.FC<PdfViewerProps> = ({ contentUrl }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  // PDF 로드가 완료되었을 때 호출되는 함수
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document file={contentUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous
        </button>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
