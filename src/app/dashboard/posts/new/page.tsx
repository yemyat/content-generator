"use client";

import { useEffect, useCallback, useRef } from "react";
import { PlateEditor } from "~/components/editor/plate-editor";
import { useHeader } from "~/lib/contexts/header-context";
import { MagicHeader } from "./_components/magic-header";
import type { GeneratePostFormData } from "~/lib/schemas/generate-post-schema";
import { type MyPlateEditor } from "~/lib/types";

export default function DashboardPage() {
  const { setHeaderContent } = useHeader();
  const editorRef = useRef<MyPlateEditor | null>(null);

  const handleGenerate = useCallback((data: GeneratePostFormData) => {
    // TODO: Replace this with actual AI-generated content
    const mockGeneratedContent = [
      {
        type: "h1",
        children: [{ text: "AI Generated Title" }],
      },
      {
        type: "p",
        children: [
          { text: "This is AI generated content based on your brief." },
        ],
      },
    ];
    console.log("Generated with data:", data);
    if (editorRef.current) {
      editorRef.current.tf.setValue(mockGeneratedContent);
    }
  }, []);

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
