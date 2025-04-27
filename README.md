# RecruitPro AI

RecruitPro AI is a next-generation recruitment matching platform that accelerates hiring by combining advanced AI algorithms, flexible matching strategies, and bilingual support.

---

## 🚀 Key Features

- **AI-Powered Matching**: Deep semantic analysis of job descriptions and resumes via Google Gemini 2.0 Flash Lite.
- **Skill & Batch Matching**: Lightweight skill-overlap and scalable batch matching alternatives.
- **Bilingual UI**: Full English/Japanese support using next-i18next and custom context provider.
- **API Key Rotation**: Database-driven, fault-tolerant rotation of multiple Gemini API keys.
- **Reporting Suite**: Exportable HTML, PDF, and Markdown reports (match details, candidate comparisons, hiring progress, skill-gap analysis).
- **Modern Frontend**: Next.js with App Router, React, and Tailwind CSS for responsive, accessible UI.
- **Serverless Backend**: Edge-deployed Next.js API routes on Cloudflare Workers with D1 (SQLite-compatible) for dev/test and Cloudflare Postgres for prod.

---

## 📐 Proposed State-of-the-Art Architecture

To maximize scalability, reliability, and maintainability, we recommend the following architecture:

```
Monorepo (Nx)                   CI/CD (GitHub Actions)
├ frontend/                      ├ lint & format
│ └ Next.js App Router           ├ unit & integration tests
├ services/                      └ deploy to Cloudflare Pages & Workers
│ ├ ai-service/                  
│ │ └ AI matching microservice   Observability (Sentry, OpenTelemetry)
│ ├ report-service/              
│ └ auth-service/                Message Bus (Cloudflare Queues)
└ libs/                          
  ├ api-utils/                   Data Layer
  ├ i18n/                         ├ D1 (dev/test)
  └ gemini-client/                └ Managed Postgres (prod)
```

- **Type-safe API**: tRPC or GraphQL for end-to-end typing between frontend and services.
- **Microservices**: Decouple AI, reporting, and auth logic into independently deployable Workers or Cloud Run services.
- **Asynchronous Processing**: Use Cloudflare Queues for batch matching and report generation.
- **ORM & Migrations**: Prisma for schema management; D1 for local/dev, Cloudflare Postgres for production.
- **Edge Caching**: Utilize Cloudflare CDN and Workers cache for static assets and high-read endpoints.
- **Internationalization**: next-i18next with fallback and auto-detection, custom React context for runtime language switching.
- **Observability**: Centralized logging and tracing with Sentry and OpenTelemetry.

---

## 🏗️ Project Structure

```
recruitment-app/
├ app/                # Next.js routes & pages (API & UI)
├ components/         # Shared React components
├ hooks/              # Custom React hooks
├ services/           # Independent microservices
├ libs/               # Core utilities and clients
├ migrations/         # Database SQL migrations
├ public/             # Static assets & locales
├ docs/               # Detailed docs (architecture, deployment, user guide)
├ .env.example        # Template for environment variables
├ package.json        # Dependencies & scripts
└ wrangler.toml       # Cloudflare config
```

---

## 🛠️ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/recruitment-app.git
   cd recruitment-app
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy `.env.example` to `.env` and populate:
   ```dotenv
   GEMINI_API_KEY_1=...
   # up to GEMINI_API_KEY_10
   DATABASE_URL=...
   DEFAULT_LANGUAGE=en
   ```
4. Initialize the database:
   ```bash
   wrangler d1 execute DB --local --file=migrations/0001_initial.sql
   ```
5. Start development server:
   ```bash
   pnpm dev
   ```

---

## 🧪 Testing & CI

- **Unit & Integration**: Jest with >90% coverage.
- **End-to-End**: Playwright or Cypress via `/test-dashboard`.
- **CI Pipeline**: GitHub Actions for lint, tests, and deployment.

---

## 📚 Documentation

- **Technical Architecture**: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Deployment Guide**: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- **User Guide**: [docs/USER_GUIDE.md](docs/USER_GUIDE.md)

---

## 🔒 Security & Best Practices

- Never commit secrets; use `.env` and CI secrets.
- Strict separation of dev/test/prod environments.
- Automated key rotation and error handling for AI API.
- High coverage tests and peer-reviewed PRs.

---

## License

This project is **proprietary software** and is the exclusive property of **Shristyverse LLC**. All rights reserved.

- **Not Open Source**: This codebase is not licensed for open source use, distribution, or modification by third parties.
- **Intended Use**: The software is intended to be offered as a SaaS (Software as a Service) by Shristyverse LLC.

## Company & Contact
- **Company**: Shristyverse LLC
- **Contact Email**: info@shristyverse.com
- **Website**: [shristyverse.com](https://shristyverse.com)
