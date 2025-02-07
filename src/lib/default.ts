import { type Value } from "@udecode/plate";
import { ParagraphPlugin } from "@udecode/plate/react";

export const EDITOR_DEFAULT_VALUE: Value = [
  {
    children: [{ text: "Welcome to Your New Post!" }],
    type: "h1",
  },
  {
    children: [{ text: "Start Creating Your Content" }],
    type: "h2",
  },
  {
    children: [{ text: "You have two great options to begin:" }],
    type: "h3",
  },
  {
    type: "ul",
    children: [
      {
        type: "li",
        children: [
          {
            text: "Use this editor as your scratch pad - format text, add headings, and craft your post from scratch",
          },
        ],
      },
      {
        type: "li",
        children: [
          {
            text: "Click the 'Create with AI' button above to generate an AI-powered first draft based on your brief",
          },
        ],
      },
    ],
  },
  {
    children: [
      {
        text: "Pro tip: You can always edit and refine the AI-generated content to match your voice perfectly!",
      },
    ],
    type: "blockquote",
  },
  {
    children: [
      { text: "This editor supports rich text formatting like " },
      { bold: true, text: "bold" },
      { text: ", " },
      { italic: true, text: "italic" },
      { text: ", " },
      { text: "underline", underline: true },
      { text: ", and " },
      { strikethrough: true, text: "strikethrough" },
      { text: " to help you create engaging content." },
    ],
    type: ParagraphPlugin.key,
  },
];
