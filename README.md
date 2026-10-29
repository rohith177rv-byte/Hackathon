# BuildConnect - Multi-Engineer Construction Marketplace (Frontend)

A complete, responsive frontend application for **BuildConnect** — an engineering and construction marketplace connecting property owners, builders, and developers with certified civil engineers, structural consultants, and architects.

---

## 🚀 Key Features

### 1. 🌟 Public Discovery & Showcase
- **Home (`/`)**: Hero banner with live search (specialization, district, keyword), dynamic metrics counter (150+ engineers, ₹140 Cr+ project value), service catalog preview, featured engineers carousel, completed projects showcase, interactive cost estimator preview, and "How it works" 4-step workflow.
- **Find Engineers Directory (`/engineers`)**:
  - Cascading hierarchical district filter for Karnataka (Ballari, Bengaluru, Mysuru, Dakshina Kannada, etc.).
  - Filters by minimum experience (3+, 5+, 10+ yrs), rating (4.0+, 4.5+, 4.8+), verified licenses only, and 9 engineering specializations.
  - Sorting: Highest Rated, Most Experienced, Price Low to High, Name A-Z.
  - Active filter chips with one-click removal.
  - Paginated results.
- **Engineer Profile Detail (`/engineers/:id`)**:
  - Professional bio, VTU/NIT/IIT credentials, municipal license registration numbers, and years of experience.
  - 4 interactive tabs: Overview & Bio, Services & Rates, Portfolio Projects, Client Reviews with 5-star rating breakdown.
  - Sticky consultation request card with "Request Free Quote" modal and "Compare Profile" toggle.
- **Construction Services Catalog (`/services`)**:
  - Detailed catalog for Structural Engineering, Architectural Planning, Turnkey Contracting, Interior Architecture, MEP & HVAC, and Valuation/Stability Audits.
  - Standard market benchmark pricing (e.g. ₹12–₹28/sq.ft for structural design, ₹1,850–₹2,750/sq.ft for civil contracting).
  - Deliverables checklist for each discipline with direct links to find specialized engineers.
- **Completed Projects Gallery (`/projects`)**:
  - Filter by category (Residential, Commercial, Renovation, Industrial) and keyword search.
  - High-res photo gallery modal with before/after details, total budget, square footage, duration, and consulting engineer credits.
- **Side-by-Side Comparison Matrix (`/compare`)**:
  - Compare up to 3 selected engineers simultaneously on verification status, rating, years of experience, consultation rates, core specializations, service coverage, and response time.
- **Interactive Construction Cost Estimator (`/calculator` or `/pricing`)**:
  - Built-up area slider (500 to 8,000 sq.ft).
  - Typology selector (Villa, Duplex, Apartment, Commercial).
  - Floors selector (G, G+1, G+2, G+3).
  - Quality grade packages: Standard Economy (₹1,850/sq.ft), Premium Quality (₹2,250/sq.ft), Ultra Luxury (₹2,950/sq.ft).
  - Live calculations for total project outlay, raw material requirements (cement bags, steel tons, sand/aggregate cft), and 8-stage milestone cost allocation.

### 2. 🔐 Authentication & Multi-Role Support
- **Sign In (`/login`)**:
  - **1-Click Quick Demo Login buttons** for reviewers to test all 3 roles instantly:
    - **Client**: Ramesh Kumar
    - **Engineer**: Er. Rajeshwari Rao
    - **Platform Admin**: Super Administrator
  - Standard email/password login with role selector.
- **Registration (`/register`)**:
  - Dynamic switcher between **Property Owner (Client)** and **Licensed Engineer / Architect** onboarding.
  - Captures engineering registration license numbers, experience, and operational district.

### 3. 📊 Role-Based Dashboards
- **Client Portal (`/customer/dashboard`)**:
  - Inbound quote requests and sent inquiries tracker.
  - Status badges (`Pending`, `Consultant Contacted`, `Quote Received`, `Milestone Active`).
  - Consultant response notes and quick shortcuts to cost estimator & directory.
- **Engineer Portal (`/engineer/dashboard`)**:
  - Lead management inbox: review incoming client project inquiries, update status to "Quote Sent" or "Accept Lead", view customer phone/email.
  - Portfolio project manager: publish new projects with photos, category, and budget.
  - Services & pricing settings: configure per-sq.ft, fixed, or percentage pricing models.
- **Admin Control Center (`/admin/dashboard`)**:
  - Real-time platform statistics (total registered engineers, pending applications, audit events).
  - License verification workflow: 1-click **Approve** or **Reject** engineer applications.
  - Engineer status manager: toggle active/suspended status.
  - Live immutable audit trail logging all administrative actions.

---

## 🛠️ Architecture & Spring Boot Backend Integration

The frontend uses a clean service layer pattern that isolates all data access behind asynchronous service modules:

| Service Module | Purpose | Spring Boot REST Endpoint Mapping |
| :--- | :--- | :--- |
| `src/services/authService.js` | User session, login, registration | `POST /api/auth/login`, `POST /api/auth/register/*` |
| `src/services/engineerService.js` | Engineer directory, profile details, approvals | `GET /api/engineers`, `GET /api/engineers/{id}`, `PUT /api/engineers/{id}/approve` |
| `src/services/projectService.js` | Project portfolio CRUD and published works | `GET /api/projects`, `POST /api/projects`, `DELETE /api/projects/{id}` |
| `src/services/pricingService.js` | Rate cards and service offerings | `GET /api/engineers/{id}/services`, `POST /api/services` |
| `src/services/enquiryService.js` | Quote requests and consultation leads | `POST /api/enquiries`, `GET /api/engineers/{id}/enquiries`, `PUT /api/enquiries/{id}/status` |
| `src/services/locationService.js` | Karnataka district and town hierarchies | `GET /api/locations/states`, `GET /api/locations/districts` |
| `src/services/adminService.js` | Platform metrics and audit logs | `GET /api/admin/stats`, `GET /api/admin/audit-logs` |

The environment variable `VITE_API_BASE_URL` is pre-configured in `.env` to point to `http://localhost:8080/api` when the backend is ready.

---

## 💻 Tech Stack
- **Framework**: React 19 + Vite 8
- **Routing**: React Router DOM 7
- **Styling**: Vanilla CSS Design System with CSS variables and responsive glassmorphism
- **Icons**: Lucide React
- **Fonts**: Inter (via Google Fonts)

---

## 🏃 Running Locally

```bash
# Install dependencies (if not already installed)
npm install

# Run the development server
npm run dev

# Build production bundle (tested with 0 errors)
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
