"use client";

import { Plate } from "@udecode/plate/react";
import { useEffect } from "react";

import { useCreateEditor } from "~/components/editor/use-create-editor";
import { Editor, EditorContainer } from "~/components/plate-ui/editor";
import { type MyPlateEditor } from "~/lib/types";

interface PlateEditorProps {
  onEditorReady?: (editor: MyPlateEditor) => void;
}

export function PlateEditor({ onEditorReady }: PlateEditorProps) {
  const editor = useCreateEditor();

  useEffect(() => {
    onEditorReady?.(editor);
  }, [editor, onEditorReady]);

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor
          placeholder="What do you want to write today?"
          variant="default"
        />
      </EditorContainer>
    </Plate>
  );
}
