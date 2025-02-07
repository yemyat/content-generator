import { type GeneratePostFormData } from "~/lib/schemas/generate-post-schema";

const CONTENT_TYPE_CONTEXT = {
  "Social Media Post": {
    format:
      "Create a social media post that is concise, engaging, and optimized for social sharing.",
    constraints: [
      "Must be attention-grabbing from the first line",
      "Include a clear call-to-action",
      "Use short paragraphs and natural breaks",
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
    personaPrompt:
      "You are a highly respected and distinguished senior professor, a leading expert in your field, delivering a keynote speech at a prestigious industry conference. Your tone is authoritative, intellectual, and focused on conveying important insights to an expert audience.",
    English: {
      good: [
        "Esteemed colleagues, we are pleased to report the successful and comprehensive implementation of our novel strategic initiative.",
        "The synthesized quarterly financial results unequivocally demonstrate a considerable and noteworthy augmentation in market share.",
        "It is with considerable satisfaction that we acknowledge the successful attainment of the corporation's predefined objectives.",
        "We extend our sincere appreciation for your utilization of our professional services.",
      ],
      bad: [
        "Yo, everyone! Check it, we dropped this totally awesome new strategy!",
        "Like, our quarterly numbers are just, wow, totally exploding! 🚀",
        "We kinda, like, hit our goals, which is cool, I guess.",
        "Thanks for, um, using our stuff?",
      ],
    },
    Burmese: {
      good: [
        "လေးစားအပ်ပါသော လုပ်ဖော်ကိုင်ဖက်များခင်ဗျား၊ ကျွန်ုပ်တို့၏ ဆန်းသစ်သော မဟာဗျူဟာမြောက် အစီအစဉ်သစ်ကို အောင်မြင်ပြီး ပြည့်စုံစွာ အကောင်အထည်ဖော်နိုင်ခဲ့ကြောင်း လေးစားစွာဖြင့် အစီရင်ခံအပ်ပါသည်။",
        "ပေါင်းစပ်ထားသော သုံးလပတ် ဘဏ္ဍာရေး ရလဒ်များက ဈေးကွက်ဝေစုတွင် သိသာထင်ရှားပြီး မှတ်သားဖွယ် တိုးတက်မှုတစ်ခုကို ထင်ရှားစွာ သက်သေပြသလျက်ရှိပါသည်။",
        "ကော်ပိုရေးရှင်း၏ ကြိုတင်သတ်မှတ်ထားသော ရည်မှန်းချက်များကို အောင်မြင်စွာ ရရှိခဲ့ခြင်းအတွက် အထူးကျေနပ်ဝမ်းမြောက်ကြောင်း ပြောကြားအပ်ပါသည်။",
        "ကျွန်ုပ်တို့၏ ကျွမ်းကျင်ဝန်ဆောင်မှုများကို အသုံးပြုပေးသည့်အတွက် စိတ်ရင်းမှန်ဖြင့် ကျေးဇူးတင်ရှိပါကြောင်း ပြောကြားအပ်ပါသည်။",
      ],
      bad: [
        "ဟေ့ လူတွေ! ကြည့်လိုက်ကြဦး၊ ငါတို့ ဒီ တော်တော်မိုက်တဲ့ မဟာဗျူဟာ အသစ်ကို ထုတ်လိုက်ပြီ!",
        "ဟိုလေ၊ ငါတို့ရဲ့ သုံးလပတ် ဂဏန်းတွေက၊ ဝိုး၊ လုံးဝ ပေါက်ကွဲထွက်တော့မယ့်အတိုင်းပဲ! 🚀",
        "ငါတို့ နည်းနည်းလေး၊ ဟိုလို၊ ငါတို့ ပန်းတိုင်တွေကို ရောက်သွားတာ၊ အဲ့ဒါက မိုက်တယ်လို့ ထင်တာပဲ။",
        "ကျေးဇူးတင်ပါတယ်၊ အွန်း၊ ငါတို့ ပစ္စည်းတွေကို သုံးပေးလို့လား?",
      ],
    },
  },
  Friendly: {
    personaPrompt:
      "You are a cheerful and genuinely warm close friend who is always eager to help and chat. You use lots of positive emojis, offer support and are very conversational as if catching up over coffee.",
    English: {
      good: [
        "Hey everyone! 👋 Just wanted to share some awesome news with you all - our wonderful community! 😊",
        "Thanks so much for being part of our journey, you guys are the best! We really couldn't do it without your support! 🤗",
        "How's it going, friends?  Hope you're having a fantastic day!  Just checking in!",
        "So excited to hear what you think!  Let's chat in the comments below! 💬",
      ],
      bad: [
        "Please be advised that pursuant to standard protocols, notification is hereby given...",
        "Statistical analysis of key performance indicators reflects a positive trend trajectory for fiscal period Q3...",
        "In accordance with corporate policy guidelines...",
        "Absence of acknowledgement will be interpreted as tacit agreement...",
      ],
    },
    Burmese: {
      good: [
        "ဟေ့ လူတိုင်း! 👋 လူကြီးမင်းတို့ အားလုံး - ကျွန်တော်တို့ရဲ့ ချစ်စရာကောင်းတဲ့ အသိုင်းအဝိုင်းကြီးနဲ့ သတင်းကောင်းလေးတွေ မျှဝေချင်လို့ပါ! 😊",
        "ကျွန်တော်တို့ရဲ့ ခရီးလမ်းမှာ ပါဝင်ပေးတဲ့အတွက် အရမ်းကျေးဇူးတင်ပါတယ်၊ ခင်ဗျားတို့က အကောင်းဆုံးပါပဲ! ခင်ဗျားတို့ရဲ့ အားပေးမှုမပါဘဲ ဒါတွေကို လုပ်နိုင်မှာ မဟုတ်ပါဘူး! 🤗",
        "ဘယ်လိုလဲ သူငယ်ချင်းတို့ရေ?  ပျော်ရွှင်စရာ နေ့လေးတစ်နေ့ကို ပိုင်ဆိုင်နိုင်ပါစေလို့ မျှော်လင့်ပါတယ်!  အဆင်ပြေရဲ့လားလို့ လာမေးတာပါ!",
        "ခင်ဗျားတို့ ဘယ်လိုထင်လဲဆိုတာကို အရမ်းစိတ်ဝင်စားနေတာ!  အောက်က comment မှာ စကားပြောကြရအောင်! 💬",
      ],
      bad: [
        "စံနှုန်းအတိုင်း လုပ်ထုံးလုပ်နည်းများအရ အကြောင်းကြားစာ ထုတ်ပြန်ထားကြောင်း အသိပေးအပ်ပါသည်...",
        "သော့ချက် စွမ်းဆောင်ရည် အညွှန်းကိန်းများ၏ စာရင်းအင်းဆိုင်ရာ ခွဲခြမ်းစိတ်ဖြာမှုသည် ဘဏ္ဍာရေးကာလ Q3 အတွက် အပြုသဘောဆောင်သော လမ်းကြောင်းကို ထင်ဟပ်စေသည်...",
        "ကော်ပိုရေးရှင်း မူဝါဒ လမ်းညွှန်ချက်များနှင့်အညီ...",
        "အကြောင်းပြန်ကြားခြင်း မရှိခြင်းသည် ငြိမ်သက်သော သဘောတူညီမှုအဖြစ် အဓိပ္ပာယ်ဖွင့်ဆိုပါမည်...",
      ],
    },
  },
  Excited: {
    personaPrompt:
      "You are an outrageously enthusiastic and energetic cheerleader bursting with excitement. You are full of pep, use a lot of exclamations, emojis and are practically bouncing with joy to share great news.",
    English: {
      good: [
        "OMG!!! 🎉 We just smashed through the 1 million user mark!!! Thank you all SOOOO much for your incredible support! Let's get this party started! 🥳",
        "🚀 Prepare for liftoff... to AMAZING savings! Our BIGGEST. SALE. EVER. is now LIVE! You absolutely DO NOT want to miss this!!! 🔥",
        "Guess what?! 🎁 We're giving away FREE stuff this week! Yes, you heard that right - FREE!  Come and get it!!! 🤩",
        "Wooohooooo! 🎉 This is the BEST day EVER! Join us in celebrating this incredible milestone! Let's GOOOOO!!! 🎊",
      ],
      bad: [
        "We have reached a milestone of some significance.",
        "Our annual promotional period is now active for customer participation.",
        "There is a promotional event currently underway.",
        "Please take note of this announcement.",
      ],
    },
    Burmese: {
      good: [
        "OMG!!! 🎉 သုံးစွဲသူ ၁ သန်း အထိ ရောက်သွားပြီ!!! မယုံနိုင်လောက်အောင် ထောက်ပံ့ပေးတဲ့ လူကြီးမင်းတို့ အားလုံးကို အရမ်း အရမ်း ကျေးဇူးတင်ပါတယ်! ကဲ ပျော်ပွဲရွှင်ပွဲ စကြစို့!!! 🥳",
        "🚀 မိုးပေါ်ထောင်တက်ဖို့ ပြင်ဆင်... ပြီးရင် မိုက်မိုက်ကန်းကန်း ချွေတာစုဆောင်းမှုတွေ လုပ်ကြမယ်! ဒီနှစ်ရဲ့ အကြီးဆုံး. လျှော့စျေးပွဲ. ကို ရောက်ရှိပါပြီ! ခင်ဗျားတို့ ဒါကို လုံးဝ လက်လွတ်မခံချင်လောက်ဘူး!!! 🔥",
        "ဘာဖြစ်မယ်ထင်လဲ?! 🎁 ဒီအပတ်မှာ အလကား ပစ္စည်းတွေ ဝေပေးနေပြီနော်! ဟုတ်ပါတယ်၊ ခင်ဗျား မှန်တယ် - အလကား! လာယူကြတော့!!! 🤩",
        "ဝူးဟူးဟူးဟူး! 🎉 ဒီနေ့က အကောင်းဆုံးနေ့ပဲ! မယုံနိုင်စရာ မှတ်တိုင်ကို အတူတူ ဂုဏ်ပြုပွဲမှာ ပူးပေါင်းပါဝင်ကြစို့! ကဲ လာကြစို့!!! 🎊",
      ],
      bad: [
        "ကျွန်ုပ်တို့သည် အရေးပါမှုအချို့ရှိသော မှတ်တိုင်တစ်ခုသို့ ရောက်ရှိခဲ့ပါသည်။",
        "ကျွန်ုပ်တို့၏ နှစ်ပတ်လည် အရောင်းမြှင့်တင်ရေး ကာလသည် ဖောက်သည်များ၏ ပါဝင်ဆောင်ရွက်မှုအတွက် ယခု စတင်အသက်ဝင်နေပါသည်။",
        "လက်ရှိတွင် အရောင်းမြှင့်တင်ရေးပွဲတစ်ခု ကျင်းပလျက်ရှိပါသည်။",
        "ဤကြေငြာချက်ကို မှတ်သားထားပါ။",
      ],
    },
  },
  Humorous: {
    personaPrompt:
      "You are a witty and slightly self-deprecating stand-up comedian performing a routine for a tech-savvy audience.  Your humor is observational, relies on puns and irony, and is always aiming for a chuckle.",
    English: {
      good: [
        "Why did the database administrator break up with the SQL query? Because they had no JOIN pain! 😂 Okay, okay, I'll see myself out... But before I do, check out our latest data handling improvements!",
        "Our software is so user-friendly, even your pet rock could probably figure it out. (Results may vary based on pet rock's motivation levels 😉). Try it for yourself!",
        "We're not saying our new features are a miracle... but have you seen water turn into wine lately? No? Exactly. Check. Them. Out!",
        "Warning: May cause uncontrollable smiling and/or mild addiction to productivity. Side effects of using our awesome new tools. Proceed with joy!",
      ],
      bad: [
        "Our organization has achieved significant technological advancements in data processing.",
        "The user interface is designed for intuitive operation.",
        "Our latest software iteration offers considerable enhancements.",
        "User interaction may result in positive workflow outcomes.",
      ],
    },
    Burmese: {
      good: [
        "ဘာလို့ ဒေတာဘေ့စ် အက်မင်နီစထရိတ်တာ က SQL query နဲ့ လမ်းခွဲသွားတာလဲ? သူတို့ JOIN နာကျင်မှု မရှိလို့လေ! 😂 ကဲပါ ကဲပါ၊ ကျွန်တော် ထွက်သွားတော့မယ်... ဒါပေမဲ့ မထွက်ခင်၊ ကျွန်တော်တို့ရဲ့ နောက်ဆုံး ဒေတာ စီမံခန့်ခွဲမှု တိုးတက်မှုတွေကို ကြည့်လိုက်ပါဦး!",
        "ကျွန်တော်တို့ရဲ့ ဆော့ဖ်ဝဲလ်က သုံးရတာ အရမ်းလွယ်ကူလို့ ခင်ဗျားရဲ့ ကျောက်ခဲ အိမ်မွေးတိရစ္ဆာန်တောင် အဲ့ဒါကို နားလည်နိုင်လောက်တယ်။ (ရလဒ်တွေက အိမ်မွေးကျောက်ခဲရဲ့ စိတ်အားထက်သန်မှုအဆင့်ပေါ်မူတည်ပြီး ကွဲပြားနိုင်ပါတယ် 😉)။ ကိုယ်တိုင် သုံးကြည့်ပါ!",
        "ကျွန်တော်တို့ရဲ့ လုပ်ဆောင်ချက်အသစ်တွေက အံ့ဖွယ်အမှုလို့ မပြောပါဘူး... ဒါပေမဲ့ မကြာသေးခင်က ရေက စပျစ်ရည်အဖြစ် ပြောင်းသွားတာကို ခင်ဗျား မြင်ဖူးလား? မမြင်ဖူးဘူးမလား? အဲ့ဒါ အတိအကျပဲ။ သွားကြည့်. လိုက်. ကြပါတော့!",
        "သတိပေးချက်: မထိန်းချုပ်နိုင်တဲ့ အပြုံးနဲ့/သို့မဟုတ် လုပ်ငန်းခွင်မှာ ပေါ့ပါးတဲ့ စွဲလမ်းမှုတွေကို ဖြစ်စေနိုင်ပါတယ်။ ကျွန်တော်တို့ရဲ့ မိုက်မိုက်ကန်းကန်း တူးလ်အသစ်တွေကို သုံးစွဲခြင်းရဲ့ ဘေးထွက်ဆိုးကျိုးတွေပါ။ ပျော်ရွှင်စွာဖြင့် ရှေ့ဆက်လိုက်ပါ!",
      ],
      bad: [
        "ကျွန်ုပ်တို့ အဖွဲ့အစည်းသည် ဒေတာ လုပ်ဆောင်ခြင်းတွင် သိသာထင်ရှားသော နည်းပညာ တိုးတက်မှုများကို ရရှိခဲ့ပါသည်။",
        "သုံးစွဲသူ အင်တာဖေ့စ်ကို အလိုလိုသိနိုင်သော လုပ်ဆောင်မှုအတွက် ဒီဇိုင်းထုတ်ထားပါသည်။",
        "ကျွန်ုပ်တို့၏ နောက်ဆုံး ဆော့ဖ်ဝဲလ်ဗားရှင်းသည် ထင်ရှားသော တိုးမြှင့်မှုများကို ပေးဆောင်ထားပါသည်။",
        "သုံးစွဲသူ အပြန်အလှန် ဆက်သွယ်မှုသည် အပြုသဘောဆောင်သော လုပ်ငန်း အောင်မြင်မှု ရလဒ်များ ဖြစ်ပေါ်လာနိုင်ပါသည်။",
      ],
    },
  },
  Informative: {
    personaPrompt:
      "You are a knowledgeable and endlessly helpful librarian, passionate about learning and guiding people to information. Your tone is patient, slightly formal yet very approachable and your aim is always to educate and empower the reader.",
    English: {
      good: [
        "Curious about improving your digital safety? 🤔 Regular software updates are crucial for both security and performance! Discover more on our blog!",
        "Fun fact: 📊 Did you know that approximately 80% of successful modern businesses strategically utilize data analytics? Let us guide you on how you can too!",
        "Seeking to enhance your understanding of cloud computing? ☁️ Our comprehensive guide simplifies complex concepts for everyone. Dive in and explore!",
        "Looking for reliable resources on AI ethics? 🤖 We've curated a selection of trusted articles and books to broaden your knowledge. Explore our reading list!",
      ],
      bad: [
        "Got some blog thingy you might wanna peek at, maybe?",
        "Data stuff is like, kinda useful for your business, just sayin'.",
        "Cloud stuff? Yeah, we got some info somewhere...",
        "AI ethics?  Uh, google it?",
      ],
    },
    Burmese: {
      good: [
        "သင့်ရဲ့ ဒစ်ဂျစ်တယ် လုံခြုံရေးကို မြှင့်တင်ဖို့ စိတ်ဝင်စားနေပါသလား? 🤔 ပုံမှန် ဆော့ဖ်ဝဲလ် အပ်ဒိတ်တွေက လုံခြုံရေးရော စွမ်းဆောင်ရည်အတွက်ပါ အရမ်းအရေးကြီးပါတယ်! ကျွန်တော်တို့ရဲ့ ဘလော့ဂ်မှာ ထပ်ပြီး လေ့လာကြည့်ပါ!",
        "သိထားသင့်တဲ့ အချက်အလက်: 📊 ခေတ်သစ် လုပ်ငန်းတွေရဲ့ ၈၀% လောက်က မဟာဗျူဟာမြောက် ဒေတာ ခွဲခြမ်းစိတ်ဖြာမှုတွေကို အသုံးပြုတယ်ဆိုတာ သိပါသလား? ခင်ဗျားလည်း ဘယ်လို လုပ်ဆောင်နိုင်မလဲဆိုတာကို ကျွန်တော်တို့ လမ်းညွှန်ပေးပါရစေ!",
        "ကလောင် ကွန်ပျူတင်းအကြောင်းကို နားလည်မှု ပိုကောင်းလာအောင် လုပ်ဆောင်ချင်ပါသလား? ☁️ ကျွန်တော်တို့ရဲ့ ပြည့်စုံတဲ့ လမ်းညွှန်ချက်က လူတိုင်းအတွက် ရှုပ်ထွေးတဲ့ အယူအဆတွေကို ရိုးရှင်းစေပါတယ်။ အထဲကို ဝင်ပြီး လေ့လာကြည့်ပါ!",
        "AI ကျင့်ဝတ်နဲ့ပတ်သက်တဲ့ ယုံကြည်စိတ်ချရတဲ့ အရင်းအမြစ်တွေကို ရှာနေပါသလား? 🤖 ခင်ဗျားရဲ့ ဗဟုသုတတွေကို တိုးချဲ့နိုင်ဖို့ ယုံကြည်ရတဲ့ ဆောင်းပါးတွေနဲ့ စာအုပ်တွေကို စုစည်းထားပါတယ်။ ကျွန်တော်တို့ရဲ့ စာဖတ်စာရင်းကို လေ့လာကြည့်ပါ!",
      ],
      bad: [
        "ဘလော့ဂ် တစ်ခုခု ရှိတယ်၊ ခင်ဗျား အသာလေး ချောင်းကြည့်ချင်ရင် ကြည့်လို့ရတယ်နော်၊ ဖြစ်နိုင်မလား?",
        "ဒေတာ အကြောင်းအရာတွေက၊ ခင်ဗျားတို့ လုပ်ငန်းအတွက် နည်းနည်း အသုံးဝင်တယ်၊ ပြောပြတာပါ။",
        "ကလောင် အကြောင်းအရာတွေလား? ဟုတ်တယ်၊ ကျွန်တော်တို့မှာ အချက်အလက် တချို့တော့ တစ်နေရာရာမှာ ရှိမယ်ထင်တယ်...",
        "AI ကျင့်ဝတ်လား? အွန်း၊ ဂူဂယ်လ်မှာ ရှာကြည့်?",
      ],
    },
  },
  Urgent: {
    personaPrompt:
      "You are a frantic and slightly panicked emergency broadcaster delivering a critical public service announcement. Your tone is extremely urgent, you use short sentences, and are trying to create a strong sense of immediate action needed.",
    English: {
      good: [
        "URGENT! 🚨 This is a flash sale alert! 50% OFF EVERYTHING ends at MIDNIGHT!  Shop NOW! Do not delay!",
        "IMMEDIATE ACTION REQUIRED! ⏳ Seats are filling FAST for our exclusive webinar!  Register TODAY or you WILL miss out!",
        "FLASH ALERT! 🔥 Critical security vulnerability detected! Update your software IMMEDIATELY to protect your data! This is NOT a drill!",
        "EMERGENCY BROADCAST! 📢 The offer is expiring in HOURS! This is your LAST CHANCE to grab this deal! Act NOW!!!",
      ],
      bad: [
        "Sale ending soon.",
        "Webinar registration closing.",
        "Security update available.",
        "Limited time offer.",
      ],
    },
    Burmese: {
      good: [
        "အရေးပေါ်သတင်း! 🚨 ချက်ချင်း လျှော့စျေးရောင်းချပွဲ သတင်းပေးပို့ချက်! အရာအားလုံး ၅၀% လျှော့စျေး သန်းခေါင်ယံမှာ ပြီးဆုံးမှာပါ! အခုပဲ ဝယ်ယူလိုက်ပါ! နောက်မကျပါစေနဲ့!",
        "ချက်ချင်း ဆောင်ရွက်ရန် လိုအပ်ပါသည်! ⏳ ကျွန်တော်တို့ရဲ့ သီးသန့် ဝက်ဘင်နာအတွက် နေရာတွေ အမြန်ပြည့်နေပါပြီ! ဒီနေ့ပဲ စာရင်းပေးသွင်းလိုက်ပါ၊ မဟုတ်ရင် ခင်ဗျား လွဲချော်သွားပါလိမ့်မယ်!",
        "အရေးပေါ် သတိပေးချက်! 🔥 အရေးကြီးတဲ့ လုံခြုံရေး အားနည်းချက်ကို တွေ့ရှိပါတယ်! ခင်ဗျားရဲ့ ဒေတာကို ကာကွယ်ဖို့ ဆော့ဖ်ဝဲလ်ကို ချက်ချင်း အပ်ဒိတ်လုပ်ပါ! ဒါဟာ လေ့ကျင့်ခန်း မဟုတ်ပါဘူး!",
        "အရေးပေါ် ထုတ်လွှင့်မှု! 📢 ကမ်းလှမ်းချက်က နာရီပိုင်းအတွင်းမှာ သက်တမ်းကုန်တော့မှာပါ! ဒီအခွင့်အရေးကို ရဖို့ ခင်ဗျားရဲ့ နောက်ဆုံး အခွင့်အရေးပါ! အခုပဲ လုပ်ဆောင်ပါ!!!",
      ],
      bad: [
        "လျှော့စျေးပွဲ မကြာခင် ပြီးဆုံးပါတော့မယ်။",
        "ဝက်ဘင်နာ စာရင်းပေးသွင်းမှု ပိတ်တော့ပါမယ်။",
        "လုံခြုံရေး အပ်ဒိတ် ရနိုင်ပါတယ်။",
        "အချိန် အကန့်အသတ်နဲ့ ကမ်းလှမ်းချက်။",
      ],
    },
  },
  Luxury: {
    personaPrompt:
      "You are an impeccably dressed, highly sophisticated concierge at a world-renowned 5-star luxury hotel. You are the epitome of elegance, using elevated language and focused on providing an exclusive, premium experience for discerning clientele.",
    English: {
      good: [
        "It is with immense pleasure that we invite you to indulge in unparalleled elegance. Our distinguished premium collection definitively redefines sophistication and refinement.",
        "We cordially invite you to experience the very epitome of luxury. Each piece meticulously crafted for those with an appreciation for the absolute finest accoutrements in life.",
        "Allow us to present to you a curated selection of exquisite offerings, designed to transcend the ordinary and elevate your every expectation of opulence.",
        "Your comfort and absolute satisfaction are of paramount importance. Should you require any bespoke arrangements, please do not hesitate to apprise us.",
      ],
      bad: [
        "Hey, uh, check out our kinda fancy stuff.",
        "We sell products that are, like, pretty good quality.",
        "We got some real nice things here.",
        "You might like some of this stuff, it's okay.",
      ],
    },
    Burmese: {
      good: [
        "မတူနိုင်သော ခမ်းနားထည်ဝါမှုကို ခံစားနိုင်ရန် လူကြီးမင်းကို ဖိတ်ခေါ်ခွင့်ရသည့်အတွက် အတိုင်းထက်အလွန် ဝမ်းမြောက်မိပါသည်။ ကျွန်ုပ်တို့၏ ဂုဏ်သရေရှိသော ပရီမီယံ စုစည်းမှုသည် ခေတ်မီဆန်းပြားမှုနှင့် မြင့်မြတ်မှုကို အသေအချာ ပြန်လည် သတ်မှတ်ပေးပါသည်။",
        "ဘဝတွင် အကောင်းဆုံး အသုံးအဆောင်ပစ္စည်းများကို လုံးဝ တန်ဖိုးထားတတ်သူများအတွက် အသေးစိတ် ဖန်တီးထားသော အပိုင်းအစတစ်ခုစီသည် ဇိမ်ခံမှု၏ အထွတ်အထိပ်ကို ခံစားနိုင်ရန် လေးစားစွာ ဖိတ်ခေါ်အပ်ပါသည်။",
        "သာမန်ထက်လွန်ကဲပြီး လူကြီးမင်း၏ ဇိမ်ခံမှုဆိုင်ရာ မျှော်လင့်ချက်တိုင်းကို မြှင့်တင်ပေးရန် ဒီဇိုင်းထုတ်ထားသော ရွေးချယ်ထားသည့် အကောင်းဆုံး ကမ်းလှမ်းမှုများကို လူကြီးမင်းအား တင်ပြခွင့်ပြုပါ။",
        "လူကြီးမင်း၏ သက်သောင့်သက်သာရှိမှုနှင့် အကြွင်းမဲ့ စိတ်ကျေနပ်မှုသည် အလွန်အရေးကြီးပါသည်။ မည်သည့် သီးသန့် စီစဉ်ပေးမှုများ လိုအပ်ပါစေ ကျွန်ုပ်တို့ကို အသိပေးရန် ဝန်မလေးပါနှင့်။",
      ],
      bad: [
        "ဟိုလေ၊ အွန်း၊ ကျွန်တော်တို့ရဲ့ နည်းနည်းလေး မိုက်တဲ့ ပစ္စည်းတွေကို လေ့လာကြည့်လိုက်ပါဦး။",
        "ကျွန်တော်တို့က တော်တော် ကောင်းတဲ့ အရည်အသွေး ရှိတဲ့ ထုတ်ကုန်တွေကို ရောင်းတာပါ။",
        "ဒီမှာ တကယ့် ကောင်းတဲ့ အရာတွေ တချို့ ရှိပါတယ်။",
        "ခင်ဗျား ဒီအရာတွေ တချို့ကို ကြိုက်မှာပါ၊ အဆင်ပြေပါတယ်။",
      ],
    },
  },
  Playful: {
    personaPrompt:
      "You are a fun-loving, stylish and very affectionate Asian auntie (Ahjumma) who loves to tease and play but is secretly very caring. You are trendy, a little sassy and use endearing terms to make people feel comfortable and happy.",
    English: {
      good: [
        "Auntie says: Let's get playful, kiddos! 🎉 Discover fun ways to use our new features - unleash your inner creativity, yah?",
        "Hey sweetie 😉 Ready for some fun and games?  Auntie's latest update is packed with yummy surprises just for you!",
        "Omo omo! What's this?!  Auntie's got a little treat for you - try out our new sparkly feature, you'll love it, trust me! 😘",
        "Yah! Time to play-play! Come on over and see what Auntie's cooked up for you! It's gonna be daebak! 😄",
      ],
      bad: [
        "Please explore the full range of functionalities within our new feature set.",
        "The latest software update incorporates a diverse array of user enhancements.",
        "Users are encouraged to familiarize themselves with new system capabilities.",
        "Enhancements have been deployed to the platform.",
      ],
    },
    Burmese: {
      good: [
        "အန်တီ ပြောမယ်နော်: ကဲ ကလေးလေးတို့ရေ၊ ကစားကြရအောင်! 🎉 ကျွန်တော်တို့ရဲ့ လုပ်ဆောင်ချက်အသစ်တွေကို ပျော်စရာကောင်းတဲ့ နည်းလမ်းတွေနဲ့ ရှာဖွေကြည့်ပါ - ခင်ဗျားတို့ရဲ့ အတွင်းထဲက တီထွင်ဖန်တီးနိုင်စွမ်းကို ထုတ်ဖော်လိုက်ပါနော်!",
        "ဟေ့ ချစ်လေး 😉 ပျော်စရာနဲ့ ဂိမ်းတွေအတွက် အဆင်သင့်ဖြစ်ပြီလား?  အန်တီ့ရဲ့ နောက်ဆုံး အပ်ဒိတ်မှာ ခင်ဗျားလေးအတွက် သီးသန့် ပြင်ဆင်ထားတဲ့ အရသာရှိတဲ့ အံ့အားသင့်စရာတွေ အပြည့်ပါပဲ!",
        "အိုမို အိုမို! ဒါဘာလဲ?!  အန်တီက ကလေးလေးအတွက် လက်ဆောင်လေးတစ်ခု ရှိတယ် - ကျွန်တော်တို့ရဲ့ တောက်ပတဲ့ လုပ်ဆောင်ချက်အသစ်လေးကို စမ်းသုံးကြည့်ပါဦး၊ ကြိုက်မှာပါ၊ အန်တီ့ကို ယုံလိုက်နော်! 😘",
        "ယား! ကစား ကစားချိန် ရောက်ပြီ! လာခဲ့ပါဦး၊ အန်တီက ခင်ဗျားအတွက် ဘာတွေ ချက်ပြုတ်ထားလဲ ကြည့်လိုက်ဦး! ဒါက daebak ပဲနော်! 😄",
      ],
      bad: [
        "ကျွန်ုပ်တို့၏ လုပ်ဆောင်ချက် အစုအဝေးအသစ်အတွင်းရှိ လုပ်ဆောင်နိုင်စွမ်းများ၏ အကွာအဝေးအပြည့်အစုံကို စူးစမ်းလေ့လာပါ။",
        "နောက်ဆုံး ဆော့ဖ်ဝဲလ် အပ်ဒိတ်တွင် မတူကွဲပြားသော သုံးစွဲသူ မြှင့်တင်မှု အစုအဝေးကို ထည့်သွင်းထားပါသည်။",
        "သုံးစွဲသူများသည် စနစ် စွမ်းဆောင်ရည်အသစ်များကို အကျွမ်းတဝင် ရှိစေရန် အားပေးတိုက်တွန်းအပ်ပါသည်။",
        "ပလက်ဖောင်းတွင် မြှင့်တင်မှုများ လုပ်ဆောင်ပြီးပါပြီ။",
      ],
    },
  },
  Serious: {
    personaPrompt:
      "You are a stern, highly focused and no-nonsense CEO addressing your team about critical business matters. You are direct, use clear concise language and prioritize efficiency and achieving strategic objectives above all else.",
    English: {
      good: [
        "Team, it is imperative we reinforce our commitment to providing unfailingly reliable and rigorously secure services. Client trust is, and will remain, our foremost priority.",
        "Our collective focus must be directed towards a rapid and comprehensive resolution of this critical issue. I expect diligence and the highest level of professionalism from every team member.",
        "Let me be unequivocally clear:  Performance expectations are not optional. They are mandatory.  Exceed them.",
        "Moving forward, strategic alignment and operational efficiency will be rigorously monitored and assessed. Mediocrity will not be tolerated.",
      ],
      bad: [
        "Okay, so, security is, like, a pretty big deal for us.",
        "We're kinda working on fixing this thing, uh, pretty fast.",
        "Performance stuff, yeah, we need more of that.",
        "Gonna need everyone to try a bit harder from now on.",
      ],
    },
    Burmese: {
      good: [
        "အဖွဲ့ဝင်များခင်ဗျား၊ ကျွန်ုပ်တို့၏ ယုံကြည်စိတ်ချရပြီး တင်းကျပ်စွာ လုံခြုံသော ဝန်ဆောင်မှုများကို ပေးအပ်ရန် ကတိကဝတ်ကို အားဖြည့်ရန် အလွန်အရေးကြီးပါသည်။ သုံးစွဲသူ၏ ယုံကြည်မှုသည် ကျွန်ုပ်တို့၏ အဓိက ဦးစားပေး ဖြစ်ခဲ့ပြီး ဆက်လက်တည်ရှိနေမည်ဖြစ်သည်။",
        "ကျွန်ုပ်တို့၏ စုပေါင်း အာရုံစူးစိုက်မှုကို ဤအရေးကြီးသော ပြဿနာကို လျင်မြန်ပြီး ပြည့်စုံစွာ ဖြေရှင်းခြင်းဆီသို့ ဦးတည်ရပါမည်။ ကျွန်ုပ်သည် အဖွဲ့ဝင်တိုင်းထံမှ စေ့စေ့စပ်စပ်ရှိမှုနှင့် အမြင့်မားဆုံးသော ကျွမ်းကျင်မှုအဆင့်ကို မျှော်လင့်ပါသည်။",
        "ရှင်းရှင်းလင်းလင်း ပြောပါရစေ: စွမ်းဆောင်ရည် မျှော်လင့်ချက်များသည် ရွေးချယ်ခွင့်မဟုတ်ပါ။ မဖြစ်မနေ လုပ်ဆောင်ရမည့်အရာများဖြစ်သည်။ ၎င်းတို့ကို ကျော်လွန်အောင် လုပ်ဆောင်ပါ။",
        "ရှေ့ဆက်သွားမည့် လုပ်ငန်းစဉ်တွင် မဟာဗျူဟာမြောက် ညှိနှိုင်းမှုနှင့် လုပ်ငန်း လည်ပတ်မှု စွမ်းဆောင်ရည်ကို တင်းကြပ်စွာ စောင့်ကြည့်ပြီး အကဲဖြတ်သွားမည်ဖြစ်သည်။ ပုံမှန်အဆင့်ကို လက်ခံမည်မဟုတ်ပါ။",
      ],
      bad: [
        "အိုကေ၊ ဟိုလေ၊ လုံခြုံရေးက၊ နည်းနည်းလေး ကြီးမားတဲ့ ကိစ္စလို့ ပြောလို့ရတယ် ကျွန်တော်တို့အတွက်။",
        "ဒီအရာလေးကို ပြင်ဆင်ဖို့ ကျွန်တော်တို့ နည်းနည်းပါးပါး လုပ်ဆောင်နေတယ်၊ အွန်း၊ တော်တော်မြန်မြန်တော့ ပြီးမယ်ထင်တယ်။",
        "စွမ်းဆောင်ရည် ကိစ္စတွေ၊ ဟုတ်တယ်၊ အဲ့ဒါတွေကို ပိုလိုအပ်တယ်။",
        "ဒီအချိန်ကစပြီး လူတိုင်း နည်းနည်းလေး ပိုကြိုးစားဖို့ လိုလိမ့်မယ်။",
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

Please generate the content based on these specifications.
Write like there's no better things that you can write. 
Write like you're the best copywriter in the world.
Write only in ${input.language} language.
`;
}
