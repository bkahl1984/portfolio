import { ThrottleCallback } from "@/types";

const throttle = <T extends ThrottleCallback>(cb: T, delay = 50) => {
  let wait = false;

  return (...args: Parameters<T>) => {
    if (wait) {
      return;
    }

    cb(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
};

export default throttle;
