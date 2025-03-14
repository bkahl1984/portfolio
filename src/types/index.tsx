import { ReactNode } from "react";

export type DebounceFunction<T extends (...args: any[]) => any> = (
  func: T,
  timeout?: number
) => (...args: Parameters<T>) => void;

export interface BurgerButtonProps {
  isOpen: boolean;
  toggleMenu: ToggleMenu;
}

export type IsDarkMode = boolean;
export type ToggleMenu = () => void;
export type ToggleDarkMode = () => void;
export type PreviewProject = (url: string) => void;
export type GetScrollbarWidth = number;
export type MenuIsOpen = boolean;
export type ReviewCardRef = HTMLDivElement | null;
export type ProjectModalRef = HTMLIFrameElement | null;
export type TimeoutRef = ReturnType<typeof setInterval> | undefined;
export type IsMobile = boolean;
export type CloseModal = () => void;

export interface MenuLinksProps {
  isMobile?: IsMobile;
  toggleMenu?: ToggleMenu;
}

export interface StyledLinksProps {
  $isMobile: IsMobile;
}

export interface StyledExpCardProps {
  $secondary?: boolean;
}

export interface NextjsImageAssetProps {
  src: string;
  height: number;
  width: number;
  blurWidth: number;
  blurHeight: number;
}

export interface Icon {
  src: string;
  alt: string;
}

// DATA
export interface Expertise {
  icon: string;
  title: string;
  description?: string;
}

export type ExpertiseCardProps = Expertise & {};

export interface ExpertiseGroup {
  groupTitle: string;
  groupCards: Expertise[];
}

export interface Project {
  img: string;
  title: string;
  description?: string;
  previewLink?: string;
  codeLink?: string;
  soon?: boolean;
  isVisible?: boolean;
}

export interface Experience {
  timerange: string;
  position: string;
  company: string;
  chips: string[];
  description?: string;
  icons?: Icon[];
}

export interface ContactBtn {
  href: string;
  ariaLabel?: string;
  icon: string;
}

export interface PreviewLink {
  title: string;
  link: string;
}

// UI
export interface ExperienceCardProps extends Experience {
  secondary?: boolean;
  preview?: PreviewLink
}

export interface SectionTitleProps {
  children: string;
  id?: string;
}

export interface SectionSubtitleProps {
  children: string;
  className?: string;
}

export interface SectionDescriptionProps {
  className?: string;
  children: string | ReactNode;
}

export interface ProjectModalProps {
  projectSrc: string;
  closeModal: CloseModal;
}

export interface ProjectSlideProps extends Project {
  previewProject: PreviewProject;
}

export interface StyledModalWrapperProps {
  $scrollbarCompensation: number | null;
}

export interface ModalWrapperProps {
  closeModal: CloseModal;
  children: ReactNode;
}

export interface StyledThemeProviderProps {
  children: ReactNode;
}

// Functions
export type ThrottleCallback = (...args: any[]) => void;

// Context
export interface ContextParentElement {
  children: ReactNode;
}

export interface ProjectContext {
  projectSrc: string | null;
  previewProject: PreviewProject;
  closeModal: CloseModal;
}

export type FormInputs = {
  name: string;
  email: string;
  message: string;
};

export type Review = {
  reviewText: JSX.Element;
  name: string;
  position?: string;
  company?: string;
  photo?: string;
};
