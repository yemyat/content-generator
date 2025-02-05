import { z } from "zod";

export const brandVoiceOptions = [
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

export const visualStyleOptions = [
  "Modern & Clean",
  "Vibrant & Colorful",
  "Minimalist",
  "Illustrative",
  "Photographic",
  "Nature-Inspired",
  "Urban",
  "Rustic",
  "Luxury",
  "Custom Description",
] as const;

export const campaignGoalOptions = [
  "Brand Awareness",
  "Website Traffic",
  "Lead Generation",
  "Sales/Conversions",
  "Engagement",
  "Event Promotion",
  "Product/Feature Announcement",
  "App Downloads",
] as const;

export const socialPlatforms = [
  "Instagram",
  "Facebook",
  "Twitter",
  "LinkedIn",
  "TikTok",
  "Pinterest",
  "YouTube",
  "General Social Media",
] as const;

export const callToActionOptions = [
  "Shop Now",
  "Learn More",
  "Visit Website",
  "Sign Up",
  "Contact Us",
  "Follow Us",
  "Get a Quote",
  "Book Now",
  "Download Now",
  "Share Now",
  "Watch Now",
  "Custom CTA",
] as const;

export const imageStyleOptions = [
  "Modern & Clean",
  "Vibrant & Colorful",
  "Minimalist",
  "Illustrative",
  "Photorealistic",
  "Abstract",
  "Product-Focused",
  "Lifestyle",
  "Seasonal",
  "Event-Themed",
] as const;

export const copyLengthOptions = [
  "Short & Punchy",
  "Medium",
  "Slightly Longer",
  "Story-Style",
] as const;

export const aspectRatioOptions = [
  "1:1",
  "19:6",
  "6:19",
  "4:3",
  "3:4",
] as const;

export const generateFormSchema = z.object({
  // Section 1: Brand Settings
  brandSettings: z.object({
    brandName: z.string().min(1, "Brand name is required"),
    brandVoice: z.enum(brandVoiceOptions),
    brandKeywords: z.string().min(1, "Brand keywords are required"),
    visualBrandStyle: z.enum(visualStyleOptions),
    brandLogo: z.any().optional(), // File upload handling
    brandColors: z.array(z.string()).optional(),
    brandFont: z.string().optional(),
  }),

  // Section 2: Campaign Goal & Basic Info
  campaignInfo: z.object({
    campaignName: z.string().optional(),
    campaignGoal: z.enum(campaignGoalOptions),
    targetAudience: z.string().min(1, "Target audience is required"),
  }),

  // Section 3: Content Focus & Key Message
  contentDetails: z.object({
    productOrService: z.string().min(1, "Product/Service is required"),
    keyMessage: z.string().min(1, "Key message is required"),
    callToAction: z.enum(callToActionOptions),
  }),

  // Section 4: Image Style & Details
  imageDetails: z.object({
    imageStyle: z.enum(imageStyleOptions),
    visualKeywords: z.string().min(1, "Visual keywords are required"),
    aspectRatio: z.enum(aspectRatioOptions),
    exampleImage: z.any().optional(), // File upload handling
  }),

  // Section 5: Copy Length & Format
  copySettings: z.object({
    copyLength: z.enum(copyLengthOptions),
    includeHashtags: z.boolean().default(false),
    includeEmojis: z.boolean().default(false),
    specificKeywords: z.string().optional(),
  }),
});

export type GenerateFormData = z.infer<typeof generateFormSchema>;
