import { type GeneratePostFormData } from "~/lib/schemas/generate-post-schema";

const CONTENT_TYPE_CONTEXT = {
  "Social Media Post": {
    format: {
      English:
        "Create a social media post that is concise, engaging, and optimized for social sharing. Include appropriate emojis and hashtags where relevant.",
      Burmese:
        "လူမှုကွန်ရက်တွင် မျှဝေရန် သင့်လျော်ပြီး စိတ်ဝင်စားဖွယ်ကောင်းသော ပို့စ်တိုတစ်ခု ဖန်တီးပါ။ သင့်လျော်သော အီမိုဂျီများနှင့် ဟက်ရှ်တက်များကို ထည့်သွင်းပါ။",
    },
    constraints: {
      English: [
        "Must be attention-grabbing from the first line",
        "Include a clear call-to-action",
        "Use short paragraphs and natural breaks",
        "Incorporate relevant emojis and hashtags naturally",
      ],
      Burmese: [
        "ပထမစာကြောင်းကတည်းက အာရုံစိုက်မိစေရမည်",
        "ရှင်းလင်းသော လုပ်ဆောင်ရန် တိုက်တွန်းချက် ပါဝင်ရမည်",
        "စာပိုဒ်တိုများနှင့် သဘာဝကျသော ရပ်နားမှုများကို အသုံးပြုရမည်",
        "သင့်လျော်သော အီမိုဂျီများနှင့် ဟက်ရှ်တက်များကို သဘာဝကျကျ ထည့်သွင်းရမည်",
      ],
    },
  },
  "Long-form Article": {
    format: {
      English:
        "Create a well-structured article with clear sections, engaging headings, and a logical flow of information.",
      Burmese:
        "ရှင်းလင်းသော အပိုင်းများ၊ စိတ်ဝင်စားဖွယ် ခေါင်းစဉ်များ၊ နှင့် ဆီလျော်သော အချက်အလက်စီးဆင်းမှုဖြင့် ကောင်းမွန်စွာ ဖွဲ့စည်းထားသော ဆောင်းပါးတစ်ပုဒ် ဖန်တီးပါ။",
    },
    constraints: {
      English: [
        "Include a compelling introduction",
        "Break content into clear sections with subheadings",
        "Maintain consistent tone throughout",
        "End with a strong conclusion or call-to-action",
      ],
      Burmese: [
        "ဆွဲဆောင်မှုရှိသော နိဒါန်း ပါဝင်ရမည်",
        "အကြောင်းအရာကို ခွဲခေါင်းစဉ်များဖြင့် ရှင်းလင်းသော အပိုင်းများအဖြစ် ခွဲခြားရမည်",
        "တစ်လျှောက်လုံး တသမတ်တည်းဖြစ်သော ရေးဟန်ကို ထိန်းသိမ်းရမည်",
        "အားကောင်းသော နိဂုံး သို့မဟုတ် လုပ်ဆောင်ရန် တိုက်တွန်းချက်ဖြင့် အဆုံးသတ်ရမည်",
      ],
    },
  },
  Email: {
    format: {
      English:
        "Create an email that is professional, well-structured, and drives the desired action.",
      Burmese:
        "ပရော်ဖက်ရှင်နယ်ဆန်ပြီး ကောင်းမွန်စွာ ဖွဲ့စည်းထားကာ လိုလားသော လုပ်ဆောင်ချက်ကို ဖြစ်ပေါ်စေသော အီးမေးလ်တစ်စောင် ဖန်တီးပါ။",
    },
    constraints: {
      English: [
        "Include a clear subject line suggestion",
        "Start with a personable greeting",
        "Use professional formatting with clear paragraphs",
        "End with a specific call-to-action and professional signature",
      ],
      Burmese: [
        "ရှင်းလင်းသော အကြောင်းအရာခေါင်းစဉ် အကြံပြုချက် ပါဝင်ရမည်",
        "ရင်းနှီးသော နှုတ်ခွန်းဆက်စကားဖြင့် စတင်ရမည်",
        "ရှင်းလင်းသော စာပိုဒ်များဖြင့် ပရော်ဖက်ရှင်နယ် ဖော်မတ်ကို အသုံးပြုရမည်",
        "တိကျသော လုပ်ဆောင်ရန် တိုက်တွန်းချက်နှင့် ပရော်ဖက်ရှင်နယ် လက်မှတ်ဖြင့် အဆုံးသတ်ရမည်",
      ],
    },
  },
} as const;

const LENGTH_GUIDELINES = {
  "Short Post (approx. 50 words)": {
    English:
      "Keep the content very concise, around 50 words or 280 characters.",
    Burmese:
      "အကြောင်းအရာကို အလွန်တိုတောင်းအောင် ထားပါ၊ စကားလုံး ၅၀ ခန့် သို့မဟုတ် စာလုံး ၂၈၀ ခန့်။",
  },
  "Medium Post (approx. 150 words)": {
    English: "Aim for a medium-length post of approximately 150 words.",
    Burmese: "စကားလုံး ၁၅၀ ခန့်ရှိသော အလယ်အလတ်အရှည် ပို့စ်တစ်ခုကို ရည်ရွယ်ပါ။",
  },
  "Long Post (approx. 300 words)": {
    English:
      "Create a detailed post of about 300 words, suitable for platforms like LinkedIn or Facebook.",
    Burmese:
      "LinkedIn သို့မဟုတ် Facebook ကဲ့သို့သော ပလက်ဖောင်းများအတွက် သင့်လျော်သော စကားလုံး ၃၀၀ ခန့်ရှိ အသေးစိတ် ပို့စ်တစ်ခု ဖန်တီးပါ။",
  },
  "Short Article (500 words)": {
    English: "Write a concise article of approximately 500 words.",
    Burmese: "စကားလုံး ၅၀၀ ခန့်ရှိ တိုတောင်းသော ဆောင်းပါးတစ်ပုဒ် ရေးပါ။",
  },
  "Medium Article (1000 words)": {
    English: "Create a comprehensive article of about 1000 words.",
    Burmese: "စကားလုံး ၁၀၀၀ ခန့်ရှိ ပြည့်စုံသော ဆောင်းပါးတစ်ပုဒ် ဖန်တီးပါ။",
  },
  "Long Article (2000+ words)": {
    English: "Develop an in-depth article of 2000 words or more.",
    Burmese:
      "စကားလုံး ၂၀၀၀ သို့မဟုတ် ထို့ထက်ပို၍ အသေးစိတ်ကျသော ဆောင်းပါးတစ်ပုဒ် ရေးသားပါ။",
  },
} as const;

