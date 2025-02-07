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
      "Esteemed colleagues, our data-driven solutions guarantee substantial advancements in operational efficacy and strategic scalability.",
    Burmese:
      "လေးစားအပ်ပါသော လုပ်ဖော်ကိုင်ဖက်များခင်ဗျား၊ ကျွန်ုပ်တို့၏ ဒေတာကို အခြေခံထားသော ဖြေရှင်းချက်များသည် လုပ်ငန်းစွမ်းဆောင်ရည် ထိရောက်မှုနှင့် မဟာဗျူဟာမြောက် တိုးချဲ့နိုင်မှုတို့တွင် သိသာထင်ရှားသော တိုးတက်မှုများကို အာမခံပါသည်။",
  },
  Friendly: {
    English:
      "Hey there, friend! 👋  Super excited to share some fun updates with you! Hope you're having a lovely day! 😊 Let's chat!",
    Burmese:
      "ဟေ့ သူငယ်ချင်း! 👋 အရမ်းပျော်စရာကောင်းတဲ့ အပ်ဒိတ်တချို့ကို မင်းနဲ့အတူ မျှဝေချင်လို့ စိတ်လှုပ်ရှားနေတာ! ဒီနေ့ မင်း ပျော်ရွှင်စရာကောင်းတဲ့ နေ့လေးတစ်နေ့ ဖြစ်ပါစေလို့ မျှော်လင့်ပါတယ်! 😊 စကားပြောကြရအောင်!",
  },
  Excited: {
    English:
      "OMG! 🎉 HUGE NEWS! Prepare to be amazed! This is absolutely revolutionary! 🚀 You WON'T believe your eyes! 🤩",
    Burmese:
      "OMG! 🎉 သတင်းကြီးကြီး!! အံ့အားသင့်ဖို့ ပြင်ဆင်ထား! ဒါက လုံးဝ တော်လှန်ပြောင်းလဲပစ်နိုင်တာပဲ! 🚀 ခင်ဗျား မျက်စိကိုတောင် မယုံနိုင်ဖြစ်လိမ့်မယ်! 🤩",
  },
  Humorous: {
    English:
      "Why did the software engineer bring pizza to work? Because he wanted a slice of pi! 😂 Get it? ...Anyway, check out our updates!",
    Burmese:
      "ဘာလို့ ဆော့ဖ်ဝဲလ် အင်ဂျင်နီယာက အလုပ်ကို ပီဇာ သယ်လာတာလဲ? ဘာလို့လဲဆိုတော့ သူက pi တစ်စိတ်တစ်ပိုင်းကို လိုချင်လို့လေ! 😂 နားလည်လား? ...ထားပါတော့၊ ကျွန်တော်တို့ရဲ့ အပ်ဒိတ်တွေကို လေ့လာကြည့်ပါဦး!",
  },
  Informative: {
    English:
      "Informational Bulletin: Extensive research indicates a direct correlation between user engagement and regularly updated content. Explore further insights in our resources.",
    Burmese:
      "အသိပေးစာ: ကျယ်ကျယ်ပြန့်ပြန့် သုတေသနပြုချက်များအရ သုံးစွဲသူ၏ ပါဝင်ပတ်သက်မှုနှင့် ပုံမှန် အပ်ဒိတ်လုပ်ထားသော အကြောင်းအရာအကြား တိုက်ရိုက်ဆက်စပ်မှု ရှိကြောင်း ဖော်ပြထားပါသည်။ ကျွန်ုပ်တို့၏ အရင်းအမြစ်များတွင် ထပ်မံလေ့လာပါ။",
  },
  Urgent: {
    English:
      "🚨FLASH ALERT! CRITICAL! Immediate action REQUIRED! OFFER ENDS SOON! Do not delay! ACT NOW or miss out FOREVER! ⏳",
    Burmese:
      "🚨ချက်ချင်း သတိပေးချက်! အရေးကြီး!! ချက်ချင်း လုပ်ဆောင်ရန် လိုအပ်သည်! ကမ်းလှမ်းချက် မကြာမီ ပြီးဆုံးတော့မည်! နောက်မကျပါစေနဲ့! အခုပဲ လုပ်ဆောင်ပါ၊ မဟုတ်ရင် ထာဝရ လွဲချော်သွားပါလိမ့်မယ်! ⏳",
  },
  Luxury: {
    English:
      "Experience the epitome of bespoke digital craftsmanship. Immerse yourself in unparalleled sophistication and elevate your senses.",
    Burmese:
      "စိတ်ကြိုက် ဒစ်ဂျစ်တယ် လက်ရာမြောက်မှု၏ အထွတ်အထိပ်ကို ခံစားလိုက်ပါ။ မတူနိုင်သော ခေတ်မီဆန်းပြားမှုတွင် နှစ်မြှုပ်ပြီး လူကြီးမင်း၏ အာရုံများကို မြှင့်တင်လိုက်ပါ။",
  },
  Playful: {
    English:
      "Annyeonghaseyo, sweetie! 😉 Auntie's got something fun for you!  Come play and discover amazing surprises! You know you want to! 😘",
    Burmese:
      "Annyeonghaseyo, ချစ်လေး! 😉 အန်တီက မင်းအတွက် ပျော်စရာတစ်ခုခု ပြင်ဆင်ထားတယ်! လာကစားပြီး အံ့ဩစရာတွေ ရှာဖွေကြည့်! မင်း လိုချင်မှန်း အန်တီသိတယ်နော်! 😘",
  },
  Serious: {
    English:
      "This demands immediate and unwavering focus. We will address these key issues with utmost precision and resolve. Expect tangible results.",
    Burmese:
      "ဤကိစ္စသည် ချက်ချင်းနှင့် မယိမ်းယိုင်သော အာရုံစူးစိုက်မှုကို တောင်းဆိုပါသည်။ ကျွန်ုပ်တို့သည် ဤအဓိက ပြဿနာများကို အလွန်တိကျမှုနှင့် ပြတ်ပြတ်သားသားဖြင့် ကိုင်တွယ်ဖြေရှင်းသွားမည်ဖြစ်သည်။ လက်တွေ့ကျသော ရလဒ်များကို မျှော်လင့်ပါ။",
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
