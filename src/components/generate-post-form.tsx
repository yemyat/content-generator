"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import {
  type GeneratePostFormData,
  generatePostSchema,
  writingStyleOptions,
  copyLengthOptions,
} from "~/lib/schemas/generate-post-schema";

interface GeneratePostFormProps {
  onSubmit: (data: GeneratePostFormData) => void;
  onCancel: () => void;
}

export function GeneratePostForm({
  onSubmit,
  onCancel,
}: GeneratePostFormProps) {
  const form = useForm<GeneratePostFormData>({
    resolver: zodResolver(generatePostSchema),
    defaultValues: {
      writingStyle: "Professional",
      copyLength: "Medium",
      keyPoints: "",
    },
  });

  const selectedWritingStyle = form.watch("writingStyle");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="writingStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Writing Style</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {writingStyleOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedWritingStyle === "Custom" && (
          <FormField
            control={form.control}
            name="customStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Style Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Describe your custom writing style..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="copyLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Copy Length</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {copyLengthOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keyPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Points to Include</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the key points you want to include in your post..."
                  className="h-24 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Generate</Button>
        </div>
      </form>
    </Form>
  );
}
