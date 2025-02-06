"use client";

import Image from "next/image";
import { GenerateForm } from "~/components/generate-form";
import {
  type GenerateFormData,
  generateFormSchema,
} from "~/lib/schemas/generate-form-schema";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import type { RouterOutputs } from "~/trpc/react";
import { experimental_useObject as useObject } from "ai/react";
import { z } from "zod";

const STORAGE_KEY = "lastSubmittedFormData";
const DRAFT_STORAGE_KEY = "draftFormData";

const defaultFormValues: GenerateFormData = {
  brandSettings: {
    brandName: "",
    brandVoice: "Professional",
    brandKeywords: "",
    visualBrandStyle: "Modern & Clean",
    brandColors: [],
  },
  campaignInfo: {
    campaignName: "",
    campaignGoal: "Brand Awareness",
    targetAudience: "",
  },
  contentDetails: {
    productOrService: "",
    keyMessage: "",
    callToAction: "Learn More",
  },
  imageDetails: {
    imageStyle: "Modern & Clean",
    visualKeywords: "",
    aspectRatio: "1:1",
  },
  copySettings: {
    copyLength: "Medium",
    includeHashtags: false,
    includeEmojis: false,
    specificKeywords: "",
  },
};

export default function Generator() {
  const [defaultValues, setDefaultValues] =
    useState<GenerateFormData>(defaultFormValues);
  const [generatedVisual, setGeneratedVisual] = useState<{
    images: string[];
  } | null>(null);

  const {
    object: generatedContent,
    submit: generateContent,
    isLoading: isGeneratingContent,
  } = useObject({
    api: "/api/generate",
    schema: z.object({
      post: z.string(),
      imagePrompt: z.string(),
    }),
    onFinish: () => {
      toast.success("Content generated successfully!", {
        description: "Check out your generated content",
      });
    },
    onError: (error: Error) => {
      toast.error("Failed to generate content", {
        description: error.message,
      });
    },
  });

  const generateVisual = api.post.generateVisual.useMutation({
    onSuccess: (data) => {
      setGeneratedVisual(data);
      toast.success("Visual generated successfully!", {
        description: "Check out your generated visual",
      });
    },
    onError: (error) => {
      toast.error("Failed to generate visual", {
        description: error.message,
      });
    },
  });

  // Load saved form data on component mount
  useEffect(() => {
    const loadSavedData = () => {
      // First try to load draft
      const draftData = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (draftData) {
        try {
          const parsedData = JSON.parse(draftData) as GenerateFormData;
          const validatedData = generateFormSchema.parse(parsedData);
          setDefaultValues(validatedData);
          toast.info("Draft loaded", {
            description: "Your previous draft has been loaded",
          });
          return;
        } catch (error) {
          console.error("Failed to parse draft form data:", error);
          localStorage.removeItem(DRAFT_STORAGE_KEY);
        }
      }

      // If no draft, try to load last submitted data
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData) as GenerateFormData;
          const validatedData = generateFormSchema.parse(parsedData);
          setDefaultValues(validatedData);
          toast.info("Previous data loaded", {
            description: "Your last submission has been loaded",
          });
        } catch (error) {
          console.error("Failed to parse saved form data:", error);
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    };

    loadSavedData();
  }, []);

  const handleSubmit = async (data: GenerateFormData) => {
    try {
      // Save form data to local storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Clear draft after successful submission
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      // Update the default values
      setDefaultValues(data);
      // Submit for generation
      generateContent(data);
    } catch (error) {
      toast.error("Failed to generate content", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  const handleSaveDraft = (data: GenerateFormData) => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
      setDefaultValues(data);
      toast.success("Draft saved successfully!", {
        description: "Your progress has been saved",
      });
    } catch (error) {
      console.error("Failed to save draft:", error);
      toast.error("Failed to save draft", {
        description: "Please try again",
      });
    }
  };

  const handleGenerateVisual = () => {
    if (!generatedContent?.imagePrompt) return;
    generateVisual.mutate({ imagePrompt: generatedContent.imagePrompt });
  };

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-[30%_1fr_1fr]">
      <div className="overflow-auto border-b border-r border-gray-200 md:border-b-0">
        <div className="flex h-full w-full">
          <GenerateForm
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
            isLoading={isGeneratingContent}
            defaultValues={defaultValues}
          />
        </div>
      </div>
      <div className="overflow-auto border-r">
        <div className="flex h-full w-full">
          <div className="flex h-full w-full">
            {generatedContent && (
              <div className="space-y-4 p-4">
                <h2 className="text-lg font-semibold">Generated Content</h2>
                <div className="space-y-2">
                  <h3 className="font-medium">Post</h3>
                  <p className="whitespace-pre-wrap rounded-md border p-2">
                    {generatedContent.post}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Image Prompt</h3>
                  <p className="whitespace-pre-wrap rounded-md border p-2">
                    {generatedContent.imagePrompt}
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={handleGenerateVisual}
                  disabled={generateVisual.status === "pending"}
                >
                  <Sparkles className="mr-2" size={16} />
                  {generateVisual.status === "pending"
                    ? "Generating Visual..."
                    : "Generate Visual"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="overflow-auto border-r">
        <div className="flex h-full w-full">
          <div className="flex h-full w-full">
            {generatedVisual?.images[0] && (
              <div className="space-y-4 p-4">
                <h2 className="text-lg font-semibold">Generated Visual</h2>
                <div className="space-y-2">
                  <Image
                    src={generatedVisual.images[0]}
                    alt="Generated visual"
                    className="w-full rounded-lg shadow-lg"
                    width={2048}
                    height={1152}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
