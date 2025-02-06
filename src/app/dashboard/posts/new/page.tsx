"use client";

import { useEffect, useCallback, useRef } from "react";
import { PlateEditor } from "~/components/editor/plate-editor";
import { useHeader } from "~/lib/contexts/header-context";
import { MagicHeader } from "./_components/magic-header";
import type { GeneratePostFormData } from "~/lib/schemas/generate-post-schema";
import { type MyPlateEditor } from "~/lib/types";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export default function DashboardPage() {
  const { setHeaderContent } = useHeader();
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
        editorRef.current.tf.setValue(content);
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

  useEffect(() => {
    setHeaderContent(<MagicHeader onGenerate={handleGenerate} />);

    return () => {
      setHeaderContent(null);
    };
  }, [setHeaderContent, handleGenerate]);

  return (
    <div className="h-full w-full" data-registry="plate">
      <PlateEditor
        onEditorReady={(editor) => {
          editorRef.current = editor;
        }}
      />
    </div>
  );
}
