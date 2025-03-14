"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import ScrollLockContext from "./ScrollLockContext";
import {
  ContextParentElement,
  ProjectContext,
  PreviewProject,
  CloseModal,
} from "@/types";

const ProjectContext = createContext<ProjectContext>({
  projectSrc: "",
  previewProject: (url) => {},
  closeModal: () => {},
});

export const ProjectContextProvider = ({ children }: ContextParentElement) => {
  // Project Preview Source
  const [projectSrc, setProjectSrc] = useState<string | null>(null);
  const { scrollLock, scrollUnlock } = useContext(ScrollLockContext);

  const previewProject: PreviewProject = (url) => {
    setProjectSrc(url);
  };

  const closeModal: CloseModal = useCallback(() => setProjectSrc(null), []);

  useEffect(() => {
    projectSrc ? scrollLock() : scrollUnlock();
  }, [projectSrc, scrollLock, scrollUnlock]);

  return (
    <ProjectContext.Provider value={{ projectSrc, previewProject, closeModal }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
