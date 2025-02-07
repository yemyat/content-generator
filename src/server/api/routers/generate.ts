import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { generateVisualSchema } from "~/lib/schemas/generate-visual-schema";
import { z } from "zod";
import { fal } from "@fal-ai/client";
import { env } from "~/env";
import { generatePostSchema } from "~/lib/schemas/generate-post-schema";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { CONTENT_GENERATION_PROMPT } from "~/lib/prompts/content-generation";

const recraftV3OutputSchema = z.object({
  images: z.array(z.string()),
});

fal.config({
  credentials: env.FAL_API_KEY,
});

export const generateRouter = createTRPCRouter({
  generateVisual: protectedProcedure
    .input(generateVisualSchema)
    .output(recraftV3OutputSchema)
    .mutation(async ({ input }) => {
      try {
        console.log("Generating visual...");
        const result = await fal.subscribe("fal-ai/recraft-v3", {
          input: {
            prompt: input.imagePrompt,
            image_size: {
              width: 2048,
              height: 1152,
            },
          },
          logs: true,
        });
        console.log("Visual generated", JSON.stringify(result, null, 2));

        // Extract image URLs from the response
        const imageUrls = result.data.images?.map((image) => {
          if (!image || typeof image.url !== "string") {
            throw new Error("Invalid image data in response");
          }
          return image.url;
        });

        if (!imageUrls?.length) {
          throw new Error("No valid images were generated");
        }

        return {
          images: imageUrls,
        };
      } catch (error) {
        console.error("Generation error:", error);
        throw error;
      }
    }),

  generatePost: protectedProcedure
    .input(generatePostSchema)
    // .output(recraftV3OutputSchema)
    .mutation(async ({ input }) => {
      try {
        console.log("Generating post...");
        const stream = await generateText({
          model: google("gemini-2.0-flash-exp", {
            safetySettings: [
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_NONE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_NONE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_NONE",
              },
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_NONE",
              },
            ],
          }),
          system: CONTENT_GENERATION_PROMPT,
          temperature: 2,
          prompt: `
            Generate a social media post for the following brief:

            # Key points to include in the post:
            ${input.keyPoints}
            
            # Writing style:
            ${input.customStyle ? `${input.customStyle}` : input.writingStyle}

            # Copy length:
            ${input.copyLength}
    
            Write like a burmese Don Draper in the local language.

            Respond in markdown.
          `,
        });

        return {
          post: stream.text,
        };
      } catch (error) {
        console.error("Generation error:", error);
        throw error;
      }
    }),
});
