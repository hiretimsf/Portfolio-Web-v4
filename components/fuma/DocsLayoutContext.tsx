"use client";

import { createContext, useContext, type ReactNode } from "react";

export interface PageStyles {
  tocNav?: string;
  toc?: string;
  page?: string;
  article?: string;
}

const StylesContext = createContext<PageStyles>({});

export function StylesProvider({
  children,
  ...props
}: PageStyles & { children: ReactNode }) {
  return (
    <StylesContext.Provider value={props}>{children}</StylesContext.Provider>
  );
}

export function usePageStyles() {
  return useContext(StylesContext);
}

const NavContext = createContext<{ isTransparent: boolean }>({
  isTransparent: false,
});

export function useNav() {
  return useContext(NavContext);
}

