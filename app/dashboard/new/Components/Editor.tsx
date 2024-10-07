"use client";

import { uploadFiles } from "@/utils/uploadthing";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
  onChange?: (blocks: Block[]) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: Props) => {
  const {resolvedTheme} = useTheme();
  
  const [blocks, setBlocks] = useState<Block[]>([]);
  const editor: BlockNoteEditor = useCreateBlockNote({ 
    initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
    uploadFile: async (file: File) => {
      const [res] = await uploadFiles("imageUploader", { files: [file] });
      return res.url;
    },
  });

  useEffect(() => {
    if (onChange) {
      onChange(blocks);
    }
  }, [blocks, onChange]);

  return (
    <div className="-mx-10">
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={() => setBlocks(editor.document)}
      />
    </div>
  );
};

export default Editor;
