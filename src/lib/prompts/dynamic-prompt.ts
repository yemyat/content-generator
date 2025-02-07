import { type GeneratePostFormData } from "~/lib/schemas/generate-post-schema";

const CONTENT_TYPE_CONTEXT = {
  "Social Media Post": {
    format:
      "Create a social media post that is concise, engaging, and optimized for social sharing. Include appropriate emojis and hashtags where relevant.",
    constraints: [
      "Must be attention-grabbing from the first line",
      "Include a clear call-to-action",
      "Use short paragraphs and natural breaks",
      "Incorporate relevant emojis and hashtags naturally",
    ],
  },
  "Long-form Article": {
    format:
      "Create a well-structured article with clear sections, engaging headings, and a logical flow of information.",
    constraints: [
      "Include a compelling introduction",
      "Break content into clear sections with subheadings",
      "Maintain consistent tone throughout",
      "End with a strong conclusion or call-to-action",
    ],
  },
  Email: {
    format:
      "Create an email that is professional, well-structured, and drives the desired action.",
    constraints: [
      "Include a clear subject line suggestion",
      "Start with a personable greeting",
      "Use professional formatting with clear paragraphs",
      "End with a specific call-to-action and professional signature",
    ],
  },
} as const;

const LENGTH_GUIDELINES = {
  "Very Short - Tweet-like (approx. 30 words)": {
    prompt: "Keep it very short, like a tweet",
    wordCount: {
      English: 30,
      Burmese: 40, // Burmese typically needs fewer words to express the same content
    },
  },
  "Short Post (approx. 75 words)": {
    prompt: "Write a short social media post",
    wordCount: {
      English: 75,
      Burmese: 100,
    },
  },
  "Medium Post (approx. 150 words)": {
    prompt: "Create a medium-length social media post",
    wordCount: {
      English: 150,
      Burmese: 200,
    },
  },
  "Engaging Post (approx. 250 words)": {
    prompt: "Develop an engaging social media post",
    wordCount: {
      English: 250,
      Burmese: 350,
    },
  },
  "Detailed Story (approx. 300+ words)": {
    prompt: "Write a detailed story-like social media post",
    wordCount: {
      English: 300,
      Burmese: 400,
    },
  },
  "Subject Line & Snippet (approx. 10 words)": {
    prompt: "Create a very brief subject line and snippet",
    wordCount: {
      English: 10,
      Burmese: 14,
    },
  },
  "Brief Email (approx. 75 words)": {
    prompt: "Write a brief email",
    wordCount: {
      English: 75,
      Burmese: 100,
    },
  },
  "Standard Email (approx. 150 words)": {
    prompt: "Create a standard length email",
    wordCount: {
      English: 150,
      Burmese: 200,
    },
  },
  "Detailed Email (approx. 250 words)": {
    prompt: "Develop a detailed email",
    wordCount: {
      English: 250,
      Burmese: 350,
    },
  },
  "Brief Overview (approx. 250 words)": {
    prompt: "Write a brief overview article",
    wordCount: {
      English: 250,
      Burmese: 350,
    },
  },
  "Standard Blog Post (approx. 500 words)": {
    prompt: "Create a standard blog post",
    wordCount: {
      English: 500,
      Burmese: 700,
    },
  },
  "In-depth Article (approx. 1000 words)": {
    prompt: "Develop an in-depth article",
    wordCount: {
      English: 1000,
      Burmese: 1400,
    },
  },
  "Feature Article (approx. 1500 words)": {
    prompt: "Write a feature-length article",
    wordCount: {
      English: 1500,
      Burmese: 2100,
    },
  },
} as const;

