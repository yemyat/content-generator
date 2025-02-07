"use client";

import React from "react";
import { cn, withRef } from "@udecode/cn";
import { PlateElement } from "./plate-element";

export const ListItemElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement
        ref={ref}
        as="li"
        className={cn("ml-6 list-item py-1", className)}
        {...props}
      >
        {children}
      </PlateElement>
    );
  },
);

ListItemElement.displayName = "ListItemElement";
