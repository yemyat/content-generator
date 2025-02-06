import { z } from "zod";

export const writingStyleOptions = [
  "Professional",
  "Friendly",
  "Enthusiastic",
  "Humorous",
  "Informative",
  "Urgent",
  "Luxury",
  "Playful",
  "Serious",
  "Custom",
] as const;

export const copyLengthOptions = [
  "Short & Punchy",
  "Medium",
  "Slightly Longer",
  "Story-Style",
] as const;

export const generatePostSchema = z.object({
  writingStyle: z.enum(writingStyleOptions),
  customStyle: z.string().optional(),
  copyLength: z.enum(copyLengthOptions),
  keyPoints: z.string().min(1, "Key points are required"),
});

export type GeneratePostFormData = z.infer<typeof generatePostSchema>;
