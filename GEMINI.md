# GEMINI.md: Project Context for InternLink

## Project Overview

InternLink is a Next.js application designed to connect aspiring interns with companies offering internship opportunities. It aims to streamline the internship search and application process for students and provide companies with a targeted pool of qualified candidates. The project leverages React for its frontend, Tailwind CSS for styling, and ESLint for code quality. Based on the `PRD.md` file, Supabase is intended to be used for the database and authentication.

## Building and Running

To get started with the InternLink project, follow these steps:

- **Development Server:**
  ```bash
  npm run dev
  ```
  This command starts the development server, typically accessible at `http://localhost:3000`.

- **Build for Production:**
  ```bash
  npm run build
  ```
  This command compiles the project for production deployment.

- **Start Production Server:**
  ```bash
  npm run start
  ```
  After building, this command starts the Next.js production server.

- **Linting:**
  ```bash
  npm run lint
  ```
  This command runs ESLint to check for code quality and style issues.

## Development Conventions

- **Framework:** The project is built using Next.js, following its `app/` directory structure for routing and component organization.
- **UI Library:** React is used for building user interfaces, promoting a component-based development approach.
- **Styling:** Tailwind CSS is utilized for utility-first CSS styling, ensuring a consistent and efficient design system.
- **Code Quality:** ESLint is configured to maintain code quality and enforce consistent coding styles across the project.
- **Database & Auth:** The project is planned to integrate with Supabase for database management and user authentication.
