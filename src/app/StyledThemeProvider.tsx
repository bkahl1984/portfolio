"use client";

import { useTheme } from "next-themes";
import { ThemeProvider } from "styled-components";
import { StyledThemeProviderProps } from "@/types";
import useMounted from "@/hooks/useMounted";

const darkTheme = {
  bg: "#050505",
  cardBg: "#242424",
  shine: "#363636",
  cyan: "#1B9AAA",
  // cyan: "#1ECBE1",
  cyanHover: "#2dacbd",
  error: "#E1341E",
  grey: "#B1B1B1",
  fg: "#F8F8F8",
  white: "#F8F8F8",
  overlay: "#242424",
};

const lightTheme = {
  bg: "#f6f6f6",
  cardBg: "#e4e4e4",
  shine: "#f2f2f2",
  cyan: "#1B9AAA",
  // cyan: "#1ECBE1",
  cyanHover: "#2dacbd",
  error: "#E1341E",
  grey: "#5d5c5c",
  fg: "#242424",
  white: "#F8F8F8",
  overlay: "#242424",
};

function StyledThemeProvider({ children }: StyledThemeProviderProps) {
  const isMounted = useMounted();
  const { resolvedTheme } = useTheme();

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeProvider theme={resolvedTheme === "dark" ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
}

export default StyledThemeProvider;
