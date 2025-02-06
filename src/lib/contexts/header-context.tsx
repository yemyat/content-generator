import { createContext, useContext, type ReactNode } from "react";

interface HeaderContextValue {
  setHeaderContent: (content: ReactNode) => void;
}

export const HeaderContext = createContext<HeaderContextValue | undefined>(
  undefined,
);

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
}
