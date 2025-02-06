import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateVisualSchema } from "~/lib/schemas/generate-visual-schema";
import { z } from "zod";
import { fal } from "@fal-ai/client";
import { env } from "~/env";

const recraftV3OutputSchema = z.object({
  images: z.array(z.string()),
});

fal.config({
  credentials: env.FAL_API_KEY,
});

export const postRouter = createTRPCRouter({
  generateVisual: publicProcedure
    .input(generateVisualSchema)
    .output(recraftV3OutputSchema)
    .mutation(async ({ input }) => {
      try {
        console.log("Generating visual...");
        console.log(input.imagePrompt);
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
});
