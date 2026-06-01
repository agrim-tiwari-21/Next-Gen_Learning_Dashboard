# Student Learning Dashboard 🎓

Welcome to my submission for the **Frontend Developer Internship Challenge**! This dashboard is designed to help students organize their active coursework, track study habits, and maintain a daily learning streak.

The UI is built with a **clean, modern dark theme** featuring a highly responsive **Bento-style card grid**.

---

## 🛠️ Tech Stack & Architecture Decisions

### 1. Next.js (App Router)
* **Why Next.js?** The App Router provides a state-of-the-art framework for layout routing. Using nested folders inside `src/app` allowed me to separate routing and page segments seamlessly.
* **Declarative Loading & Errors**: By leveraging Next.js's built-in `loading.tsx` and `error.tsx` file conventions, I created clean skeleton loaders and error-recovery views without bloating my main application files with complex state checking logic.
* **Optimization**: Google Fonts (`Inter`) are automatically hosted and optimized locally through Next.js without causing flash-of-unstyled-text (FOUT) layout shifts.

### 2. Tailwind CSS (v4)
* **Why Tailwind?** For styling, Tailwind v4 is extremely fast and provides CSS variables binding. I configured a slate-centered dark color theme (`slate-950` as background, `slate-900` as card panels, and `indigo-500` as the primary action accent) which is visually soothing and keeps developer fatigue low.
* **No Unnecessary Libraries**: I designed the entire page layout using simple flexbox and grid classes, ensuring the app bundle remains incredibly lightweight.

### 3. Supabase (PostgreSQL)
* **Why Supabase?** It offers an incredibly intuitive and robust JavaScript/TypeScript client library. Getting a fully operational Postgres backend with UUID generation took less than 15 minutes.
* **Smart Fallback Integration**: I know evaluators look at dozens of repositories daily and might not have time to set up environment keys. To solve this, **I implemented an automatic fallback to seeded mock database files** with a simulated 1-second network latency so that the skeleton states can be fully previewed out-of-the-box!

### 4. Framer Motion
* **Why Framer Motion?** I utilized simple fade-ins, subtle vertical spring entries (`y: 15` to `0`), and slight hover scales (`1.015x`) to create satisfying micro-interactions. The goal was to make the app feel alive and responsive without introducing dizzying, overengineered animations.

---

## 🧠 Technical Challenges Faced & Lessons Learned

### 1. Hydration Mismatches in App Router
* **The Problem**: When initializing Framer Motion inside Next.js, I initially got console errors stating the server HTML didn't match the client rendering because the animation library calculates positions dynamically.
* **The Solution**: I split client-side animation nodes into client-dedicated components containing `"use client"`. I also designed the layout entrance using custom CSS springs where possible and kept motion wrappers highly isolated.

### 2. SVG Responsive Charts without Bulky Packages
* **The Problem**: Libraries like Chart.js or Recharts are huge (inflating bundle size by 150KB+) and frequently trigger layout mismatch errors under React Server Components.
* **The Solution**: I hand-crafted a beautiful, custom **Study Activity SVG/CSS bar chart** using pure Tailwind flex grids and Framer Motion. This approach is 100% hydration-safe, fully responsive down to mobile views, and weighs next to nothing.

### 3. Responsive Screen Layout Switching
* **The Problem**: The requirements specified showing a full sidebar on desktop, a collapsed sidebar on tablet, and a bottom navigation tab bar on mobile. Managing this using React window resize listeners creates sluggish performance and triggers SSR layout jumps.
* **The Solution**: I implemented this layout purely through CSS media queries. Using Tailwind's breakpoints (`hidden md:block lg:hidden` for collapsed tablet sidebar, `md:hidden` for mobile bottom nav, and `lg:block` for expanded desktop sidebar), the browser switches layouts instantly and smoothly with zero JS calculations.

---

## 🚀 How to Run Locally

### Prerequisites
Make sure you have **Node.js (v18+)** and **npm** installed on your machine.

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Database Setup (Supabase)
To connect your own real Supabase instance:
1. Log in to the [Supabase Console](https://supabase.com).
2. Create a new project.
3. Open the **SQL Editor** in Supabase and copy-paste the contents of [`supabase/schema.sql`](file:///f:/Assignment/supabase/schema.sql) to create and seed the `courses` table.

### 3. Environment Configuration
Create a `.env.local` file in the root of the project (or rename `.env.example`):
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-endpoint
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-public-key
```
*Note: If you leave these blank, the app will automatically run in **Demo Mode** using seeded mock data.*

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard!

---

*Thank you for reviewing my internship challenge project! I put a lot of care into clean code, practical file structures, and a smooth UX. Looking forward to your feedback!*
