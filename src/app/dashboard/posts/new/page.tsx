"use client";

import { useEffect } from "react";
import { PlateEditor } from "~/components/editor/plate-editor";
import { useHeader } from "~/lib/contexts/header-context";
import { MagicHeader } from "./_components/magic-header";
import type { GeneratePostFormData } from "~/lib/schemas/generate-post-schema";

export default function DashboardPage() {
  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent(
      <MagicHeader
        onGenerate={(data: GeneratePostFormData) => {
          // TODO: Handle generation
          console.log("Generating with data:", data);
        }}
      />,
    );

    return () => {
      setHeaderContent(null);
    };
  }, [setHeaderContent]);

  return (
    <div className="h-full w-full" data-registry="plate">
      <PlateEditor />
    </div>
  );
}