// Example-based style guidance for each writing style
const STYLE_EXAMPLES = {
  Formal: {
    personaPrompt: "You are a distinguished and articulate professor.",
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
    personaPrompt: "You are a warm and approachable neighbor.",
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
  Excited: {
    personaPrompt: "You are an enthusiastic cheerleader.",
    English: {
      good: [
        "🎉 OMG! We just hit 1 million users! Thank you all for your incredible support! Let's celebrate! 🥳",
        "🚀 Blast off to savings! Our biggest sale of the year is ON! Don't miss out! 🔥",
      ],
      bad: [
        "We have reached a significant milestone.",
        "Our annual sale is now active.",
      ],
    },
    Burmese: {
      good: [
        "🎉 အိုးမိုင်ဂေါ့! သုံးစွဲသူ ၁ သန်း ပြည့်သွားပြီ! အားလုံးရဲ့ မယုံနိုင်လောက်အောင် ထောက်ပံ့မှုအတွက် ကျေးဇူးတင်ပါတယ်! ပျော်ပွဲခံကြစို့! 🥳",
        "🚀 ငွေစုဆောင်းဖို့ အချိန်ရောက်ပြီ! ဒီနှစ်ရဲ့ အကြီးမားဆုံး လျှော့စျေး ရောင်းချပွဲ စတင်ပါပြီ! လက်လွတ်မခံနဲ့နော်! 🔥",
      ],
      bad: [
        "ကျွန်ုပ်တို့ဟာ မှတ်တိုင်တစ်ခုကို အောင်မြင်စွာ ကျော်ဖြတ်နိုင်ခဲ့ပါတယ်။",
        "ကျွန်တော်တို့ရဲ့ နှစ်ပတ်လည် လျှော့စျေးပွဲ စတင်ပါပြီ။",
      ],
    },
  },
  Humorous: {
    personaPrompt: "You are a witty stand-up comedian.",
    English: {
      good: [
        "Why did the AI cross the road? To get to the other data set! 😂  Just kidding (mostly). Check out our latest AI advancements!",
        "Our software is so user-friendly, even your cat could use it. (We think 😉)",
      ],
      bad: [
        "Our AI technology has made significant progress.",
        "The user interface is designed for ease of use.",
      ],
    },
    Burmese: {
      good: [
        "ဘာလို့ AI က လမ်းကို ဖြတ်ကူးတာလဲ? တခြား ဒေတာအစုံကို ရောက်ဖို့လေ! 😂 နောက်တာပါ (အများအားဖြင့်)။ ကျွန်တော်တို့ရဲ့ နောက်ဆုံး AI တိုးတက်မှုတွေကို လေ့လာကြည့်ပါ!",
        "ကျွန်တော်တို့ရဲ့ ဆော့ဖ်ဝဲလ်က သုံးရတာ အရမ်းလွယ်ကူလို့ ခင်ဗျားရဲ့ ကြောင်တောင် သုံးလို့ရတယ်။ (ကျွန်တော်တို့ ထင်တာပါ 😉)",
      ],
      bad: [
        "ကျွန်တော်တို့ရဲ့ AI နည်းပညာဟာ သိသာထင်ရှားတဲ့ တိုးတက်မှုတွေ ရရှိခဲ့ပါတယ်။",
        "သုံးစွဲသူ အင်တာဖေ့စ်ကို အသုံးပြုရ လွယ်ကူအောင် ဒီဇိုင်းထုတ်ထားပါတယ်။",
      ],
    },
  },
  Informative: {
    personaPrompt: "You are a knowledgeable and helpful librarian.",
    English: {
      good: [
        "Did you know that regular updates improve your software's security and performance? Learn more in our latest blog post!",
        "Fact: 80% of successful businesses leverage data analytics. Discover how you can too!",
      ],
      bad: [
        "Check out our blog for some stuff.",
        "Data is kinda useful for business.",
      ],
    },
    Burmese: {
      good: [
        "ပုံမှန် အပ်ဒိတ်တွေက ခင်ဗျားရဲ့ ဆော့ဖ်ဝဲလ်ရဲ့ လုံခြုံရေးနဲ့ စွမ်းဆောင်ရည်ကို တိုးတက်စေတယ်ဆိုတာ သိပါသလား? ကျွန်တော်တို့ရဲ့ နောက်ဆုံး ဘလော့ဂ်ပို့စ်မှာ လေ့လာကြည့်ပါ!",
        "အချက်အလက်: အောင်မြင်တဲ့ လုပ်ငန်း ၈၀% က ဒေတာ ခွဲခြမ်းစိတ်ဖြာမှုကို အသုံးပြုကြပါတယ်။ ခင်ဗျားလည်း ဘယ်လို အသုံးပြုနိုင်မလဲ ရှာဖွေကြည့်ပါ!",
      ],
      bad: [
        "ကျွန်တော်တို့ရဲ့ ဘလော့ဂ်မှာ တချို့ အကြောင်းအရာတွေ ရှိတယ်။ လေ့လာကြည့်ပါဦး။",
        "ဒေတာက လုပ်ငန်းအတွက် အသုံးဝင်ပါတယ်။",
      ],
    },
  },
  Urgent: {
    personaPrompt: "You are a frantic emergency broadcaster.",
    English: {
      good: [
        "🚨 Last chance! Our 50% off sale ends at midnight! Shop now before it's too late!",
        "⏳ Time is running out! Secure your spot in our exclusive webinar today!",
      ],
      bad: ["Our sale is ending soon.", "Webinar registration is closing."],
    },
    Burmese: {
      good: [
        "🚨 နောက်ဆုံး အခွင့်အရေး! ၅၀% လျှော့စျေးပွဲ သန်းခေါင်ယံမှာ ပြီးဆုံးပါတော့မယ်! နောက်မကျခင် အခုပဲ ဝယ်ယူလိုက်ပါ!",
        "⏳ အချိန်ကုန်တော့မယ်! ကျွန်တော်တို့ရဲ့ သီးသန့် ဝက်ဘင်နာမှာ ဒီနေ့ပဲ နေရာယူလိုက်ပါ!",
      ],
      bad: [
        "ကျွန်တော်တို့ရဲ့ လျှော့စျေးပွဲ မကာခင် ပြီးဆုံးပါတော့မယ်။",
        "ဝက်ဘင်နာ စာရင်းပေးသွင်းမှု ပိတ်တော့ပါမယ်။",
      ],
    },
  },
  Luxury: {
    personaPrompt: "You are an opulent concierge at a 5-star hotel.",
    English: {
      good: [
        "Indulge in unparalleled elegance. Our premium collection redefines sophistication.",
        "Experience the epitome of luxury. Crafted for those who appreciate the finest things in life.",
      ],
      bad: ["Check out our nice stuff.", "We sell good quality products."],
    },
    Burmese: {
      good: [
        "မတူနိုင်တဲ့ ခမ်းနားထည်ဝါမှုကို ခံစားလိုက်ပါ။ ကျွန်တော်တို့ရဲ့ ပရီမီယံ စုစည်းမှုက ခေတ်မီဆန်းပြားမှုကို ပြန်လည်သတ်မှတ်ပေးပါတယ်။",
        "ဇိမ်ခံမှုရဲ့ အထွတ်အထိပ်ကို ခံစားလိုက်ပါ။ ဘဝမှာ အကောင်းဆုံးအရာတွေကို တန်ဖိုးထားတတ်သူတွေအတွက် ဖန်တီးထားပါတယ်။",
      ],
      bad: [
        "ကျွန်တော်တို့ရဲ့ ကောင်းတဲ့ ပစ္စည်းတွေကို လေ့လာကြည့်ပါ။",
        "ကျွန်တော်တို့ အရည်အသွေးကောင်းတဲ့ ထုတ်ကုန်တွေကို ရောင်းပါတယ်။",
      ],
    },
  },
  Playful: {
    personaPrompt: "You are a fun-loving snazzy asian auntie.",
    English: {
      good: [
        "Let's get playful! 🎉 Discover fun ways to use our new features and unleash your creativity!",
        "Ready to have some fun? 😉 Our latest update is packed with surprises!",
      ],
      bad: [
        "Explore the functionalities of our new features.",
        "The latest update includes several enhancements.",
      ],
    },
    Burmese: {
      good: [
        "ကစားကြရအောင်! 🎉 ကျွန်တော်တို့ရဲ့ လုပ်ဆောင်ချက်အသစ်တွေကို ပျော်စရာကောင်းတဲ့ နည်းလမ်းတွေနဲ့ ရှာဖွေပြီး ခင်ဗျားရဲ့ တီထွင်ဖန်တီးနိုင်စွမ်းကို ထုတ်ဖော်လိုက်ပါ!",
        "ပျော်ဖို့ အဆင်သင့်ဖြစ်ပြီလား? 😉 ကျွန်တော်တို့ရဲ့ နောက်ဆုံး အပ်ဒိတ်မှာ အံ့အားသင့်စရာတွေ အပြည့်ပါပဲ!",
      ],
      bad: [
        "ကျွန်တော်တို့ရဲ့ လုပ်ဆောင်ချက်အသစ်တွေရဲ့ လုပ်ဆောင်နိုင်စွမ်းတွေကို လေ့လာပါ။",
        "နောက်ဆုံး အပ်ဒိတ်မှာ တိုးမြှင့်မှု အများအပြား ပါဝင်ပါတယ်။",
      ],
    },
  },
  Serious: {
    personaPrompt: "You are a stern and no-nonsense CEO.",
    English: {
      good: [
        "We are committed to providing reliable and secure services. Your trust is our top priority.",
        "Our team is dedicated to addressing this issue with the utmost diligence and professionalism.",
      ],
      bad: [
        "We're pretty serious about security.",
        "We're working on fixing it ASAP.",
      ],
    },
    Burmese: {
      good: [
        "ကျွန်တော်တို့ဟာ ယုံကြည်စိတ်ချရပြီး လုံခြုံတဲ့ ဝန်ဆောင်မှုတွေကို ပေးအပ်ဖို့ ကတိပြုပါတယ်။ ခင်ဗျားရဲ့ ယုံကြည်မှုက ကျွန်တော်တို့ရဲ့ အဓိက ဦးစားပေးပါ။",
        "ကျွန်တော်တို့ရဲ့ အဖွဲ့သားတွေဟာ ဒီပြဿနာကို အတတ်နိုင်ဆုံး ကြိုးစားပြီး ကျွမ်းကျင်ပိုင်နိုင်စွာ ဖြေရှင်းဖို့ အာရုံစိုက်ထားပါတယ်။",
      ],
      bad: [
        "လုံခြုံရေးကိစ္စကို ကျွန်တော်တို့ တော်တော်လေး အလေးအနက်ထားပါတယ်။",
        "အမြန်ဆုံး ပြင်ဆင်ဖို့ ကျွန်တော်တို့ လုပ်ဆောင်နေပါတယ်။",
      ],
    },
  },
} as const;

type LengthGuidelineKey = keyof typeof LENGTH_GUIDELINES;

export function generateDynamicPrompt(input: GeneratePostFormData): string {
  const contentTypeDetails = CONTENT_TYPE_CONTEXT[input.contentType];
  const lengthGuide =
    LENGTH_GUIDELINES[input.contentLength as LengthGuidelineKey];
  const wordCount = lengthGuide.wordCount[input.language];

  const lengthGuideline = `${lengthGuide.prompt} (approximately ${wordCount} words)`;

  let styleSection = "";
  if (input.writingStyle !== "Custom") {
    const stylePersona = STYLE_EXAMPLES[input.writingStyle]?.personaPrompt;
    const styleExamples = STYLE_EXAMPLES[input.writingStyle]?.[input.language];
    if (styleExamples) {
      styleSection = `
## Your Persona
${stylePersona}

### STYLE EXAMPLES
✅ Good examples:
${styleExamples.good?.map((ex) => `- ${ex}`).join("\n") ?? ""}

❌ Bad examples:
${styleExamples.bad?.map((ex) => `- ${ex}`).join("\n") ?? ""}`;
    }
  }

  return `
Generate a well-structured content based on the following brief:

# CONTENT TYPE
${contentTypeDetails.format}

# FORMAT CONSTRAINTS
${contentTypeDetails.constraints.map((constraint) => `- ${constraint}`).join("\n")}

# LENGTH GUIDELINE
${lengthGuideline}

# TONE AND STYLE
${input.customStyle ?? styleSection}

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
