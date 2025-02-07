"use client";

import { useCallback, useRef, useEffect } from "react";
import { PlateEditor } from "~/components/editor/plate-editor";
import type { GeneratePostFormData } from "~/lib/schemas/generate-post-schema";
import { type MyPlateEditor } from "~/lib/types";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { PlateController } from "@udecode/plate/react";
import { deserializeMd } from "@udecode/plate-markdown";
import { type Value } from "@udecode/plate";
import { EDITOR_DEFAULT_VALUE } from "~/lib/default";

const DRAFT_STORAGE_KEY = "editor-draft";

export function Editor() {
  const editorRef = useRef<MyPlateEditor | null>(null);
  const isFirstGenerationRef = useRef(true);

  // Load draft on initial mount
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (savedDraft) {
      try {
        const content = JSON.parse(savedDraft) as Value;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        editor.tf.setValue(content);
      } catch (err) {
        console.error("Error loading draft:", err);
        toast.error("Failed to load draft");
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      editor.tf.setValue(EDITOR_DEFAULT_VALUE);
    }
  }, []);

  const handleSaveDraft = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const content = editor.children;
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(content));
    } catch (err) {
      console.error("Error saving draft:", err);
      toast.error("Failed to save draft");
    }
  }, []);

  const { mutate, isPending } = api.generate.generatePost.useMutation({
    onSuccess: (result) => {
      const editor = editorRef.current;
      if (!editor || !result.post) return;

      try {
        // Deserialize the markdown content into Plate's format
        const content = deserializeMd(editor, result.post) as Value;

        if (isFirstGenerationRef.current) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          editor.tf.setValue([]);
          isFirstGenerationRef.current = false;
        }

        if (Array.isArray(content)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          editor.tf.insertNodes(content);
          toast.success("Content generated successfully!");
        }
      } catch (err) {
        console.error("Error processing markdown:", err);
        toast.error("Failed to process the generated content");
      }
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate content";
      console.error("Generation error:", errorMessage);
      toast.error(errorMessage);
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
    handleSaveDraft,
    isPending,
  };
}
