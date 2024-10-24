"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

// workerSrc 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const Index = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handlePrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    console.log("NextPage Clicked");
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Document
        file="/test.pdf" // PDF 파일 경로
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page height={600} pageNumber={pageNumber} />
      </Document>

      {showControls && (
        <div className="pdf-controls">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={pageNumber <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft />
          </button>
          <span>
            {pageNumber} of {numPages}
          </span>
          <button
            type="button"
            onClick={handleNextPage}
            disabled={pageNumber >= numPages}
            aria-label="Next page"
          >
            <ChevronRight />
          </button>
        </div>
      )}

      {/* 스타일 정의 */}
      <style jsx>{`
        .pdf-controls {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          z-index: 50;
        }
        .pdf-controls button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0 5px;
          display: flex;
          align-items: center;
        }
        .pdf-controls button:disabled {
          cursor: default;
          opacity: 0.5;
        }
        .pdf-controls span {
          margin: 0 10px;
        }
      `}</style>
    </div>
  );
};

export default Index;
