import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { generateVisualSchema } from "~/lib/schemas/generate-visual-schema";
import { z } from "zod";
import { fal } from "@fal-ai/client";
import { env } from "~/env";
import { generatePostSchema } from "~/lib/schemas/generate-post-schema";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { generateDynamicPrompt } from "~/lib/prompts/dynamic-prompt";
import { CONTENT_GENERATION_SYSTEM_PROMPT } from "~/lib/prompts/system-prompt";
import { safetyCheck } from "~/lib/safety";
import { auth } from "@clerk/nextjs/server";

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
    .mutation(async ({ input }) => {
      try {
        const { userId } = await auth();

        if (!userId) {
          throw new Error("Unauthorized");
        }

        const safetyCheckResult = await safetyCheck(
          [
            {
              role: "user",
              content: JSON.stringify(input),
              id: "",
            },
          ],
          userId,
        );

        if (safetyCheckResult && !safetyCheckResult.isSafe) {
          throw new Error(safetyCheckResult.unsafeResponse);
        }

        console.log("Generating post...");
        const prompt = generateDynamicPrompt(input);
        const stream = await generateText({
          model: google("gemini-2.0-flash-thinking-exp-01-21", {
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
          temperature: 2,
          system: CONTENT_GENERATION_SYSTEM_PROMPT,
          prompt,
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
