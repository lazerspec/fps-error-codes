# FPS Error Code Reference

A searchable reference site for UK Faster Payments Scheme (FPS) error codes. Users search a code and get plain English explanations, common causes, and remediation steps. The site also covers ISO 20022 external return-reason codes and a mapping between today's FPS codes and the ISO 20022 standard.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Search**: Fuse.js powering a global ⌘K command palette (shadcn `command` + `dialog`, i.e. cmdk + Radix Dialog)
- **Data**: TypeScript files in `/data/` (no database) — FPS codes, ISO 20022 codes, and FPS↔ISO mappings
- **Analytics**: Vercel Analytics + Speed Insights

## Project Structure

```
app/
├── layout.tsx                    # Root layout: fonts, metadata (+ OG/Twitter), ThemeProvider,
│                                 #   CommandPaletteProvider, global CommandPalette, footer nav
├── page.tsx                      # Homepage: hero search, stats strip, category grid,
│                                 #   ISO 20022 migration banner, quick links
├── codes/page.tsx                # Browse all codes with type/category filters
├── codes/mapping/page.tsx        # FPS → ISO 20022 mapping table
├── codes/future/page.tsx         # ISO 20022 codes (deep-linkable via ?code=AC04, scroll+highlight)
├── code/fps/[code]/page.tsx      # Individual code detail (SSG) + JSON-LD (TechArticle, BreadcrumbList)
├── code/fps/[code]/opengraph-image.tsx  # Per-code social image (next/og)
├── opengraph-image.tsx           # Site-wide social image (next/og)
├── faq/page.tsx                  # FAQ (FAQPage + BreadcrumbList JSON-LD)
├── glossary/page.tsx             # Payments glossary (DefinedTermSet JSON-LD)
├── developers/page.tsx           # JSON API docs
├── what-is-fps/page.tsx          # Primer on Faster Payments (Article JSON-LD)
├── references/page.tsx           # Data sources / provenance
├── api/search-data/route.ts      # Unified search index (FPS + ISO) for the palette
├── api/code/[scheme]/[code]/route.ts  # JSON API for a single code
├── sitemap.ts                    # Dynamic sitemap generation
└── robots.ts                     # Robots.txt

components/
├── CommandPalette.tsx            # Global ⌘K search over FPS + ISO codes (Fuse.js)
├── CommandPaletteProvider.tsx    # Open-state context for the palette
├── HeroSearch.tsx                # Homepage hero input that opens/seeds the palette
├── SearchTrigger.tsx             # Search button that opens the palette
├── HomeCategoryGrid.tsx          # Homepage category tiles with live counts
├── AtAGlance.tsx                 # Detail-page "can I retry?" key-facts card
├── CodeCard.tsx                  # Code preview card for listings
├── CodeDetail.tsx                # Full code details display
├── CategoryFilter.tsx            # Type/category filter pills
├── CopyButton.tsx                # Copy to clipboard
├── Header.tsx                    # Site header with nav + search trigger
├── ThemeToggle.tsx / ThemeProvider.tsx  # Dark/light mode (next-themes)
├── DisclaimerBanner.tsx          # "Unofficial reference" banner on code pages
├── ReportIssue.tsx               # Report-an-issue link on code pages
└── ui/                           # shadcn/ui primitives (badge, button, card, command, dialog, input, table)

data/
├── types.ts                      # ErrorCode, ISO20022Code, CodeMapping, SearchEntry + supporting types
├── codes/fps.ts                  # 64 FPS error codes with content
├── codes/iso20022.ts             # 104 ISO 20022 external return-reason codes
├── codes/mapping.ts              # 26 FPS ↔ ISO 20022 mappings
└── index.ts                      # Exports + helpers (getCodeBySlug, getSearchIndex, getCodesByCategory, …)
```

## Key Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build (generates ~140 static pages, incl. per-code OG images)
npm run start    # Start production server
npm run lint     # Run ESLint
npx tsc --noEmit # TypeScript type check
```

## Data Model

FPS error codes are defined in `/data/codes/fps.ts` with this structure:

```typescript
interface ErrorCode {
  code: string;              // "1114" (REJ, 4-digit) or "00000001" (RET, 8-digit)
  type: "REJ" | "RET";       // Reject (pre-acceptance) vs Return (post-acceptance)
  scheme: "FPS" | "ISO20022";// Scheme identifier
  category: string;          // Account, System, Limits, Format, Security, Agency, Other
  shortDescription: string;  // Brief description
  detailedExplanation: string; // Plain English, 2-3 sentences
  commonCauses: string[];    // Bullet points
  customerMessage: string;   // What to tell the end user
  remediationSteps: string[]; // How to fix
  severity: "fatal" | "retryable";
  relatedCodes?: string[];   // Similar codes
  lastVerified: string;      // ISO 8601 date this code was last checked against its source
  source: DataSource;        // Primary source (e.g. "LHV Connect", "ClearBank", "Pay.UK")
}
```

Related types in `/data/types.ts`:

- **`ISO20022Code`** — ISO 20022 external codes (`/data/codes/iso20022.ts`), with payment rails and an optional `legacyFpsCode`.
- **`CodeMapping`** — FPS ↔ ISO 20022 mappings (`/data/codes/mapping.ts`) with a confidence level.
- **`SearchEntry`** — the unified search-index entry (FPS + ISO) returned by `getSearchIndex()` / `/api/search-data` and consumed by the command palette.

## Adding New Error Codes

1. Edit `/data/codes/fps.ts`
2. Add a new `ErrorCode` object to the `fpsErrorCodes` array (include `lastVerified` and `source`)
3. Run `npm run build` to generate the new static page and its OG image

## URL Structure

- `/` — Homepage (hero search, stats, category grid, ISO migration banner, quick links)
- `/codes` — Browse all codes (supports `?type=REJ` and `?category=Account` filters)
- `/code/fps/[code]` — Individual code page (e.g. `/code/fps/1114`)
- `/codes/mapping` — FPS → ISO 20022 mapping table
- `/codes/future` — ISO 20022 codes (`?code=AC04` deep-links and highlights a row)
- `/faq`, `/glossary`, `/developers`, `/what-is-fps`, `/references` — content pages
- `/api/code/[scheme]/[code]`, `/api/search-data` — read-only JSON endpoints

## Search

A global command palette (`components/CommandPalette.tsx`, opened with ⌘K/Ctrl+K or the header button) searches FPS + ISO codes with Fuse.js over `/api/search-data`. FPS results link to `/code/fps/[code]`; ISO results deep-link to `/codes/future?code=…`.

## Sub-Agents

Custom agent prompts are in `.claude/agents/` (gitignored locally):

- `fps-data-researcher.md` - Research and compile error codes from official sources
- `fps-content-enhancer.md` - Transform raw codes into user-friendly content
- `build-verifier.md` - Validate build and all features before deployment
- `seo-auditor.md` - Check SEO implementation (meta tags, JSON-LD, sitemap)

## Deployment

- **Live site**: https://fpserrorcodes.co.uk
- **Hosting**: Vercel (auto-deploys from `main` branch; PRs get preview deployments)
- **Domain**: `fpserrorcodes.co.uk` registered via Namecheap, DNS pointed to Vercel
- **Branch protection**: `main` requires PR with 1 review, no direct pushes

## Design Notes

- Follows Stripe Docs aesthetic: clean, minimal, whitespace-heavy
- Uses Inter font for body, Geist Mono for code
- Dark mode support via next-themes; mobile responsive
- Global ⌘K command palette; per-code Open Graph images; JSON-LD on key pages
  (TechArticle, FAQPage, DefinedTermSet, Article, BreadcrumbList)
```
