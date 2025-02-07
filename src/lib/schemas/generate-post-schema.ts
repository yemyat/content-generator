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
  "Formal",
  "Friendly",
  "Excited",
  "Humorous",
  "Informative",
  "Urgent",
  "Luxury",
  "Playful",
  "Serious",
  "Custom",
] as const;

export const writingStylePreviews: Record<string, string> = {
  Formal:
    "Our comprehensive solutions deliver measurable results through strategic implementation and industry best practices.",
  Friendly:
    "Hi there! We're so glad you're here. Let us share some exciting updates that we think you'll love! 😊",
  Enthusiastic:
    "We're absolutely thrilled to announce this game-changing development! 🎉 You won't believe what's coming next!",
  Humorous:
    "Warning: Reading this content may cause unexpected bursts of laughter and spontaneous happiness. Side effects may include smiling 😄",
  Informative:
    "Research indicates that 87% of businesses benefit from this approach, leading to a 2.5x increase in efficiency metrics.",
  Urgent:
    "⚡ Time-sensitive update: Don't miss this critical opportunity. Act now to secure your advantage before the deadline!",
  Luxury:
    "Indulge in an extraordinary experience crafted with unparalleled attention to detail and refined elegance.",
  Playful:
    "Ready for something fun? 🎮 Let's dive into this awesome adventure together! Spoiler alert: It's going to be amazing!",
  Serious:
    "This matter requires immediate attention. We must address these critical factors to ensure optimal outcomes.",
  Custom: "Create your own unique voice and style!",
};

export const generatePostSchema = z.object({
  contentType: z.enum(contentTypeOptions),
  contentLength: z.string(),
  writingStyle: z.enum(writingStyleOptions),
  customStyle: z.string().optional(),
  keyPoints: z.string().min(1, "Key points are required"),
});

export type GeneratePostFormData = z.infer<typeof generatePostSchema>;
