# Deployment Guide

How to deploy the FPS Error Codes site to production.

---

## Recommended: Vercel (Free Tier)

Vercel is the creator of Next.js and offers the best deployment experience with generous free tier limits.

### Free Tier Includes
- 100GB bandwidth/month
- Serverless Functions
- Automatic HTTPS
- Preview deployments for PRs
- Edge network (global CDN)

### Option 1: Deploy via CLI

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy (from project root)
cd fps-error-codes
vercel

# 4. For production deployment
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"** → Select your repo
4. Vercel auto-detects Next.js settings
5. Click **"Deploy"**

That's it! Vercel handles everything automatically.

---

## Alternative: Netlify (Free Tier)

### Free Tier Includes
- 100GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS

### Setup

```bash
# 1. Install the Next.js plugin
npm install -D @netlify/plugin-nextjs

# 2. Create netlify.toml in project root
```

Create `netlify.toml`:
```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"

[build]
  command = "npm run build"
  publish = ".next"
```

### Deploy via CLI

```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Login
netlify login

# 3. Deploy
netlify deploy --prod
```

### Deploy via GitHub

1. Push code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect your GitHub repo
5. Deploy

---

## Alternative: Cloudflare Pages (Free Tier)

### Free Tier Includes
- **Unlimited bandwidth** (best free tier for bandwidth)
- 500 builds/month
- Global CDN

### Setup

```bash
# Install the Cloudflare adapter
npm install -D @cloudflare/next-on-pages
```

### Deploy via Dashboard

1. Push code to GitHub
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages**
3. Click **"Create a project"** → **"Connect to Git"**
4. Select your repository
5. Configure build settings:
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Build output directory**: `.vercel/output/static`
6. Click **"Save and Deploy"**

---

## Environment Variables

No environment variables are required for the basic deployment. The app uses static data compiled at build time.

For future enhancements (analytics, custom domain):

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Production URL for sitemap/SEO | `https://fps-codes.com` |

Set in your hosting provider's dashboard under **Settings → Environment Variables**.

---

## Custom Domain Setup

### Vercel
1. Go to **Project Settings** → **Domains**
2. Add your domain (e.g., `fps-codes.com`)
3. Update your DNS records as instructed:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`

### Free Subdomains
- **Vercel**: `your-project.vercel.app`
- **Netlify**: `your-project.netlify.app`
- **Cloudflare**: `your-project.pages.dev`

---

## Post-Deployment Checklist

After deploying, verify everything works:

- [ ] Homepage loads with search bar
- [ ] Search returns results (try "1114")
- [ ] Code detail pages load (e.g., `/code/fps/1114`)
- [ ] Dark mode toggle works
- [ ] Browse page filters work
- [ ] Copy buttons work
- [ ] `/sitemap.xml` is accessible
- [ ] `/robots.txt` is accessible

### Update Production URLs

Edit these files with your production domain:

**`app/sitemap.ts`**
```typescript
const baseUrl = "https://your-domain.com"; // Update this
```

**`app/robots.ts`**
```typescript
sitemap: "https://your-domain.com/sitemap.xml", // Update this
```

---

## Updating the Site

### With Vercel + GitHub (Recommended)

Vercel auto-deploys when you push to `main`:

```bash
# Make changes locally
git add .
git commit -m "Update error codes"
git push origin main

# Vercel automatically deploys!
```

### Manual Deploy

```bash
vercel --prod
```

---

## Performance Verification

Run a Lighthouse audit on your deployed site:

1. Open Chrome DevTools (F12)
2. Go to **Lighthouse** tab
3. Run audit on:
   - Homepage
   - A code detail page (e.g., `/code/fps/1114`)

**Target Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

---

## Troubleshooting

### Build Fails

```bash
# Check for errors locally first
npm run build

# Check TypeScript errors
npx tsc --noEmit

# Check lint errors
npm run lint
```

### Pages Not Loading

- Verify `generateStaticParams` is returning all codes
- Check the build output for generated pages count
- Ensure data files export correctly

### Search Not Working

- Verify `/api/search-data` returns JSON
- Check browser console for errors
- Ensure Fuse.js is loading correctly

---

## Comparison Table

| Feature | Vercel | Netlify | Cloudflare |
|---------|--------|---------|------------|
| Bandwidth | 100GB/mo | 100GB/mo | **Unlimited** |
| Build Minutes | 6000/mo | 300/mo | 500/mo |
| Next.js Support | **Native** | Plugin | Plugin |
| Setup Difficulty | Easy | Easy | Medium |
| Free SSL | Yes | Yes | Yes |
| Preview Deploys | Yes | Yes | Yes |

**Recommendation**: Use **Vercel** for the best Next.js experience, or **Cloudflare** if you expect high traffic.
