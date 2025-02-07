"use client";

import { useEffect } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { RadioCardGroup, RadioCard } from "~/components/ui/radio-card-group";
import {
  type GeneratePostFormData,
  generatePostSchema,
  writingStyleOptions,
  contentTypeOptions,
  articleLengthOptions,
  socialMediaLengthOptions,
  emailLengthOptions,
  writingStylePreviews,
} from "~/lib/schemas/generate-post-schema";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";

interface GeneratePostFormProps {
  onSubmit: (data: GeneratePostFormData) => void;
  onCancel: () => void;
}

const FORM_DRAFT_KEY = "generate-post-form-draft";

export function GeneratePostForm({
  onSubmit,
  onCancel,
}: GeneratePostFormProps) {
  const form = useForm<GeneratePostFormData>({
    resolver: zodResolver(generatePostSchema),
    defaultValues: {
      contentType: "Social Media Post",
      contentLength: "Medium Post (approx. 150 words)",
      writingStyle: "Formal",
      keyPoints: "",
    },
  });

  const selectedWritingStyle = form.watch("writingStyle");
  const selectedContentType = form.watch("contentType");
  const formValues = form.watch();

  // Load draft from local storage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(FORM_DRAFT_KEY);
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft) as GeneratePostFormData;
      form.reset(parsedDraft);
    }
  }, [form]);

  // Save draft to local storage when form values change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(formValues));
    }, 1000); // Debounce save to avoid too frequent writes

    return () => clearTimeout(timeoutId);
  }, [formValues]);

  // Clear draft from local storage on successful submit
  const handleSubmit = (data: GeneratePostFormData) => {
    localStorage.removeItem(FORM_DRAFT_KEY);
    onSubmit(data);
  };

  const handleError = (errors: FieldErrors<GeneratePostFormData>) => {
    const errorMessages = Object.values(errors)
      .map((error) => error?.message)
      .filter((message): message is string => message !== undefined);

    if (errorMessages.length > 0) {
      toast.error("Please fix the following errors:", {
        description: (
          <ul className="list-disc pl-4 pt-2">
            {errorMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        ),
      });
    }
  };

  // Clear draft from local storage on cancel
  const handleCancel = () => {
    localStorage.removeItem(FORM_DRAFT_KEY);
    onCancel();
  };

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
      <form onSubmit={form.handleSubmit(handleSubmit, handleError)}>
        <ScrollArea className="h-[400px] md:h-[500px] xl:h-[700px]">
          <div className="mb-4 flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    What do you want to create today?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                <FormItem className="space-y-4">
                  <FormLabel className="font-medium">
                    What tone of voice would you like?
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <RadioCardGroup
                        className="grid-cols-2 gap-2 md:grid-cols-3"
                        {...field}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        {writingStyleOptions.map((style) => (
                          <RadioCard
                            key={style}
                            value={style}
                            checked={field.value === style}
                            className="flex flex-col items-start justify-center p-2"
                            onClick={() => field.onChange(style)}
                          >
                            <div className="text-sm font-medium">{style}</div>
                          </RadioCard>
                        ))}
                      </RadioCardGroup>
                      {field.value && field.value !== "Custom" && (
                        <div className="rounded-lg border bg-muted/50 p-4">
                          <p className="text-sm text-muted-foreground">
                            Preview: {writingStylePreviews[field.value]}
                          </p>
                        </div>
                      )}
                    </div>
                  </FormControl>
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
                      <Textarea
                        placeholder="Describe the tone you want, for example:
- Casual but professional with a hint of humor
- Empathetic and supportive, like a caring friend
- Technical but accessible, like explaining to a colleague
- Bold and direct with a modern startup vibe"
                        className="h-32 resize-none"
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
          </div>
        </ScrollArea>

        <div className="flex w-full gap-1">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleCancel}
            className="w-full"
          >
            Cancel
          </Button>
          <Button type="submit" size="lg" className="w-full">
            Generate
          </Button>
        </div>
      </form>
    </Form>
  );
}
