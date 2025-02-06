"use client";

import { Wand2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { PlateEditor } from "~/components/editor/plate-editor";
import { useHeader } from "~/lib/contexts/header-context";

export default function DashboardPage() {
  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent(
      <Button variant="default" size="sm">
        <Wand2 className="mr-2 h-4 w-4" />
        Magic
      </Button>,
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
