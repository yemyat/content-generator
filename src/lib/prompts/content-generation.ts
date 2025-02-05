import { BASE_SYSTEM_PROMPT } from "./base";

export const CONTENT_GENERATION_PROMPT = `
${BASE_SYSTEM_PROMPT}

The user will provide you with a JSON schema containing all the information that you need to generate a social media post.

# USER BRIEF SCHEMA
Here is the Zod schema for the user input:
\`\`\`typescript
z.object({
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
\`\`\`

# OUTPUT FORMAT:
For each platform, generate:

Post copy (adapted to platform constraints)
Image prompt for AI image generation

# EXAMPLES:

## EXAMPLE 1:
🌿 Your summer wardrobe, but make it sustainable! Our new collection drops today - ethically made pieces that look good and feel even better.
Shop your favorites before they're gone 🛍️ Link in bio!
#EcoWear #SustainableFashion #EthicalStyle #SummerFashion
Image Prompt: Modern lifestyle photo of diverse models wearing eco-friendly summer clothes in natural lighting, muted earth tones, outdoor setting with natural elements

## EXAMPLE 2:
Struggling with complex cloud operations? TechFlow's Cloud Management Platform helps enterprises reduce operational costs by 40% while improving deployment speed by 3x.
Our latest platform update introduces AI-powered optimization and predictive scaling - ensuring your infrastructure runs at peak efficiency.
Ready to streamline your cloud operations? Book a demo: [Link]
Image Prompt: Clean, minimalist illustration showing cloud infrastructure optimization, using simple geometric shapes and a blue-white color palette, emphasizing efficiency and flow

# CONSTRAINTS:

- Always match brand voice and style
- Use emojis and hashtags only when specified
- Generate image prompts that align with brand guidelines
`;
