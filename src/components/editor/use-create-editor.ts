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

export const useCreateEditor = () => {
  return usePlateEditor({
    override: {
      components: {
        [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
        [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
        [ParagraphPlugin.key]: withProps(PlateElement, {
          as: "p",
          className: "mb-4",
        }),
        [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
        [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
        blockquote: withProps(PlateElement, {
          as: "blockquote",
          className: "mb-4 border-l-4 border-[#d0d7de] pl-4 text-[#636c76]",
        }),
        [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
        [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
        [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
        [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
        [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
        [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
      },
    },
    plugins: [BasicElementsPlugin, BasicMarksPlugin, FloatingToolbarPlugin],
    value: [
      {
        children: [{ text: "Basic Editor" }],
        type: "h1",
      },
      {
        children: [{ text: "Heading 2" }],
        type: "h2",
      },
      {
        children: [{ text: "Heading 3" }],
        type: "h3",
      },
      {
        children: [{ text: "This is a blockquote element" }],
        type: "blockquote",
      },
      {
        children: [
          { text: "Basic marks: " },
          { bold: true, text: "bold" },
          { text: ", " },
          { italic: true, text: "italic" },
          { text: ", " },
          { text: "underline", underline: true },
          { text: ", " },
          { strikethrough: true, text: "strikethrough" },
          { text: "." },
        ],
        type: ParagraphPlugin.key,
      },
    ],
  });
};
