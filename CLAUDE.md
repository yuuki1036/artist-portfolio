# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build production version
npm run build

# Production server
npm start

# Linting and formatting (using Biome)
npm run lint          # Check code quality
npm run lint:fix      # Auto-fix lint issues
npm run format        # Check formatting
npm run format:fix    # Auto-fix formatting

# Type checking
npm run tsc           # TypeScript compilation check

# Storybook
npm run storybook     # Start Storybook development server
npm run build-storybook # Build Storybook for production
```

## Architecture Overview

This is a multilingual artist portfolio built with Next.js 15 App Router, featuring Japanese as the default language with English support.

### Core Architecture Patterns

**Internationalization (i18n)**
- Routes are prefixed with locale: `/ja/...` and `/en/...`
- Middleware automatically redirects root `/` to `/ja` (default locale)
- Language settings in `src/i18n/settings.ts`
- Translation files in `public/locales/[lang].json`

**Database Layer**
- Dual setup: Prisma ORM + Supabase as database provider
- Prisma client singleton at `lib/prisma.ts` with development query logging
- Supabase client at `utils/supabase.ts` with environment validation
- Schema defines User/Work/Project/Contact models with proper relations

### Important Conventions

**Database (from rules.json)**
- Models: PascalCase, Fields: camelCase
- All models require `createdAt`/`updatedAt` timestamps
- Database tables use snake_case mapping (e.g., `@@map("user_profiles")`)
- Import Prisma client: `import { prisma } from '@/lib/prisma'`

**File Structure**
- Components use kebab-case naming
- Route structure follows `src/app/[lang]/...` pattern
- `src/components/` - Shared/common components only (e.g., language-switcher, navigation)
- Feature-specific components should be organized using "package by feature" within `src/app/` directories

**Environment Variables Required**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `DATABASE_URL`

### Key Implementation Details

**Middleware Behavior** (`src/middleware.ts`)
- Automatically redirects all non-localized paths to `/ja/...`
- Excludes API routes, Next.js internals, and static files
- Essential for proper i18n routing

**Code Quality Tools**
- Biome for linting/formatting (replaces ESLint/Prettier)
- TypeScript strict mode enabled
- Node.js 20.14.0+ and npm 10.7.0+ required