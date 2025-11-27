# AI Agent Guidelines for hiretimsf.com

This guide provides essential information for AI agents working with the hiretimsf.com codebase - a Next.js dev portfolio website.

## Project Overview

**hiretimsf.com** is a minimal, pixel-perfect dev portfolio built with modern web technologies. It serves as:

- Personal portfolio for Tim (@hiretimsf)
- Showcase for work experience and projects

### Key Features

- **Clean & modern design** - Minimalist interface with attention to detail
- **Light/Dark themes** - Seamless theme switching with system preference support
- **vCard integration** - Downloadable contact card
- **SEO optimized** - JSON-LD schema, sitemap, robots.txt
- **PWA support** - Installable as Progressive Web App

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + custom components
- **Package Manager**: npm
- **Language**: TypeScript
- **Deployment**: Vercel

## Project Structure

### Key Directories

```
app/                      # Next.js App Router pages
components/               # Shared UI components
hooks/                    # Custom React hooks
lib/                      # Utility libraries
styles/                   # Global styles
public/                   # Static assets
```

### Important Files

- `app/layout.tsx` - Root layout
- `app/page.tsx` - Homepage
- `components.json` - shadcn/ui configuration
- `styles/globals.css` - Global styles

## Development Guidelines

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev  # Runs on port 1408

# Build for production
npm run build
```

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js configuration
- **Prettier**: Code formatting
- **File naming**: kebab-case for files, PascalCase for components

### Coding Guidelines

When writing code for this project, follow these principles:

**TypeScript & Documentation**

- Write type-safe TypeScript code with explicit types when necessary
- Add comments only when they clarify complex logic, function purpose, or non-obvious behavior
- Avoid obvious comments that merely restate the code
- Use descriptive variable and function names that make the code self-documenting
- Keep comments concise and focused on the "why" rather than the "what"

**Code Style**

- No emojis in code, comments, or commit messages
- Write clean, readable code that minimizes the need for extensive documentation
- Prefer self-explanatory code over commented code
- Use JSDoc for public APIs and exported functions when the signature alone isn't clear

**Best Practices**

- Follow SOLID principles and clean code practices
- Keep functions small and focused on a single responsibility
- Use meaningful names that reveal intent
- Write code that is easy to understand at first glance
- Avoid over-commenting; let the code speak for itself

### Styling Guidelines

- Use Tailwind CSS v4 syntax
- Follow existing color scheme (zinc-based)
- Support dark/light modes
- Use CSS variables for theme colors

## Environment & Configuration

### Environment Variables

See `.env.example` for required variables:

**Core Application**:

- `APP_URL` - Application base URL (e.g., `https://hiretimsf.com`)

## Deployment

### Vercel Deployment

- Automatic deployment from GitHub
- Environment variables configured in Vercel dashboard
- Build command: `npm run build`
- Output directory: `.next`

### Build Commands

```bash
npm run build          # Production build
npm run start          # Start production server
npm run preview        # Build and preview locally
```

## Contributing

### Code Quality

- Run `npm run lint` before committing
- Use `npm run format:write` for code formatting
- Check types with `npm run check-types`

---

**Note**: This is a personal portfolio project for Tim (@hiretimsf).
