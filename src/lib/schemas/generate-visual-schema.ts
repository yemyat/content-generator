import { z } from "zod";

export const generateVisualSchema = z.object({
  imagePrompt: z.string(),
});
