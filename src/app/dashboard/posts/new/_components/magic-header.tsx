"use client";

import { Wand2 } from "lucide-react";
import { Button } from "~/components/ui/button";
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
import { motion } from "motion/react";
import { Spinner } from "~/components/ui/spinner";

interface HeaderProps {
  onGenerate: (data: GeneratePostFormData) => void;
  isLoading?: boolean;
}

export function MagicHeader({ onGenerate, isLoading }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const GenerateButton = (
    <Button variant="outline" size="sm" disabled={isLoading}>
      <motion.div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            x: isLoading ? -30 : 0,
            opacity: isLoading ? 0 : 1,
          }}
          className="flex items-center gap-2"
        >
          <Wand2 className="h-4 w-4" />
          <span>Create with AI</span>
        </motion.div>
        <motion.div
          className="absolute flex items-center justify-center text-center"
          animate={{
            x: isLoading ? 0 : 30,
            opacity: isLoading ? 1 : 0,
          }}
        >
          <Spinner className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </Button>
  );

  const FormContent = (
    <div className="grid gap-4">
      <GeneratePostForm
        onSubmit={(data) => {
          onGenerate(data);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </div>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{GenerateButton}</PopoverTrigger>
        <PopoverContent className="w-80" side="bottom" align="end">
          <div className="space-y-1 pb-4">
            <h4 className="font-medium leading-none">Create a post using AI</h4>
            <p className="text-sm text-muted-foreground">
              Provide your brief below
            </p>
          </div>
          {FormContent}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{GenerateButton}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Generate a post using AI</DrawerTitle>
            <DrawerDescription>Provide your brief below</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-8">{FormContent}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
