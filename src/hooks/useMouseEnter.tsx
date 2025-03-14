"use client";

import { RefObject, useEffect, useState } from "react";

export const useMouseEnter = (elementRef: RefObject<HTMLElement>) => {
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const handleMouseEnter = (e: MouseEvent) => setIsMouseEntered(true);
    const handleMouseLeave = (e: MouseEvent) => setIsMouseEntered(false);

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [elementRef]);

  return { isMouseEntered };
};
