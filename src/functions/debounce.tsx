import { DebounceFunction } from "@/types";

const debounce: DebounceFunction<(...args: any[]) => any> = (func, timeout = 300) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export default debounce;
