"use client";

import { GenerateForm } from "~/components/generate-form";
import { type GenerateFormData } from "~/lib/schemas/generate-form-schema";

export default function Generator() {
  const handleSubmit = (data: GenerateFormData) => {
    console.log(data);
    // Handle the form data here
  };
  return (
    <div className="flex w-full flex-col md:w-2/5 md:flex-row">
      <div className="w-full overflow-auto border-b border-r border-gray-200 md:w-1/2 md:border-b-0">
        <div className="flex h-full w-full">
          <GenerateForm onSubmit={handleSubmit} />
        </div>
      </div>
      <div className="w-full overflow-auto md:w-1/2">
        <div className="flex h-full w-full">
          <div className="flex h-full w-full"></div>
        </div>
      </div>
    </div>
  );
}
