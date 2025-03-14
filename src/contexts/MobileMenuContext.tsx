"use client";

import { ContextParentElement, ToggleMenu, MenuIsOpen } from "@/types";
import { createContext, useState, useEffect, useRef, useContext } from "react";
import debounce from "@/functions/debounce";
import ScrollLockContext from "./ScrollLockContext";

const MobileMenuContext = createContext({
  menuIsOpen: false,
  toggleMenu: () => {},
});

export const MobileMenuContextProvider = ({
  children,
}: ContextParentElement) => {
  const { scrollLock, scrollUnlock } = useContext(ScrollLockContext);
  const [menuIsOpen, setMenuIsOpen] = useState<MenuIsOpen>(false);

  const debounceCloseMenu = debounce(() => setMenuIsOpen(false), 100);

  const toggleMenu: ToggleMenu = () => setMenuIsOpen((o) => !o);

  useEffect(() => {
    window.onresize = () => debounceCloseMenu();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    menuIsOpen ? scrollLock() : scrollUnlock();
  }, [menuIsOpen, scrollLock, scrollUnlock]);

  return (
    <MobileMenuContext.Provider value={{ menuIsOpen, toggleMenu }}>
      {children}
    </MobileMenuContext.Provider>
  );
};

export default MobileMenuContext;
