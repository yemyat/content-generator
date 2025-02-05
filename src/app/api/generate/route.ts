import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { generateFormSchema } from "~/lib/schemas/generate-form-schema";
import { CONTENT_GENERATION_PROMPT } from "~/lib/prompts/content-generation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown;
    const validatedData = generateFormSchema.parse(body);

    const stream = streamObject({
      model: google("gemini-2.0-flash-exp"),
      schema: z.object({
        post: z.string(),
        imagePrompt: z.string(),
      }),
      system: CONTENT_GENERATION_PROMPT,
      prompt: `
        Generate a social media post and image prompt for the following brief:
        ${JSON.stringify(validatedData)}

        Write in burmese like Don Draper.
      `,
    });

    return stream.toTextStreamResponse();
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}
