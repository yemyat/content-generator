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
  contentTypeOptions,
  articleLengthOptions,
  socialMediaLengthOptions,
  emailLengthOptions,
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
      contentType: "Social Media Post",
      contentLength: "Medium Post (approx. 150 words)",
      writingStyle: "Professional",
      keyPoints: "",
    },
  });

  const selectedWritingStyle = form.watch("writingStyle");
  const selectedContentType = form.watch("contentType");

  const getLengthOptions = () => {
    switch (selectedContentType) {
      case "Long-form Article":
        return articleLengthOptions;
      case "Social Media Post":
        return socialMediaLengthOptions;
      case "Email":
        return emailLengthOptions;
      default:
        return [];
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="contentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">
                What do you want to create today?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose your content type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contentTypeOptions.map((option) => (
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
          name="contentLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">
                How long should it be?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select content length" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getLengthOptions().map((option) => (
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
          name="writingStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">
                What tone of voice would you like?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
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
                <FormLabel className="font-medium">
                  Describe your custom tone of voice
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g., 'Casual but professional with a hint of humor'"
                    className="h-12"
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
          name="keyPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">
                What are the key points to include?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the main points, ideas, or messages you want to convey..."
                  className="h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" size="lg" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" size="lg">
            Generate
          </Button>
        </div>
      </form>
    </Form>
  );
}
