# Vehicle Registration & Management Platform

A production-grade vehicle registration and management dashboard built with React, TanStack Query, React Hook Form, and Zod.

## Features

- **Public vehicle listing** — Browse all registered vehicles without authentication
- **Client-side authentication** — Secure mock login with Context API + localStorage persistence
- **Protected routes** — Dashboard, registration, and detail views require login
- **Multi-step registration form** — 3-step wizard (Vehicle Info → Owner Info → Registration & Insurance)
- **Strict client-side validation** — Zod schemas mirror backend rules exactly (enums, regex, conditional fields)
- **Segmented detail view** — Tabbed interface fetching `/info`, `/owner`, `/registration`, `/insurance` independently
- **Full CRUD** — Create, view, edit, and delete vehicles with confirmation modals
- **TanStack Query caching** — Queries cached per segment; mutations auto-invalidate
- **Toast notifications** — Success/error feedback via react-hot-toast
- **Professional dark UI** — Tailwind CSS v4 with a slate/indigo design system

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + Vite | UI framework & build tool |
| React Router v7 | Client-side routing & protected routes |
| TanStack Query v5 | Data fetching, caching, mutations |
| React Hook Form + Zod | Form state & validation |
| Axios | HTTP client |
| Tailwind CSS v4 | Styling |
| react-hot-toast | Toast notifications |
| lucide-react | Icons |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Demo Credentials

```
Email:    test@gmail.com
Password: Password!234
```

## State Management Approach

- **AuthContext** — Wraps the app and exposes `isAuthenticated`, `login()`, `logout()`. Session flag persisted in `localStorage` so users stay logged in on refresh.
- **TanStack Query** — All GET requests use `useQuery` with granular query keys (e.g. `["vehicle-info", id]`). This means switching tabs on the details page only fetches the segment once and caches it. POST/PUT/DELETE use `useMutation` which calls `invalidateQueries` on success to keep the list fresh.
- **React Hook Form** — Each form step manages its own local state. The parent `VehicleForm` accumulates step data in a `formData` object and merges it on final submit.

## Project Structure

```
src/
├── app/
│   ├── queryClient.js       # TanStack Query client
│   └── router.jsx           # All routes (public + protected)
├── components/
│   ├── FormInput.jsx        # Reusable input with error state
│   ├── Navbar.jsx           # Auth-aware navigation
│   ├── ProtectedRoute.jsx   # Route guard
│   ├── Table.jsx            # Vehicle data table
│   └── Tabs.jsx             # Tabbed content switcher
├── context/
│   └── AuthContext.jsx      # Auth state + login/logout
├── pages/
│   ├── VehicleForm/
│   │   ├── index.jsx        # Multi-step orchestrator
│   │   ├── Step1.jsx        # Vehicle info
│   │   ├── Step2.jsx        # Owner info
│   │   └── Step3.jsx        # Registration & insurance
│   ├── Dashboard.jsx        # Protected admin view
│   ├── Home.jsx             # Public vehicle list
│   ├── Login.jsx            # Auth form
│   └── VehicleDetails.jsx   # Segmented detail tabs
└── services/
    ├── api.js               # Axios instance
    └── validation.js        # Zod schemas for all 3 steps
```

## API

Base URL: `https://student-management-system-backend.up.railway.app/api/vehicle-service`

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/vehicle` | Public |
| POST | `/vehicle` | Required |
| PUT | `/vehicle/:id` | Required |
| DELETE | `/vehicle/:id` | Required |
| GET | `/vehicle/:id/info` | Required |
| GET | `/vehicle/:id/owner` | Required |
| GET | `/vehicle/:id/registration` | Required |
| GET | `/vehicle/:id/insurance` | Required |
