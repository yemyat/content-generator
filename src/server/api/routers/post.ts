import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateFormSchema } from "~/lib/schemas/generate-form-schema";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(generateFormSchema)
    .mutation(async ({ input }) => {
      // For now, just return the validated data
      // Later we'll add database operations and AI generation
      return {
        success: true,
        data: input,
      };
    }),
});
