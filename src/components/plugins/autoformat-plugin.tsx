"use client";

import type { SlateEditor } from "@udecode/plate";
import type { AutoformatRule } from "@udecode/plate-autoformat";

import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from "@udecode/plate-autoformat";
import { AutoformatPlugin } from "@udecode/plate-autoformat/react";
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import {
  INDENT_LIST_KEYS,
  ListStyleType,
  toggleIndentList,
} from "@udecode/plate-indent-list";

export const format = (editor: SlateEditor) => {
  if (editor.selection) {
    const parentEntry = editor.api.parent(editor.selection);

    if (!parentEntry) return;
  }
};

export const autoformatMarks: AutoformatRule[] = [
  {
    match: "***",
    mode: "mark",
    type: [BoldPlugin.key, ItalicPlugin.key],
  },
  {
    match: "__*",
    mode: "mark",
    type: [UnderlinePlugin.key, ItalicPlugin.key],
  },
  {
    match: "__**",
    mode: "mark",
    type: [UnderlinePlugin.key, BoldPlugin.key],
  },
  {
    match: "___***",
    mode: "mark",
    type: [UnderlinePlugin.key, BoldPlugin.key, ItalicPlugin.key],
  },
  {
    match: "**",
    mode: "mark",
    type: BoldPlugin.key,
  },
  {
    match: "__",
    mode: "mark",
    type: UnderlinePlugin.key,
  },
  {
    match: "*",
    mode: "mark",
    type: ItalicPlugin.key,
  },
  {
    match: "_",
    mode: "mark",
    type: ItalicPlugin.key,
  },
  {
    match: "~~",
    mode: "mark",
    type: StrikethroughPlugin.key,
  },
  {
    match: "^",
    mode: "mark",
    type: SuperscriptPlugin.key,
  },
  {
    match: "~",
    mode: "mark",
    type: SubscriptPlugin.key,
  },

  {
    match: "`",
    mode: "mark",
    type: CodePlugin.key,
  },
];

export const autoformatBlocks: AutoformatRule[] = [
  {
    match: "# ",
    mode: "block",
    type: HEADING_KEYS.h1,
  },
  {
    match: "## ",
    mode: "block",
    type: HEADING_KEYS.h2,
  },
  {
    match: "### ",
    mode: "block",
    type: HEADING_KEYS.h3,
  },
  {
    match: "#### ",
    mode: "block",
    type: HEADING_KEYS.h4,
  },
  {
    match: "##### ",
    mode: "block",
    type: HEADING_KEYS.h5,
  },
  {
    match: "###### ",
    mode: "block",
    type: HEADING_KEYS.h6,
  },
];

export const autoformatIndentLists: AutoformatRule[] = [
  {
    format: (editor) => {
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Disc,
      });
    },
    match: ["* ", "- "],
    mode: "block",
    type: "list",
  },
  {
    format: (editor) =>
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Decimal,
      }),
    match: [String.raw`^\d+\.$ `, String.raw`^\d+\)$ `],
    matchByRegex: true,
    mode: "block",
    type: "list",
  },
  {
    format: (editor) => {
      toggleIndentList(editor, {
        listStyleType: INDENT_LIST_KEYS.todo,
      });
      editor.tf.setNodes({
        checked: false,
        listStyleType: INDENT_LIST_KEYS.todo,
      });
    },
    match: ["[] "],
    mode: "block",
    type: "list",
  },
  {
    format: (editor) => {
      toggleIndentList(editor, {
        listStyleType: INDENT_LIST_KEYS.todo,
      });
      editor.tf.setNodes({
        checked: true,
        listStyleType: INDENT_LIST_KEYS.todo,
      });
    },
    match: ["[x] "],
    mode: "block",
    type: "list",
  },
];

export const autoformatPlugin = AutoformatPlugin.configure({
  options: {
    enableUndoOnDelete: true,
    rules: [
      ...autoformatBlocks,
      ...autoformatMarks,
      ...autoformatSmartQuotes,
      ...autoformatPunctuation,
      ...autoformatLegal,
      ...autoformatLegalHtml,
      ...autoformatArrow,
      ...autoformatMath,
      ...autoformatIndentLists,
    ],
  },
});
