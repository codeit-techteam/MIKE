# Mike

Personal AI memory assistant marketing site for [michaelross.ai](https://michaelross.ai/).

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger via `@gsap/react` `useGSAP()`
- Sanity.io (`next-sanity`) for the Blog / Insights CMS

## Develop

```bash
npm install
cp .env.example .env.local
# Fill NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_READ_TOKEN
npm run dev
```

- Site: http://localhost:3000
- Blog: http://localhost:3000/blog
- Studio: http://localhost:3000/studio

## Sanity

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) (dataset: `production`).
2. Add CORS origins with credentials: `http://localhost:3000` and `https://michaelross.ai`.
3. Create a Viewer API token and set `SANITY_API_READ_TOKEN`.
4. Open `/studio`, create an Author, Category, then a Post with `publishedAt` set.
5. Optional hosted Studio: `npm run sanity:deploy`.

## Quality

```bash
npm run lint
npm run typecheck
npm run build
```
