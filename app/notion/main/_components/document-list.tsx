"use client";

import { useParams, useRouter } from "next/navigation";
import Item from "./item";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
  parentDocumentId?: string | null;
  level?: number;
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const dispatch = useDispatch();
  const documents = useSelector((state: RootState) => state.documents.items);
  const onRedirect = (documentId: string) => {
    router.push(`/notion/main/documents/${documentId}`);
  };

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const filteredDocuments = Object.values(documents).filter((doc) =>
    parentDocumentId ? doc.parentId === parentDocumentId : !doc.parentId,
  );

  if (filteredDocuments.length === 0) {
    return (
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "text-sm font-medium text-muted-foreground",
          level === 0 && "hidden",
        )}
      >
        No pages inside
      </p>
    );
  }

  return (
    <>
      {filteredDocuments.map((doc) => (
        <div key={doc.id}>
          <Item
            id={doc.id}
            onClick={() => onRedirect(doc.id)}
            label={doc.title || "Untitled"}
            icon={FileIcon}
            documentIcon={doc.icon}
            active={params.documentId === doc.id}
            level={level}
            onExpand={() => onExpand(doc.id)}
            expanded={expanded[doc.id]}
          />
          {expanded[doc.id] && (
            <DocumentList parentDocumentId={doc.id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};
