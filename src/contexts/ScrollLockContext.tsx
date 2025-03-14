"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { ContextParentElement, GetScrollbarWidth } from "@/types";

const DEFAULT_SCROLLBAR_WIDTH = 16;

const ScrollLockContext = createContext<{
  scrollbarCompensation: number | null;
  scrollLock: () => void;
  scrollUnlock: () => void;
}>({
  scrollbarCompensation: null,
  scrollLock: () => {},
  scrollUnlock: () => {},
});

export const ScrollLockContextProvider = ({ children }: ContextParentElement) => {
  const [scrollbarCompensation, setScrollBarCompensation] = useState<number | null>(null);
  // console.log("scrollbarCompensation: ", scrollbarCompensation);

  const scrollLock = useCallback(() => {
    const scrollbarWidth = window.innerWidth - document.body.offsetWidth;

    setScrollBarCompensation(scrollbarWidth);
  }, []);

  const scrollUnlock = useCallback(() => {
    setScrollBarCompensation(null);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (scrollbarCompensation !== null) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = scrollbarCompensation + "px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [scrollbarCompensation]);

  return (
    <ScrollLockContext.Provider
      value={{ scrollbarCompensation, scrollLock, scrollUnlock }}
    >
      {children}
    </ScrollLockContext.Provider>
  );
};

export default ScrollLockContext;
