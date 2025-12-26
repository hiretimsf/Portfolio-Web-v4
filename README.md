# [hiretimsf.com](https://hiretimsf.com)

A minimal portfolio and blog to showcase my work as a Frontend Developer.

Check out the live site: [hiretimsf.com](https://hiretimsf.com)

## Project Preview

<div align="center">
  <img src="docs/images/github-heading.jpg" alt="Desktop Preview" width="100%" />
</div>
<div align="center">
  <img src="docs/images/github-desktop-mockup.jpg" alt="Desktop Preview" width="100%" />
</div>
<div align="center">
  <img src="docs/images/github-mobile-mockup.jpg" alt="Mobile Preview" width="100%" />
</div>

## Overview

### Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com), [Radix UI](https://www.radix-ui.com)
- **Animations**: [Motion](https://motion.dev)
- **Content**: [Fumadocs](https://fumadocs.vercel.app) (MDX)
- **State Management**: [Nuqs](https://nuqs.47ng.com) (URL state), [Jotai](https://jotai.org)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics), [PostHog](https://posthog.com)
- **Deployment**: [Vercel](https://vercel.com)

### Features

- 🎨 **Modern Design**: Clean, minimal, and responsive UI with dark mode support.
- ⚡ **High Performance**: Optimized for speed with Next.js App Router and server components.
- 📱 **Mobile First**: Fully responsive layout ensuring great experience on all devices.
- 🔍 **SEO Optimized**: Built-in SEO best practices, JSON-LD schema, sitemap, and robots.txt.
- 📝 **MDX Blog**: Content management using Fumadocs with MDX support.

## Architecture

### Folder Structure

```
├── actions/        # Server actions
├── app/            # Next.js App Router pages and layouts
├── components/     # Reusable UI components
├── config/         # Configuration files (site, SEO, navigation)
├── features/       # Feature-based modules (blog, home, projects)
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and libraries
├── public/         # Static assets (images, fonts)
├── scripts/        # Build and utility scripts
├── styles/         # Global styles and Tailwind configuration
└── types/          # TypeScript type definitions
```

## Performance

This project is built with performance in mind:

- **Core Web Vitals**: Optimized for LCP, FID, and CLS.
- **Image Optimization**: Using `next/image` for automatic resizing and format serving.
- **Font Optimization**: `next/font` for self-formatting Google Fonts.
- **Bundle Analysis**: Regular checks to keep bundle size small.

## Development

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/hiretimsf/hiretimsf.com.git
cd hiretimsf.com
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Copy the template file
cp env.template .env.local

# Edit .env.local with your API keys
```

4. **Start development server**

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Scripts

| Command                | Description                  |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Start development server     |
| `npm run build`        | Build for production         |
| `npm run start`        | Start production server      |
| `npm run preview`      | Build and preview production |
| `npm run lint`         | Run ESLint                   |
| `npm run lint:fix`     | Fix ESLint errors            |
| `npm run format:write` | Format code with Prettier    |
| `npm run validate-seo` | Validate SEO configuration   |

## License

Licensed under the [MIT license](./LICENSE).

## Acknowledgments

- [React](https://react.dev)
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Motion](https://motion.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide](https://lucide.dev)
