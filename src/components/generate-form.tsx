"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { Textarea } from "~/components/ui/textarea";
import {
  brandVoiceOptions,
  visualStyleOptions,
  campaignGoalOptions,
  callToActionOptions,
  imageStyleOptions,
  copyLengthOptions,
  aspectRatioOptions,
  generateFormSchema,
  type GenerateFormData,
} from "~/lib/schemas/generate-form-schema";
import type { ZodType } from "zod";
import { Sparkles, Save } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

interface GenerateFormProps {
  onSubmit: (data: GenerateFormData) => void;
  onSaveDraft?: (data: GenerateFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<GenerateFormData>;
}

export function GenerateForm({
  onSubmit,
  onSaveDraft,
  isLoading,
  defaultValues,
}: GenerateFormProps) {
  const form = useForm<GenerateFormData>({
    resolver: zodResolver(generateFormSchema as ZodType<GenerateFormData>),
    defaultValues: defaultValues ?? {
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
    },
  });

  // Reset form when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit(
    (data) => {
      onSubmit(data);
    },
    (errors) => {
      toast.error("Please fix the validation errors", {
        description: "Some required fields need your attention",
        duration: 5000,
      });
      console.log("Form validation errors:", errors);
    },
  );

  const handleSaveDraft = () => {
    const values = form.getValues();
    onSaveDraft?.(values);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col justify-between">
            <Accordion type="single" collapsible className="h-full w-full">
              {/* Section 1: Brand Settings */}
              <AccordionItem value="brand-settings">
                <AccordionTrigger className="p-4">
                  Brand Settings
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-4">
                    <FormField
                      control={form.control}
                      name="brandSettings.brandName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your brand name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="brandSettings.brandVoice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand Voice</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a voice" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {brandVoiceOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="brandSettings.brandKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand Keywords</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Innovative, Sustainable, Reliable"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Separate keywords with commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="brandSettings.visualBrandStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Visual Brand Style</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {visualStyleOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 2: Campaign Goal & Basic Info */}
              <AccordionItem value="campaign-info">
                <AccordionTrigger className="p-4">
                  Campaign Goal & Basic Info
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-4">
                    <FormField
                      control={form.control}
                      name="campaignInfo.campaignName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Summer Sale 2024"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="campaignInfo.campaignGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Goal</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a goal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {campaignGoalOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="campaignInfo.targetAudience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Audience</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Young adults interested in fashion"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 3: Content Focus & Key Message */}
              <AccordionItem value="content-details">
                <AccordionTrigger className="p-4">
                  Content Focus & Key Message
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-4">
                    <FormField
                      control={form.control}
                      name="contentDetails.productOrService"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product/Service/Offer</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., New Summer Dress Collection"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contentDetails.keyMessage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Stay cool and stylish this summer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contentDetails.callToAction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Call to Action</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a CTA" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {callToActionOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 4: Image Style & Details */}
              <AccordionItem value="image-details">
                <AccordionTrigger className="p-4">
                  Image Style & Details
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-4">
                    <FormField
                      control={form.control}
                      name="imageDetails.imageStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image Style</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {imageStyleOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="imageDetails.aspectRatio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aspect Ratio</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select aspect ratio" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {aspectRatioOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the aspect ratio for your image
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="imageDetails.visualKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Visual Keywords</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., People smiling, Product in use"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Separate keywords with commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 5: Copy Length & Format */}
              <AccordionItem value="copy-settings">
                <AccordionTrigger className="p-4">
                  Copy Length & Format
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-4">
                    <FormField
                      control={form.control}
                      name="copySettings.copyLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Copy Length</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select length" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {copyLengthOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="copySettings.includeHashtags"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Include Hashtags</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="copySettings.includeEmojis"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Include Emojis</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="copySettings.specificKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specific Keywords</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter specific keywords to include"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Keywords that must be included in the generated copy
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex w-full flex-col gap-2 p-4">
              <Button type="submit" disabled={isLoading}>
                <Sparkles className="mr-2" size={16} />
                {isLoading ? "Generating..." : "Generate Content"}
              </Button>
              <Button type="button" variant="outline" onClick={handleSaveDraft}>
                <Save className="mr-2" size={16} />
                Save Draft
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
