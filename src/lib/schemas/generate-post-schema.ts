import { z } from "zod";

export const contentTypeOptions = [
  "Long-form Article",
  "Social Media Post",
  "Email",
] as const;

export const articleLengthOptions = [
  "Brief Overview (approx. 250 words)",
  "Standard Blog Post (approx. 500 words)",
  "In-depth Article (approx. 1000 words)",
  "Feature Article (approx. 1500 words)",
] as const;

export const socialMediaLengthOptions = [
  "Very Short - Tweet-like (approx. 30 words)",
  "Short Post (approx. 75 words)",
  "Medium Post (approx. 150 words)",
  "Engaging Post (approx. 250 words)",
  "Detailed Story (approx. 300+ words)",
  "Thread/Series (Multiple Posts)",
] as const;

export const emailLengthOptions = [
  "Subject Line & Snippet (approx. 10 words)",
  "Brief Email (approx. 75 words)",
  "Standard Email (approx. 150 words)",
  "Detailed Email (approx. 250 words)",
] as const;

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

export const generatePostSchema = z.object({
  contentType: z.enum(contentTypeOptions),
  contentLength: z.string(),
  writingStyle: z.enum(writingStyleOptions),
  customStyle: z.string().optional(),
  keyPoints: z.string().min(1, "Key points are required"),
});

export type GeneratePostFormData = z.infer<typeof generatePostSchema>;
