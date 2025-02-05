"use client";

import { GenerateForm } from "~/components/generate-form";
import { type GenerateFormData } from "~/lib/schemas/generate-form-schema";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const STORAGE_KEY = "lastSubmittedFormData";

export default function Generator() {
  const [defaultValues, setDefaultValues] =
    useState<Partial<GenerateFormData>>();

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as GenerateFormData;
        setDefaultValues(parsedData);
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
        // If there's an error parsing, remove the invalid data
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const createPost = api.post.create.useMutation({
    onSuccess: (result) => {
      // Save form data to local storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));

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

  return (
    <div className="flex w-full flex-col md:w-2/5 md:flex-row">
      <div className="w-full overflow-auto border-b border-r border-gray-200 md:w-1/2 md:border-b-0">
        <div className="flex h-full w-full">
          <GenerateForm
            onSubmit={handleSubmit}
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
