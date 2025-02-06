"use client";

import { Editor } from "./_components/editor";
import { useHeader } from "~/lib/contexts/header-context";
import { MagicHeader } from "./_components/magic-header";
import { useEffect } from "react";

export default function NewPostPage() {
  const { setHeaderContent } = useHeader();
  const { editor, handleGenerate } = Editor();

  useEffect(() => {
    setHeaderContent(<MagicHeader onGenerate={handleGenerate} />);

    return () => {
      setHeaderContent(null);
    };
  }, [setHeaderContent, handleGenerate]);

  return editor;
}
