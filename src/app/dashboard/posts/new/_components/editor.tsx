"use client";

import { useCallback, useRef } from "react";
import { PlateEditor } from "~/components/editor/plate-editor";
import type { GeneratePostFormData } from "~/lib/schemas/generate-post-schema";
import { type MyPlateEditor } from "~/lib/types";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { PlateController } from "@udecode/plate/react";

export function Editor() {
  const editorRef = useRef<MyPlateEditor | null>(null);

  const { mutate } = api.generate.generatePost.useMutation({
    onSuccess: (result) => {
      if (editorRef.current && result.post) {
        const content = [
          {
            type: "p",
            children: [{ text: result.post }],
          },
        ];
        editorRef.current.tf.insertNodes(content);
        toast.success("Content generated successfully!");
      }
    },
    onError: (error) => {
      console.error("Generation error:", error);
      toast.error("Failed to generate content. Please try again.");
    },
  });

  const handleGenerate = useCallback(
    (data: GeneratePostFormData) => {
      mutate(data);
    },
    [mutate],
  );

  return {
    editor: (
      <PlateController>
        <div className="h-full w-full" data-registry="plate">
          <PlateEditor
            onEditorReady={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>
      </PlateController>
    ),
    handleGenerate,
  };
}
