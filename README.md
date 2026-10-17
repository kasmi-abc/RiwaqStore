# RiwaqStore

Online Islamic bookstore built with Next.js (App Router), Tailwind CSS, Drizzle ORM and Neon PostgreSQL.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon PostgreSQL connection string. Optional: without it the shop runs on seed data + browser storage. |
| `NEXTAUTH_SECRET` | Signs admin sessions. Required in production. |
| `NEXTAUTH_URL` | Base URL of the site, e.g. `http://localhost:3000`. |
| `ADMIN_EMAIL` | Admin sign-in email. |
| `ADMIN_PASSWORD` | Admin sign-in password. |

## Database

Create the tables:

```bash
npx drizzle-kit push
```

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |

## Structure

- `app/` — pages and API routes
- `components/` — UI components
- `lib/` — catalog data, store state, auth, database schema
- `public/` — static assets (logo, favicon, book covers)
