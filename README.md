# FPS Error Code Reference

A searchable reference site for UK Faster Payments Scheme (FPS) error codes. Look up any FPS rejection or return code and get plain English explanations, common causes, and remediation steps.

**Live at [fpserrorcodes.co.uk](https://fpserrorcodes.co.uk)**

## Features

- 64 FPS error codes (50 REJ + 14 RET) with full documentation
- Fuzzy search with keyboard shortcut (Cmd+K)
- Filter by type (REJ/RET), category, and severity
- Individual pages per error code with structured data (JSON-LD)
- Dark/light mode
- Fully static, fast loading

## Tech Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Search**: Fuse.js (client-side fuzzy search)
- **Data**: TypeScript files in `/data/` (no database)
- **Hosting**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
npx tsc --noEmit # TypeScript type check
```

## Data

All 64 FPS error codes are in `/data/codes/fps.ts`, validated against 7 authoritative sources including Pay.UK, LHV Connect, NatWest, RBS, ClearBank, and Banking Circle.

Each code includes: detailed explanation, common causes, customer-facing message, remediation steps, severity classification, and related code cross-references.

## Contributing

This repo uses branch protection on `main`. All changes require a pull request with at least 1 review.

To add or update error codes, edit `/data/codes/fps.ts` and submit a PR.
