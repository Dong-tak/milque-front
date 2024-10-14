import { createReactBlockSpec } from "@blocknote/react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/redux/store";
import { addDocument } from "@/redux/features/documentsSlice";
import { v4 as uuidv4 } from "uuid";

export const PageBlock = createReactBlockSpec(
  {
    type: "page",
    propSchema: {},
    content: "inline", // 블록 안에 블록이 포함될 수 있도록 설정
  },
  {
    render: (props) => {
      // Redux 및 Next.js 훅 사용
      const dispatch = useDispatch();
      const params = useParams();
      const router = useRouter();

      // 문서 ID 가져오기

      const [newDocId, setNewDocId] = useState<string | null>(null);

      // 새로운 페이지 생성 핸들러
      const handleCreateNewPage = () => {
        const parentId = params.documentsId
          ? (params.documentsId as string)
          : undefined;
        console.log(parentId);
        // 새로운 문서 생성
        const newDoc = {
          title: "New Page",
          parentId,
          content: "",
        };
        dispatch(addDocument(newDoc));
      };

      // 새로운 페이지로 이동하는 핸들러
      const handleNavigate = () => {
        const documents = useSelector(
          (state: RootState) => state.documents.items,
        );
        const id = documents[params.documentsId as string].id;
        if (id) {
          router.push(`/documents/${id}`);
        }
      };

      return (
        <div>
          <button onClick={handleCreateNewPage}>새 페이지 생성</button>
          {newDocId && <button onClick={handleNavigate}>페이지로 이동</button>}
        </div>
      );
    },
  },
);
