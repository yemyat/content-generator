import { z } from "zod";

export const contentTypeOptions = [
  "Long-form Article",
  "Social Media Post",
  "Email",
] as const;

export const articleLengthOptions = [
  "Brief Overview (approx. 250 words)",
  "Standard Blog Post (approx. 500 words)",
  "In-depth Article (approx. 1000 words)",
  "Feature Article (approx. 1500 words)",
] as const;

export const socialMediaLengthOptions = [
  "Very Short - Tweet-like (approx. 30 words)",
  "Short Post (approx. 75 words)",
  "Medium Post (approx. 150 words)",
  "Engaging Post (approx. 250 words)",
  "Detailed Story (approx. 300+ words)",
  "Thread/Series (Multiple Posts)",
] as const;

export const emailLengthOptions = [
  "Subject Line & Snippet (approx. 10 words)",
  "Brief Email (approx. 75 words)",
  "Standard Email (approx. 150 words)",
  "Detailed Email (approx. 250 words)",
] as const;

export const writingStyleOptions = [
  "Formal",
  "Friendly",
  "Excited",
  "Humorous",
  "Informative",
  "Urgent",
  "Luxury",
  "Playful",
  "Serious",
  "Custom",
] as const;

export const languageOptions = ["English", "Burmese"] as const;

export const writingStylePreviews: Record<
  string,
  Record<(typeof languageOptions)[number], string>
> = {
  Formal: {
    English:
      "Our comprehensive solutions deliver measurable results through strategic implementation and industry best practices.",
    Burmese:
      "ကျွန်ုပ်တို့၏ ဘက်စုံဖြေရှင်းချက်များသည် မဟာဗျူဟာမြောက် အကောင်အထည်ဖော်မှုနှင့် လုပ်ငန်းအကောင်းဆုံးအလေ့အထများမှတစ်ဆင့် တိုင်းတာနိုင်သော ရလဒ်များကို ပေးဆောင်ပါသည်။",
  },
  Friendly: {
    English:
      "Hi there! We're so glad you're here. Let us share some exciting updates that we think you'll love! 😊",
    Burmese:
      "မင်္ဂလာပါ! သင့်ကို ဒီမှာတွေ့ရတာ ဝမ်းသာပါတယ်။ သင်ကြိုက်မယ်လို့ ထင်တဲ့ စိတ်လှုပ်ရှားဖွယ် အပ်ဒိတ်တွေကို မျှဝေပေးပါရစေ! 😊",
  },
  Excited: {
    English:
      "We're absolutely thrilled to announce this game-changing development! 🎉 You won't believe what's coming next!",
    Burmese:
      "ဒီဂိမ်းချိန်းဂျင်း ဖွံ့ဖြိုးတိုးတက်မှုကို ကြေညာရတာ တကယ်စိတ်လှုပ်ရှားမိပါတယ်! 🎉 နောက်ထပ်ဘာတွေလာဦးမလဲဆိုတာ သင်ယုံကြည်လို့ရမှာ မဟုတ်ပါဘူး!",
  },
  Humorous: {
    English:
      "Warning: Reading this content may cause unexpected bursts of laughter and spontaneous happiness. Side effects may include smiling 😄",
    Burmese:
      "သတိပေးချက်: ဒီအကြောင်းအရာကို ဖတ်ခြင်းက မမျှော်လင့်ထားတဲ့ ရယ်မောခြင်းနဲ့ ရုတ်တရက် ပျော်ရွှင်မှုတွေ ဖြစ်စေနိုင်ပါတယ်။ ဘေးထွက်ဆိုးကျိုးတွေထဲမှာ အပြုံးတွေ ပါဝင်နိုင်ပါတယ် 😄",
  },
  Informative: {
    English:
      "Research indicates that 87% of businesses benefit from this approach, leading to a 2.5x increase in efficiency metrics.",
    Burmese:
      "သုတေသနများအရ စီးပွားရေးလုပ်ငန်း ၈၇% သည် ဤချဉ်းကပ်မှုမှ အကျိုးကျေးဇူးရရှိပြီး၊ ထိရောက်မှုတိုင်းတာချက်များတွင် ၂.၅ ဆ တိုးတက်လာကြောင်း တွေ့ရှိရပါသည်။",
  },
  Urgent: {
    English:
      "⚡ Time-sensitive update: Don't miss this critical opportunity. Act now to secure your advantage before the deadline!",
    Burmese:
      "⚡ အချိန်အကန့်အသတ်ရှိ အပ်ဒိတ်: ဒီအရေးကြီးတဲ့ အခွင့်အရေးကို မလွတ်ပါစေနဲ့။ သတ်မှတ်ချိန် မကုန်ခင် သင့်အခွင့်အရေးကို အခုပဲ ရယူလိုက်ပါ!",
  },
  Luxury: {
    English:
      "Indulge in an extraordinary experience crafted with unparalleled attention to detail and refined elegance.",
    Burmese:
      "အသေးစိတ်အချက်များကို မပြတ်ဂရုစိုက်ထားပြီး သပ်ရပ်ခန့်ညားမှုဖြင့် ဖန်တီးထားသော ထူးခြားသည့် အတွေ့အကြုံကို ခံစားလိုက်ပါ။",
  },
  Playful: {
    English:
      "Ready for something fun? 🎮 Let's dive into this awesome adventure together! Spoiler alert: It's going to be amazing!",
    Burmese:
      "ပျော်စရာတစ်ခုခုအတွက် အဆင်သင့်ဖြစ်ပြီလား? 🎮 ဒီအံ့ဩဖွယ် စွန့်စားခန်းထဲကို အတူတူ ဆင်းကြရအောင်! စပွိုင်လာသတိပေးချက်: တော်တော်လေး အံ့ဩစရာကောင်းမှာပါ!",
  },
  Serious: {
    English:
      "This matter requires immediate attention. We must address these critical factors to ensure optimal outcomes.",
    Burmese:
      "ဤကိစ္စသည် ချက်ချင်းအာရုံစိုက်ရန် လိုအပ်ပါသည်။ အကောင်းဆုံးရလဒ်များ ရရှိစေရန် ဤအရေးကြီးသော အချက်များကို ကိုင်တွယ်ဖြေရှင်းရမည် ဖြစ်ပါသည်။",
  },
  Custom: {
    English: "Create your own unique voice and style!",
    Burmese: "သင့်ကိုယ်ပိုင် ထူးခြားသော အသံနှင့် စတိုင်ကို ဖန်တီးလိုက်ပါ!",
  },
};

export const generatePostSchema = z.object({
  contentType: z.enum(contentTypeOptions),
  contentLength: z.string(),
  writingStyle: z.enum(writingStyleOptions),
  customStyle: z.string().optional(),
  keyPoints: z.string().min(1, "Key points are required"),
  language: z.enum(languageOptions),
});

export type GeneratePostFormData = z.infer<typeof generatePostSchema>;
