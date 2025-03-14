import { useEffect, useState, useRef } from "react";

interface ScrollDelta {
  scrolledUp: boolean;
  scrolledDown: boolean;
  scrollPosition: number;
}

const useScrollDelta = (delta: number = 5): ScrollDelta => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [scrolledUp, setScrolledUp] = useState<boolean>(false);
  const [scrolledDown, setScrolledDown] = useState<boolean>(false);

  // flag to track the first fired scroll event
  // we want to disable firing the first scroll event
  // but fire it each time after a timeout
  const isFirstScrollFired = useRef(true);

  useEffect(() => {
    // Helper function to handle the scroll event and set the scrolledUp and scrolledDown state
    const handleScroll = () => {
      // return it it's the first fired scroll event
      if (isFirstScrollFired.current) {
        isFirstScrollFired.current = false;
        return;
      }

      const currentPosition = window?.scrollY || 0;

      if (Math.abs(currentPosition - scrollPosition) >= delta) {
        setScrolledUp(currentPosition < scrollPosition);
        setScrolledDown(currentPosition > scrollPosition);
        setScrollPosition(currentPosition);
      }
    };

    // Throttle the scroll event to avoid firing it too frequently
    const throttleScroll = () => {
      let isThrottled = false;

      return (event: Event) => {
        if (!isThrottled) {
          handleScroll();
          isThrottled = true;

          setTimeout(() => {
            isThrottled = false;
          }, 70); // Adjust the throttle time (in milliseconds) as needed
        }
      };
    };

    const throttledScrollHandler = throttleScroll();

    // Attach the event listener
    window.addEventListener("scroll", throttledScrollHandler);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      isFirstScrollFired.current = true;
    };
  }, [delta, scrollPosition]);

  return {
    scrolledUp,
    scrolledDown,
    scrollPosition,
  };
};

export default useScrollDelta;
