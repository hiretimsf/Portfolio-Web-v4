# Development

This guide provides instructions on how to set up and run the project locally.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/hiretimsf/hiretimsf.com.git
cd hiretimsf.com
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Then, update the necessary environment variables inside `.env.local`.

### 4. Run the development server

```bash
npm run dev
```

The application should now be available at http://localhost:1408

## Building for Production

```bash
npm run build
```

After building, start the application with:

```bash
npm run start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run preview` | Build and preview locally |
| `npm run lint` | Run ESLint |
| `npm run format:write` | Format code with Prettier |
