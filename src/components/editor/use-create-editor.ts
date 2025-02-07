"use client";

import { withProps } from "@udecode/cn";
import {
  ParagraphPlugin,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
} from "@udecode/plate/react";
import { BasicElementsPlugin } from "@udecode/plate-basic-elements/react";
import {
  BasicMarksPlugin,
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { HeadingElement } from "~/components/plate-ui/heading-element";
import { FloatingToolbarPlugin } from "../plugins/floating-toolbar-plugin";
import { ParagraphElement } from "../plate-ui/paragraph-element";
import { IndentListPlugin } from "@udecode/plate-indent-list/react";
import { IndentPlugin } from "@udecode/plate-indent/react";
import { autoformatPlugin } from "../plugins/autoformat-plugin";
import { type Value } from "@udecode/plate";
import { type EditorPlugins } from "~/lib/types";
import { MarkdownPlugin } from "@udecode/plate-markdown";
import { LineHeightPlugin } from "@udecode/plate-line-height/react";
import {
  BulletedListPlugin,
  ListItemPlugin,
  ListPlugin,
  NumberedListPlugin,
} from "@udecode/plate-list/react";
import { ListElement } from "../plate-ui/list-element";

export const useCreateEditor = () => {
  const defaultValue = [
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

  return usePlateEditor<Value, EditorPlugins>({
    override: {
      components: {
        [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
        [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
        [ParagraphPlugin.key]: ParagraphElement,
        [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
        [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
        [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
        [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
        [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
        [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
        [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
        [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
        [BulletedListPlugin.key]: withProps(ListElement, { variant: "ul" }),
        [ListItemPlugin.key]: withProps(PlateElement, { as: "li" }),
        [NumberedListPlugin.key]: withProps(ListElement, { variant: "ol" }),
      },
    },
    plugins: [
      BasicElementsPlugin,
      BasicMarksPlugin,
      FloatingToolbarPlugin,
      IndentPlugin.configure({
        inject: { targetPlugins: ["p", "h1", "h2", "h3"] },
      }),
      IndentListPlugin.configure({
        inject: { targetPlugins: ["p", "h1", "h2", "h3", "ul", "ol"] },
      }),
      autoformatPlugin,
      MarkdownPlugin,
      ListPlugin,
      LineHeightPlugin.configure({
        inject: {
          nodeProps: {
            defaultNodeValue: 2,
            validNodeValues: [1, 1.2, 1.5, 2, 3],
          },
          targetPlugins: ["p", "h1", "h2", "h3"],
        },
      }),
    ],
    value: defaultValue,
  });
};
