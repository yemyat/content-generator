import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateFormSchema } from "~/lib/schemas/generate-form-schema";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { CONTENT_GENERATION_PROMPT } from "~/lib/prompts/content-generation";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(generateFormSchema)
    .mutation(async ({ input }) => {
      try {
        const { object } = await generateObject({
          model: google("gemini-2.0-flash-exp"),
          schema: z.object({
            post: z.string(),
            imagePrompt: z.string(),
          }),
          system: CONTENT_GENERATION_PROMPT,
          prompt: `
        Generate a social media post and image prompt for the following brief:
        ${JSON.stringify(input)}
        `,
        });

        return object;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
});
