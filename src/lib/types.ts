import { type Value } from "@udecode/plate";
import { type BasicElementsPlugin } from "@udecode/plate-basic-elements/react";
import { type BasicMarksPlugin } from "@udecode/plate-basic-marks/react";
import { type IndentListPlugin } from "@udecode/plate-indent-list/react";
import { type IndentPlugin } from "@udecode/plate-indent/react";
import { type LineHeightPlugin } from "@udecode/plate-line-height/react";
import { type ListPlugin } from "@udecode/plate-list/react";
import { type MarkdownPlugin } from "@udecode/plate-markdown";
import { type TPlateEditor } from "@udecode/plate/react";
import { type autoformatPlugin } from "~/components/plugins/autoformat-plugin";
import { type FloatingToolbarPlugin } from "~/components/plugins/floating-toolbar-plugin";

export type EditorPlugins =
  | typeof BasicElementsPlugin
  | typeof BasicMarksPlugin
  | typeof FloatingToolbarPlugin
  | typeof ListPlugin
  | typeof IndentPlugin
  | typeof IndentListPlugin
  | typeof autoformatPlugin
  | typeof MarkdownPlugin
  | typeof LineHeightPlugin;

export type MyPlateEditor = TPlateEditor<Value, EditorPlugins>;
