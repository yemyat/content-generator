import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateVisualSchema } from "~/lib/schemas/generate-visual-schema";
import { z } from "zod";
import { fal } from "@fal-ai/client";

const recraftV3OutputSchema = z.object({
  images: z.array(z.string()),
});

export const postRouter = createTRPCRouter({
  generateVisual: publicProcedure
    .input(generateVisualSchema)
    .output(recraftV3OutputSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await fal.subscribe("fal-ai/recraft-v3", {
          input: {
            prompt: input.imagePrompt,
            image_size: {
              width: 2048,
              height: 1152,
            },
          },
          logs: false,
        });

        // Extract the first image URL from the response
        const imageUrl = result.data.images?.[0];
        if (!imageUrl || typeof imageUrl !== "string") {
          throw new Error("No valid image was generated");
        }

        return {
          images: [imageUrl],
        };
      } catch (error) {
        console.error("Generation error:", error);
        throw error;
      }
    }),
});
