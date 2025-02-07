"use client";

import { Editor } from "./_components/editor";
import { useHeader } from "~/lib/contexts/header-context";
import { MagicHeader } from "./_components/magic-header";
import { useEffect } from "react";

export default function NewPostPage() {
  const { setHeaderContent } = useHeader();
  const { editor, handleGenerate, handleSaveDraft, isPending } = Editor();

  useEffect(() => {
    setHeaderContent(
      <MagicHeader
        onGenerate={handleGenerate}
        onSaveDraft={handleSaveDraft}
        isGenerating={isPending}
      />,
    );

    return () => {
      setHeaderContent(null);
    };
  }, [setHeaderContent, handleGenerate, handleSaveDraft, isPending]);

  return editor;
}
