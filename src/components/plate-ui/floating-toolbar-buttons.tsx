"use client";

import React from "react";

import { useEditorReadOnly } from "@udecode/plate/react";
import {
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";

import { ToolbarGroup } from "./toolbar";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ListToolbarButton } from "./list-toolbar-button";
import {
  BulletedListPlugin,
  NumberedListPlugin,
} from "@udecode/plate-list/react";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <ToolbarGroup>
            <TurnIntoDropdownMenu />
            <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={ItalicPlugin.key}
              tooltip="Italic (⌘+I)"
            >
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={UnderlinePlugin.key}
              tooltip="Underline (⌘+U)"
            >
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={StrikethroughPlugin.key}
              tooltip="Strikethrough (⌘+⇧+M)"
            >
              <StrikethroughIcon />
            </MarkToolbarButton>

            <ListToolbarButton nodeType={BulletedListPlugin.key} />
            <ListToolbarButton nodeType={NumberedListPlugin.key} />
          </ToolbarGroup>
        </>
      )}
    </>
  );
}
