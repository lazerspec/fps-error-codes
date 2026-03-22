# FPS Error Code Reference

A searchable reference site for UK Faster Payments Scheme (FPS) error codes. Users search a code and get plain English explanations, common causes, and remediation steps.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Search**: Fuse.js (client-side fuzzy search)
- **Data**: TypeScript files in `/data/` (no database)

## Project Structure

```
app/
├── layout.tsx              # Root layout, fonts, metadata, ThemeProvider
├── page.tsx                # Homepage with hero + search
├── codes/page.tsx          # Browse all codes with filters
├── code/fps/[code]/page.tsx # Individual code detail (SSG)
├── api/search-data/route.ts # JSON endpoint for Fuse.js
├── sitemap.ts              # Dynamic sitemap generation
└── robots.ts               # Robots.txt

components/
├── SearchBar.tsx           # Main search with Fuse.js, ⌘K shortcut
├── CodeCard.tsx            # Code preview card for listings
├── CodeDetail.tsx          # Full code details display
├── CategoryFilter.tsx      # Type/category filter pills
├── CopyButton.tsx          # Copy to clipboard
├── Header.tsx              # Site header with nav
├── ThemeToggle.tsx         # Dark/light mode toggle
└── ui/                     # shadcn/ui primitives

data/
├── types.ts                # ErrorCode interface and types
├── codes/fps.ts            # All 64 FPS error codes with content
└── index.ts                # Exports and helper functions
```

## Key Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build (generates ~69 static pages)
npm run start    # Start production server
npm run lint     # Run ESLint
npx tsc --noEmit # TypeScript type check
```

## Data Model

Error codes are defined in `/data/codes/fps.ts` with this structure:

```typescript
interface ErrorCode {
  code: string;              // "1114" or "00000001"
  type: "REJ" | "RET";       // Rejection vs Return
  scheme: "FPS";             // Scheme identifier
  category: string;          // Account, System, Limits, etc.
  shortDescription: string;  // Brief description
  detailedExplanation: string; // Plain English, 2-3 sentences
  commonCauses: string[];    // Bullet points
  customerMessage: string;   // What to tell end user
  remediationSteps: string[]; // How to fix
  severity: "fatal" | "retryable";
  relatedCodes?: string[];   // Similar codes
}
```

## Adding New Error Codes

1. Edit `/data/codes/fps.ts`
2. Add new `ErrorCode` object to the `fpsErrorCodes` array
3. Run `npm run build` to generate the new static page

## URL Structure

- `/` - Homepage with search
- `/codes` - Browse all codes (supports `?type=REJ` and `?category=Account` filters)
- `/code/fps/[code]` - Individual code page (e.g., `/code/fps/1114`)

## Sub-Agents

Custom agent prompts are in `.claude/agents/`:

- `fps-data-researcher.md` - Research and compile error codes from official sources
- `fps-content-enhancer.md` - Transform raw codes into user-friendly content
- `build-verifier.md` - Validate build and all features before deployment
- `seo-auditor.md` - Check SEO implementation (meta tags, JSON-LD, sitemap)

## Deployment

- **Live site**: https://fpserrorcodes.co.uk
- **Hosting**: Vercel (auto-deploys from `main` branch)
- **Domain**: `fpserrorcodes.co.uk` registered via Namecheap, DNS pointed to Vercel
- **Branch protection**: `main` requires PR with 1 review, no direct pushes

## Design Notes

- Follows Stripe Docs aesthetic: clean, minimal, whitespace-heavy
- Uses Inter font for body, Geist Mono for code
- Dark mode support via next-themes
- Mobile responsive
