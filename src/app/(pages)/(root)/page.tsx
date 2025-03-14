// Sections
import Main from "./components/01_Main";
import About from "./components/02_About";
import Experience from "./components/03_Experience";
import Projects from "./components/04_Projects";
// import Reviews from "./components/05_Reviews";
import Contact from "./components/06_Contact";

import ProjectPreview from "./components/ProjectPreview";
// import YouTubeSection from "./components/YouTubeSection";

export default function Page() {
  return (
    <>
      <Main />
      <About />
      <Experience />
      <Projects />
      {/* <YouTubeSection /> */}
      {/* <Reviews /> */}
      <Contact />
      <ProjectPreview />
    </>
  );
}
