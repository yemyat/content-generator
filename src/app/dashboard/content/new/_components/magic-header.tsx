"use client";

import { FilePlus, MoreVertical, Save, Wand2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { AnimatedButton } from "~/components/ui/animated-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "~/components/ui/drawer";
import { GeneratePostForm } from "~/components/generate-post-form";
import type { GeneratePostFormData } from "~/lib/schemas/generate-post-schema";
import { useState } from "react";
import { useMediaQuery } from "~/hooks/use-media-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface HeaderProps {
  onGenerate: (data: GeneratePostFormData) => void;
  onSaveDraft: () => void;
  isGenerating?: boolean;
}

export function MagicHeader({
  onGenerate,
  onSaveDraft,
  isGenerating: isLoading,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "normal" | "loading" | "success" | "error"
  >("normal");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSaveDraftWithStatus = () => {
    setSaveStatus("loading");
    onSaveDraft();
    setSaveStatus("success");
    // Reset status after 2 seconds
    setTimeout(() => {
      setSaveStatus("normal");
    }, 2000);
  };

  const GenerateButton = (
    <AnimatedButton
      variant="outline"
      status={isLoading ? "loading" : "normal"}
      loadingText="Generating..."
      className="relative border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 transition-all duration-300 hover:border-purple-500/30 hover:from-purple-500/20 hover:to-blue-500/20"
    >
      <Wand2 className="mr-2 h-4 w-4 text-purple-600" />
      <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text font-medium text-transparent">
        Create with AI
      </span>
    </AnimatedButton>
  );

  const FormContent = (
    <div className="grid gap-4">
      <GeneratePostForm
        onSubmit={(data) => {
          onGenerate(data);
          setOpen(false);
        }}
      />
    </div>
  );

  if (isDesktop) {
    return (
      <div className="flex items-center gap-1">
        <AnimatedButton
          variant="outline"
          status={saveStatus}
          loadingText="Saving..."
          successText="Draft saved!"
          onClick={handleSaveDraftWithStatus}
        >
          <Save className="mr-2 h-4 w-4" />
          <span>Save Draft</span>
        </AnimatedButton>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>{GenerateButton}</PopoverTrigger>
          <PopoverContent className="w-96" side="bottom" align="end">
            <div className="space-y-1 pb-4">
              <h4 className="font-medium leading-none">
                Create content using AI
              </h4>
              <p className="text-sm text-muted-foreground">
                Provide your brief below
              </p>
            </div>
            {FormContent}
          </PopoverContent>
        </Popover>

        <Button variant="default">
          <FilePlus className="h-4 w-4" />
          <span>Create</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-full min-w-[240px]">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <DropdownMenuItem
                className="w-full"
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <Wand2 className="mr-2 h-4 w-4" />
                Generate with AI
              </DropdownMenuItem>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Generate a post using AI</DrawerTitle>
                  <DrawerDescription>
                    Provide your brief below
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-8">{FormContent}</div>
              </div>
            </DrawerContent>
          </Drawer>
          <DropdownMenuItem
            className="w-full"
            onClick={handleSaveDraftWithStatus}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </DropdownMenuItem>
          <DropdownMenuItem className="w-full">
            <FilePlus className="mr-2 h-4 w-4" />
            Create
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
