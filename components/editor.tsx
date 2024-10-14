"use client";

import {
  Block,
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
  PartialBlock,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { useState, useRef, useEffect } from "react";
import { PageBlock } from "./pageblock";
import { StickyNote } from "lucide-react";

// EditorProps 인터페이스 정의
interface EditorProps {
  initialContent?: string; // 초기 에디터 내용 (선택적)
  onChange: (value: string) => void; // 내용 변경 시 호출될 콜백 함수
  editable?: boolean; // 편집 가능 여부 (선택적)
}
const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Alert block.
    page: PageBlock,
  },
});

const insertPageBlock = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Page",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "page",
    });
  },
  group: "Other",
  icon: <StickyNote />,
});

const Editor = ({ initialContent, onChange, editable }: EditorProps) => {
  // BlockNote 에디터 인스턴스 생성
  const editor = useCreateBlockNote({
    schema,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  // 현재 블록 상태를 저장하는 state
  const [blocks, setBlocks] = useState<PartialBlock[]>([]);

  // 이전 블록 상태를 저장하는 ref
  const prevBlocksRef = useRef<PartialBlock[]>([]);

  // WebSocket 연결을 위한 ref
  const socketRef = useRef<WebSocket | null>(null);

  // WebSocket 연결 설정
  useEffect(() => {
    socketRef.current = new WebSocket("ws://192.168.219.128:8000/ws/test/");

    socketRef.current.onopen = () => {
      console.log("WebSocket 연결이 열렸습니다.");
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket 연결이 닫혔습니다.");
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket 오류:", error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // blocks 상태가 변경될 때마다 이전 상태를 업데이트
  useEffect(() => {
    prevBlocksRef.current = blocks;
  }, [blocks]);

  // 변경 사항을 감지하는 함수
  const detectChanges = (
    currentBlocks: PartialBlock[],
    previousBlocks: PartialBlock[],
  ) => {
    const changes: { type: string; blockId?: string }[] = [];

    // 새로운 블록 추가 확인
    currentBlocks.forEach((block) => {
      if (!previousBlocks.find((b) => b.id === block.id)) {
        changes.push({ type: "add", blockId: block.id });
      }
    });

    // 블록 제거 확인
    previousBlocks.forEach((block) => {
      if (!currentBlocks.find((b) => b.id === block.id)) {
        changes.push({ type: "remove", blockId: block.id });
      }
    });

    // 블록 업데이트 확인
    currentBlocks.forEach((currentBlock) => {
      const previousBlock = previousBlocks.find(
        (b) => b.id === currentBlock.id,
      );
      if (
        previousBlock &&
        JSON.stringify(currentBlock) !== JSON.stringify(previousBlock)
      ) {
        changes.push({ type: "update", blockId: currentBlock.id });
      }
    });

    return changes;
  };

  // 변경 사항을 서버로 전송하는 함수
  const sendChangesToServer = (
    currentBlocks: Block[],
    changes?: { type: string; blockId: string }[],
  ) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          currentBlocks,
        }),
      );
    } else {
      console.error("WebSocket이 연결되지 않았습니다.");
    }
  };

  return (
    <div>
      <BlockNoteView editor={editor} slashMenu={false}>
        {/* Replaces the default Slash Menu. */}
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            // Gets all default slash menu items and `insertAlert` item.
            filterSuggestionItems(
              [
                ...getDefaultReactSlashMenuItems(editor),
                insertPageBlock(editor),
              ],
              query,
            )
          }
        />
      </BlockNoteView>
      {/* 현재 블록 상태를 JSON 형태로 화면에 표시 */}
      <pre>{/* <code>{JSON.stringify(blocks, null, 2)}</code> */}</pre>
    </div>
  );
};

export default Editor;
