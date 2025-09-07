
## Project Overview

The goal is to build an internship job board.

**Phase 1 (MVP):**
- Public-facing site for students to browse and apply for internships.
- Private, password-protected admin panel for managing internship offers.

## Key Features

### Public Site
- **Job Board:** List all active internships.
- **Offer Details:** Show full internship description and an "Apply" button.
- **Application:** The "Apply" button will redirect to an external link or a `mailto:` address.

### Admin Panel
- **Authentication:** Simple password protection (stored as an environment variable).
- **CRUD:** Create, Read, Update, and Delete internship offers.
- **Activation:** Mark offers as active or inactive.

## Tech Stack

- **Frontend:** Next.js
- **UI:** shadcn
- **Backend/DB:** Supabase
- **Deployment:** Vercel

## Data Model (Supabase)

### `offers` table:
- `id` (uuid, pk)
- `company_id` (uuid, fk -> companies.id, nullable)
- `title` (text)
- `location` (text)
- `field` (text)
- `duration` (text)
- `description` (text)
- `apply_url` (text)
- `is_active` (boolean, default: true)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `companies` table (optional for now):
- `id` (uuid, pk)
- `name` (text)
- `website` (text)
- `created_at` (timestamp)

## Important Notes

- **Admin Password:** Stored in an environment variable, not in Supabase Auth for Phase 1.
- **SEO:** Job pages should be server-side rendered (SSR) for better SEO.
- **Responsive Design:** The application should be mobile-friendly.
- **App content language:** The application should be written in french as it is made for french speaking users.

