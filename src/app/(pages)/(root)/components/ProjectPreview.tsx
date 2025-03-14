"use client";

// Core
import { useContext } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

// Contexts
import ProjectContext from "@/contexts/ProjectContext";

const ProjectModal = dynamic(() => import("@/components/ProjectModal"), {
  ssr: false,
});

const ProjectPreview = () => {
  const { projectSrc, closeModal } = useContext(ProjectContext);

  return (
    <>
      <AnimatePresence>
        {projectSrc && (
          <ProjectModal projectSrc={projectSrc} closeModal={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectPreview;
