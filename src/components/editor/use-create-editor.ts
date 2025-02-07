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
import { HEADING_KEYS, HEADING_LEVELS } from "@udecode/plate-heading";
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
        inject: { targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS] },
      }),
      IndentListPlugin.configure({
        inject: { targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS] },
      }),
      autoformatPlugin,
      MarkdownPlugin,
      ListPlugin,
      LineHeightPlugin.configure({
        inject: {
          nodeProps: {
            defaultNodeValue: 1.5,
            validNodeValues: [1, 1.2, 1.5, 2, 3],
          },
          targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS],
        },
      }),
    ],
  });
};
