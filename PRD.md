PRD – Internship Platform (Phase 1 MVP)

1. Goal

Create a public internship job board where students can discover offers and apply via external links or emails. Companies don’t have accounts yet. Admin (you) manages offers manually via a private password-protected page.

⸻

2. Users & Use Cases
	•	Students (public)
	•	Browse internship offers
	•	Filter/search offers
	•	Click “Apply” → external link or mailto email
	•	Admin (private)
	•	Login with a simple password
	•	Add/edit/delete internship offers
	•	Mark offers active/inactive

⸻

3. Features

3.1 Public Job Board
	•	Home page listing all active offers
	•	Each offer card shows:
	•	Title
	•	Company name
	•	Location
	•	Duration
	•	Field
	•	Clicking opens offer detail page with description + “Apply” button

3.2 Offer Detail Page
	•	Full description
	•	“Apply” button → external link or mailto:

3.3 Admin Panel (password protected)
	•	Login page (single password stored in env variable)
	•	CRUD for offers:
	•	Create new internship
	•	Edit existing internship
	•	Delete or deactivate offers
	•	Simple table UI (shadcn)

⸻

4. Tech Stack
	•	Frontend: Next.js + Shadcn
	•	Backend/DB: Supabase
	•	Deployment: Vercel
	•	Admin Auth: environment-based password (not Supabase Auth in Phase 1)

⸻

5. Data Model (Supabase)

Table: companies (optional now, future HR portal)

id uuid pk  
name text  
website text  
created_at timestamp  

Table: offers

id uuid pk  
company_id uuid fk → companies.id (nullable)  
title text  
location text  
field text  
duration text  
description text  
apply_url text  
is_active boolean default true  
created_at timestamp  
updated_at timestamp  


⸻

6. Non-Functional Requirements
	•	SEO friendly (SSR job pages in Next.js)
	•	Mobile responsive (shadcn and tailwindcss)
	•	Admin page not public (password protected route)

⸻

7. Phase 1 Out of Scope
	•	Student accounts
	•	HR portal
	•	Feedback system
	•	Paid tiers