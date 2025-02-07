import { type GeneratePostFormData } from "~/lib/schemas/generate-post-schema";

const CONTENT_TYPE_CONTEXT = {
  "Social Media Post": {
    format:
      "Create a social media post that is concise, engaging, and optimized for social sharing. Include appropriate emojis and hashtags where relevant.",
    constraints: [
      "Must be attention-grabbing from the first line",
      "Include a clear call-to-action",
      "Use short paragraphs and natural breaks",
      "Incorporate relevant emojis and hashtags naturally",
    ],
  },
  "Long-form Article": {
    format:
      "Create a well-structured article with clear sections, engaging headings, and a logical flow of information.",
    constraints: [
      "Include a compelling introduction",
      "Break content into clear sections with subheadings",
      "Maintain consistent tone throughout",
      "End with a strong conclusion or call-to-action",
    ],
  },
  Email: {
    format:
      "Create an email that is professional, well-structured, and drives the desired action.",
    constraints: [
      "Include a clear subject line suggestion",
      "Start with a personable greeting",
      "Use professional formatting with clear paragraphs",
      "End with a specific call-to-action and professional signature",
    ],
  },
} as const;

const LENGTH_GUIDELINES = {
  // Social Media Post lengths
  "Short Post (approx. 50 words)":
    "Keep the content very concise, around 50 words or 280 characters.",
  "Medium Post (approx. 150 words)":
    "Aim for a medium-length post of approximately 150 words.",
  "Long Post (approx. 300 words)":
    "Create a detailed post of about 300 words, suitable for platforms like LinkedIn or Facebook.",

  // Article lengths
  "Short Article (500 words)":
    "Write a concise article of approximately 500 words.",
  "Medium Article (1000 words)":
    "Create a comprehensive article of about 1000 words.",
  "Long Article (2000+ words)":
    "Develop an in-depth article of 2000 words or more.",

  // Email lengths
  "Short Email (100 words)":
    "Keep the email brief and to the point, around 100 words.",
  "Standard Email (200 words)":
    "Write a standard-length email of approximately 200 words.",
  "Detailed Email (400 words)": "Create a detailed email of about 400 words.",
} as const;

const STYLE_EXAMPLES = {
  Formal: "Use professional language and maintain a business-appropriate tone.",
  Friendly:
    "Write in a warm, approachable manner while maintaining professionalism.",
  Excited:
    "Use enthusiastic language and convey genuine excitement about the topic.",
  Humorous:
    "Incorporate appropriate humor and light-hearted elements while staying on message.",
  Informative:
    "Focus on delivering clear, factual information in an engaging way.",
  Urgent: "Create a sense of immediacy and importance without being alarmist.",
  Luxury:
    "Employ sophisticated, premium language that conveys exclusivity and high value.",
  Playful:
    "Use a fun, casual tone while maintaining the message's core purpose.",
  Serious: "Maintain a grave, important tone appropriate for weighty subjects.",
} as const;

type LengthGuidelineKey = keyof typeof LENGTH_GUIDELINES;

export function generateDynamicPrompt(input: GeneratePostFormData): string {
  const contentTypeDetails = CONTENT_TYPE_CONTEXT[input.contentType];
  const lengthGuideline =
    LENGTH_GUIDELINES[input.contentLength as LengthGuidelineKey];
  const styleGuidance =
    input.customStyle ??
    (input.writingStyle === "Custom"
      ? input.customStyle
      : STYLE_EXAMPLES[input.writingStyle]);

  return `
Generate a well-structured content based on the following brief:

# CONTENT TYPE
${contentTypeDetails.format}

# FORMAT CONSTRAINTS
${contentTypeDetails.constraints.map((constraint) => `- ${constraint}`).join("\n")}

# LENGTH GUIDELINE
${lengthGuideline}

# TONE AND STYLE
${styleGuidance}

# KEY POINTS TO INCLUDE
${input.keyPoints}

# OUTPUT REQUIREMENTS
1. Follow the specified content type format strictly
2. Adhere to the length guidelines
3. Maintain consistent tone and style throughout
4. Incorporate all key points naturally
5. Ensure the content is engaging and well-structured
6. Write in Burmese language with a Don Draper-like persuasive style

Please generate the content based on these specifications.
`;
}
