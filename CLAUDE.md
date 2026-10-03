# CLAUDE.md

Personal portfolio site for Brad Kahl. Next.js 13.4 (App Router) + TypeScript + styled-components, statically exported and deployed to GitHub Pages at `/portfolio`.

## Commands

- `npm run dev` — local dev server (no basePath)
- `npm run build` — production build (static export to `out/`)
- `npm run lint` — `next lint`
- No test suite exists.

## Deployment

- `.github/workflows/deploy.yml`: every push to `main` builds and deploys `./out` to GitHub Pages. Pushing to main = publishing.
- `next.config.js`: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`, and in production `basePath`/`assetPrefix` = `/portfolio`.
- Because it's a static export, server features (API routes, Notion blog fetching) don't work in production. `vercel.json` and the commented-out config in `next.config.js` are leftovers from an older Vercel setup.

## Assets & paths (important)

- Files in `public/` are referenced at runtime as `` `${process.env.NEXT_PUBLIC_URL ?? ""}/<file>` `` (the env var is set from a GitHub secret in CI and holds the base URL/path prefix; it's unset locally, so always keep the `?? ""` fallback or images break in dev).
  - Project images: `public/<img>` (e.g. `public/timebackwashandfold.png`), via `ProjectSlide.tsx`.
  - Tech icons: `public/assets/tech-icons/<name>.svg`, via `ExperienceCard.tsx` / `ExpertiseCard.tsx`.
  - Hero photo: `public/IMG_BKAHL-3.jpg` in `01_Main.tsx`.
  - Resume: `public/Brad_Kahl_Resume_March_2026.docx`, linked from `06_Contact.tsx`.
- Some images are static imports instead (`public/assets/bg.jpg`, `public/assets/blog/...`).
- `src/app/AssetPathProvider.ts` (`getPathProvider`) is not used anywhere.

## Content editing (most common task)

Nearly all site content lives in `src/data/` as JSON. Edit the JSON; components rarely need changes.

- `projects.json` — `{ title, description, projects: Project[] }`. Project fields: `img` (filename in `public/`), `title`, `description` (convention: `"Mon YYYY: ..."`), optional `previewLink`, `codeLink`, `soon`, and `isVisible` (only `true` is rendered; filtered in `ProjectsList.tsx`). Newest first.
- `experience.json` — `mainExperience[]`: `timerange`, `position`, `company`, `chips[]`, `description`, `icons[{ src, alt }]` (`src` = filename in `public/assets/tech-icons/`).
- `about.json` — expertise: `coreTools[{ icon, title }]`, `expertiseTable`.
- `contact.json`, `contactBtns.ts` — contact section and social buttons.
- `reviews.json` / `reviews.tsx`, `youtube.json`, `youtubeContentMocks/` — data for sections that are currently disabled.

Types for all of these are in `src/types/index.tsx` (`Project`, `Experience`, `Expertise`, etc.). Notion types are in `src/types/notion.ts`.

## Structure

```
src/
  app/
    layout.tsx              Root layout: Poppins font, metadata, Providers, Header/Footer, BackToTopBtn, Vercel Analytics
    Providers.tsx           StyledComponentsRegistry > next-themes > ScrollLock > MobileMenu > Project contexts > StyledThemeProvider
    StyledThemeProvider.tsx dark/light theme objects (bg, cardBg, cyan, grey, fg, ...); access with ${({ theme }) => theme.cyan}
    GlobalStyle.tsx         global CSS (createGlobalStyle)
    (pages)/(root)/page.tsx Home page: Main, About, Experience, Projects, Contact, ProjectPreview (Reviews and YouTube are commented out)
    (pages)/(root)/components/  01_Main ... 06_Contact section components, ProjectPreview (iframe modal)
    (pages)/blog/           Notion-backed blog (link in Nav is commented out; needs server-side env)
    api/sendgrid/route.ts   contact form email via nodemailer + SendGrid (doesn't work in a static export)
  components/               Shared UI (Section*, Container, Nav, MobileMenu, cards, modals, icons/, layout/, Blog/)
  sections/blog/            Blog page sections
  contexts/                 MobileMenu, Project (preview modal src), ScrollLock
  hooks/                    useContactForm, useMounted, useScrollDelta, useMouseEnter, useIsomorphicLayoutEffect
  lib/notion.ts             getPosts / getPostSlugs / getPostBySlug (react cache, Notion REST API)
  lib/registry.tsx          styled-components SSR registry
  utils/, functions/        helpers (formatDate, reading time, debounce/throttle, Vercel Blob image utils)
  features/                 framer-motion lazy feature bundles
  data/                     site content (see above)
```

## Conventions

- Path aliases: `@/*` → `src/*` (also `@/components/*`, `@/contexts/*`, `@/data/*`, `@/utils/*`).
- Styling: styled-components with BEM-ish nested class names inside one styled wrapper per component (e.g. `.projects__descr`, `.slider__arrow`). Transient props use the `$` prefix. Breakpoint used: `max-width: 991.98px`.
- Client components have `"use client"` at the top. Section components are wrapped in `memo`.
- Animations use framer-motion with `LazyMotion` features from `src/features/`.
- Swiper is used for the projects slider.

## Env vars

`NEXT_PUBLIC_URL` (asset base URL, the only one needed for the deployed site), plus server-only vars for unused features: `NOTION_TOKEN`, `NOTION_DATABASE_ID`, `NOTION_API_ENDPOINT`, `SENDGRID_KEY`, `NODEMAILER_EMAIL`, `YOUTUBE_API_KEY`. `.env*` files are gitignored.