// Example-based style guidance for each writing style
const STYLE_EXAMPLES = {
  Formal: {
    English: {
      good: [
        "We are pleased to announce the successful implementation of our new strategic initiative.",
        "The quarterly results demonstrate a significant increase in market share.",
      ],
      bad: [
        "Hey guys! We've got some awesome news about our cool new thing!",
        "OMG, our numbers are through the roof! 🚀",
      ],
    },
    Burmese: {
      good: [
        "ကျွန်ုပ်တို့၏ မဟာဗျူဟာမြောက် အစီအစဉ်သစ်ကို အောင်မြင်စွာ အကောင်အထည်ဖော်နိုင်ခဲ့ကြောင်း ဝမ်းမြောက်စွာ အသိပေးအပ်ပါသည်။",
        "သုံးလပတ် ရလဒ်များအရ ဈေးကွက်ရှယ်ယာ သိသိသာသာ တိုးတက်လာကြောင်း တွေ့ရှိရပါသည်။",
      ],
      bad: [
        "ဟေ့ သူငယ်ချင်းတို့! ငါတို့ရဲ့ ခိုးတဲ့ အရာသစ်အကြောင်း သတင်းကောင်းလေး ရှိတယ်!",
        "အိုး မိုင်ဂေါ့! ငါတို့ရဲ့ နံပါတ်တွေ မိုးပေါ်ရောက်နေပြီ! 🚀",
      ],
    },
  },
  Friendly: {
    English: {
      good: [
        "Hi everyone! We're excited to share some great news with our amazing community 😊",
        "Thanks for being part of our journey - we couldn't do this without you!",
      ],
      bad: [
        "As per our previous correspondence, we hereby notify all relevant parties...",
        "The aforementioned metrics indicate a positive trajectory in Q3...",
      ],
    },
    Burmese: {
      good: [
        "မင်္ဂလာပါ လူကြီးမင်းတို့! ကျွန်တော်တို့ရဲ့ အံ့ဩဖွယ် အသိုင်းအဝိုင်းကြီးနဲ့ သတင်းကောင်းလေးတွေ မျှဝေချင်လို့ပါ 😊",
        "ကျွန်တော်တို့ရဲ့ ခရီးလမ်းမှာ ပါဝင်ပေးတဲ့အတွက် ကျေးဇူးတင်ပါတယ် - သင်တို့မပါရင် ဒါတွေဖြစ်လာမှာ မဟုတ်ပါဘူး!",
      ],
      bad: [
        "ယခင်ဆက်သွယ်ရေးအရ၊ သက်ဆိုင်ရာ ပါတီအားလုံးကို ဤနည်းဖြင့် အကြောင်းကြားအပ်ပါသည်...",
        "အထက်ဖော်ပြပါ တိုင်းတာချက်များအရ တတိယသုံးလပတ်တွင် အပြုသဘောဆောင်သော လမ်းကြောင်းကို ညွှန်ပြနေပါသည်...",
      ],
    },
  },
} as const;

type LengthGuidelineKey = keyof typeof LENGTH_GUIDELINES;
type WritingStyleKey = keyof typeof STYLE_EXAMPLES;

export function generateDynamicPrompt(input: GeneratePostFormData): string {
  const contentTypeDetails = CONTENT_TYPE_CONTEXT[input.contentType];
  const lengthGuideline =
    LENGTH_GUIDELINES[input.contentLength as LengthGuidelineKey]?.[
      input.language
    ] ?? "";

  let styleSection = "";
  if (input.writingStyle !== "Custom") {
    const styleExamples =
      STYLE_EXAMPLES[input.writingStyle as WritingStyleKey]?.[input.language];
    if (styleExamples) {
      styleSection = `
# STYLE EXAMPLES
✅ Good examples:
${styleExamples.good?.map((ex) => `- ${ex}`).join("\n") ?? ""}

❌ Bad examples:
${styleExamples.bad?.map((ex) => `- ${ex}`).join("\n") ?? ""}`;
    }
  }

  return `
Generate a well-structured content based on the following brief:

# CONTENT TYPE
${contentTypeDetails.format[input.language]}

# FORMAT CONSTRAINTS
${contentTypeDetails.constraints[input.language].map((constraint) => `- ${constraint}`).join("\n")}

# LENGTH GUIDELINE
${lengthGuideline}

# TONE AND STYLE
${input.customStyle ?? ""}${styleSection}

# KEY POINTS TO INCLUDE
${input.keyPoints}

# OUTPUT REQUIREMENTS
1. Follow the specified content type format strictly
2. Adhere to the length guidelines
3. Maintain consistent tone and style throughout
4. Incorporate all key points naturally
5. Ensure the content is engaging and well-structured
6. Write in ${input.language} language

Please generate the content based on these specifications.
`;
}
