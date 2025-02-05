"use client";

import { GenerateForm } from "~/components/generate-form";
import { type GenerateFormData } from "~/lib/schemas/generate-form-schema";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const STORAGE_KEY = "lastSubmittedFormData";
const DRAFT_STORAGE_KEY = "draftFormData";

export default function Generator() {
  const [defaultValues, setDefaultValues] = useState<
    GenerateFormData | undefined
  >();

  // Load saved form data on component mount
  useEffect(() => {
    const loadSavedData = () => {
      // First try to load draft
      const draftData = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (draftData) {
        try {
          const parsedData = JSON.parse(draftData) as GenerateFormData;
          setDefaultValues(parsedData);
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
          setDefaultValues(parsedData);
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

  const createPost = api.post.create.useMutation({
    onSuccess: (result) => {
      // Save form data to local storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
      // Clear draft after successful submission
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      // Update the default values
      setDefaultValues(result.data);

      toast.success("Form submitted successfully!", {
        description: "Your content is being generated...",
      });
    },
    onError: (error) => {
      toast.error("Failed to submit form", {
        description: error.message,
      });
    },
  });

  const handleSubmit = (data: GenerateFormData) => {
    createPost.mutate(data);
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

  return (
    <div className="flex w-full flex-col md:w-2/5 md:flex-row">
      <div className="w-full overflow-auto border-b border-r border-gray-200 md:w-1/2 md:border-b-0">
        <div className="flex h-full w-full">
          <GenerateForm
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
            isLoading={createPost.status === "pending"}
            defaultValues={defaultValues}
          />
        </div>
      </div>
      <div className="w-full overflow-auto md:w-1/2">
        <div className="flex h-full w-full">
          <div className="flex h-full w-full">
            {/* Result preview will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
