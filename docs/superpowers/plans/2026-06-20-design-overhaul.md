# QQ-Studios Design Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify the 5-route QQ-Studios workspace into a cohesive product with persistent navigation, a redesigned landing page, visual polish, and new toast/dashboard components.

**Architecture:** The app uses raw CSS string literals injected via `dangerouslySetInnerHTML` per route — no Tailwind, no CSS modules. New shared components (NavBar, Toast) get their own CSS strings. The NavBar is added to the root `layout.tsx` so it spans all routes. Each route's CSS is patched to account for the 56px nav height. The landing page overlay in FormsApp is simplified to a focused auth gate (no "browse without account" bypass).

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Supabase JS 2, raw CSS

## Global Constraints

- No new dependencies — use only what's already in package.json
- Follow the existing pattern: CSS in exported string constants, imperative DOM wiring in class-based logic
- Preserve the existing design tokens (`:root` variables) — refine execution, don't reinvent the palette
- All verification: `npm run lint && npm run build` (no test framework installed)
- The three A4 paginated routes (notebook, workbook, governance) must not break their print layouts
- Commit after each task passes lint+build

---

### Task 1: Global Navigation Bar

**Files:**
- Create: `components/NavBar.tsx`
- Create: `components/nav-css.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: nothing (self-contained)
- Produces: `<NavBar />` component rendered in root layout; every route gets 56px top offset via `body { padding-top: 56px }`

- [ ] **Step 1: Create `components/nav-css.ts`**

```typescript
export const NAV_CSS = `
  .qq-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: 56px; display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px;
    background: rgba(30, 30, 33, 0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(230, 198, 88, 0.12);
  }
  .qq-nav-brand {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; color: #E7E7E1;
  }
  .qq-nav-brand img {
    height: 26px; filter: brightness(0) invert(1); opacity: 0.92;
  }
  .qq-nav-brand span {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px; letter-spacing: 0.28em;
    text-transform: uppercase; color: #CFCFC6;
  }
  .qq-nav-links {
    display: flex; align-items: center; gap: 4px;
    list-style: none; margin: 0; padding: 0;
  }
  .qq-nav-links a {
    font-family: 'IBM Plex Sans', system-ui, sans-serif;
    font-size: 12.5px; font-weight: 500;
    color: #9A9A9F; text-decoration: none;
    padding: 7px 14px; border-radius: 7px;
    transition: color 0.15s, background 0.15s;
  }
  .qq-nav-links a:hover {
    color: #E7E7E1; background: rgba(255, 255, 255, 0.06);
  }
  .qq-nav-links a.active {
    color: #FAF4E8; background: rgba(230, 198, 88, 0.1);
  }
  .qq-nav-end {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9.5px; letter-spacing: 0.12em;
    text-transform: uppercase; color: #67676D;
  }
  @media (max-width: 700px) {
    .qq-nav { padding: 0 16px; }
    .qq-nav-links a { font-size: 11px; padding: 6px 10px; }
    .qq-nav-brand span { display: none; }
  }
  @media print { .qq-nav { display: none !important; } }
`;
```

- [ ] **Step 2: Create `components/NavBar.tsx`**

```tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAV_CSS } from "./nav-css";

const ROUTES = [
  { href: "/", label: "Forms" },
  { href: "/notebook", label: "Notebook" },
  { href: "/workbook", label: "Workbook" },
  { href: "/operating-model", label: "Operating Model" },
  { href: "/governance-reports", label: "Governance" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NAV_CSS }} />
      <nav className="qq-nav">
        <Link href="/" className="qq-nav-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/qq-logo.png" alt="QQ Studios" />
          <span>QQ-Studios</span>
        </Link>
        <ul className="qq-nav-links">
          {ROUTES.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className={pathname === r.href ? "active" : ""}
              >
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="qq-nav-end">Documentation Workspace</div>
      </nav>
    </>
  );
}
```

- [ ] **Step 3: Update `app/layout.tsx` to include NavBar**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "QQ-Studios — Documentation Workspace",
  description:
    "The Development Documentation System — 79 guided templates, a PMBOK project planner, paginated reference book, forms workbook, and governance reports.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Update `app/globals.css` to add nav offset**

Append to the existing file (after the existing rules):

```css
body {
  padding-top: 56px;
}
```

- [ ] **Step 5: Patch FormsApp landing to account for nav**

In `components/forms/forms-css.ts`, change the `.landing` rule from:
```
.landing{ position:fixed; inset:0;
```
to:
```
.landing{ position:fixed; top:56px; left:0; right:0; bottom:0;
```

This ensures the landing overlay sits below the nav bar rather than covering it.

- [ ] **Step 6: Verify**

Run: `npm run lint && npm run build`

Expected: 0 lint errors, all routes build successfully.

- [ ] **Step 7: Commit**

```bash
git add components/NavBar.tsx components/nav-css.ts app/layout.tsx app/globals.css components/forms/forms-css.ts
git commit -m "feat: add persistent global navigation bar across all routes"
```

---

### Task 2: Favicon + Meta Polish

**Files:**
- Create: `public/favicon.svg`
- Modify: `app/layout.tsx` (already done in Task 1 — `icons` metadata)
- Modify: `app/page.tsx` (add route-specific metadata)
- Modify: `app/operating-model/page.tsx` (add metadata export)

**Interfaces:**
- Consumes: Task 1 layout (already has `icons: { icon: "/favicon.svg" }`)
- Produces: Favicon visible in browser tab; each route gets a descriptive `<title>`

- [ ] **Step 1: Create `public/favicon.svg`**

Create a minimal SVG that captures the QQ monogram in the brand's gold accent:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#1E1E21"/>
  <text x="32" y="44" text-anchor="middle" font-family="Georgia,serif" font-weight="600" font-size="36" fill="#E6C658">QQ</text>
</svg>
```

- [ ] **Step 2: Add metadata to the root page**

In `app/page.tsx`, add a metadata export:

```tsx
import type { Metadata } from "next";
import FormsApp from "@/components/forms/FormsApp";

export const metadata: Metadata = {
  title: "Forms — QQ-Studios",
};

export default function Page() {
  return <FormsApp />;
}
```

- [ ] **Step 3: Add metadata to operating-model**

In `app/operating-model/page.tsx`, add at the top (after imports, before `const CSS`):

```tsx
export const metadata = {
  title: "Operating Model — QQ-Studios",
};
```

- [ ] **Step 4: Verify**

Run: `npm run lint && npm run build`

Expected: 0 errors. Check the build output shows correct titles per route.

- [ ] **Step 5: Commit**

```bash
git add public/favicon.svg app/page.tsx app/operating-model/page.tsx
git commit -m "feat: add favicon and per-route page titles"
```

---

### Task 3: Landing Page Redesign

**Files:**
- Modify: `components/forms/FormsApp.tsx` (lines 1372–1424 JSX, lines 804–870 logic)
- Modify: `components/forms/forms-css.ts` (landing CSS section, lines 180–232)

**Interfaces:**
- Consumes: Task 1 nav offset (landing starts at `top: 56px`)
- Produces: Simplified landing — auth-only card for unauthenticated users (no "browse gallery" bypass); authenticated users skip landing entirely and go to `#/gallery`

**Design direction:** Remove the dark split-screen hero. The landing becomes a centered auth card over a subtle blurred glimpse of the gallery. This is a tool, not a marketing site — get people in fast.

- [ ] **Step 1: Replace landing CSS in `forms-css.ts`**

Find the `/* ---- Landing ---- */` comment (around line 180) and replace everything from `.landing{` through `.lnd-cloud{` and the two `@media` rules (through line 232) with:

```css
  /* ---- Landing ---- */
  .landing{ position:fixed; top:56px; left:0; right:0; bottom:0; z-index:100;
    display:flex; align-items:center; justify-content:center;
    background:rgba(236,236,232,.92); backdrop-filter:blur(16px); }
  .landing.hidden{ display:none; }
  .lnd-card{ width:100%; max-width:400px; background:var(--page); border:1px solid var(--rule);
    border-radius:16px; box-shadow:0 24px 64px rgba(40,30,12,.14); padding:36px 32px 28px; }
  .lnd-card-brand{ display:flex; align-items:center; gap:12px; margin-bottom:24px; }
  .lnd-card-brand img{ height:36px; }
  .lnd-card-brand span{ font-family:'IBM Plex Mono'; font-size:10px; letter-spacing:.28em;
    text-transform:uppercase; color:var(--muted); }
  .lnd-card h2{ font-family:'Spectral'; font-weight:600; font-size:26px; letter-spacing:-.4px;
    margin:0 0 6px; color:var(--ink); }
  .lnd-card .lnd-subtitle{ font-size:13px; line-height:1.5; color:var(--muted); margin:0 0 24px; }
  .lnd-tabs{ display:flex; gap:4px; background:var(--soft); border:1px solid var(--rule);
    border-radius:10px; padding:4px; margin-bottom:20px; }
  .lnd-tab{ flex:1; font-family:'IBM Plex Sans'; font-weight:500; font-size:13px; padding:9px;
    border:none; background:none; border-radius:7px; color:var(--muted); cursor:pointer; }
  .lnd-tab.active{ background:var(--field); color:var(--ink); box-shadow:0 1px 3px rgba(0,0,0,.06); }
  .lnd-fl{ font-family:'IBM Plex Mono'; font-size:9.5px; letter-spacing:.1em;
    text-transform:uppercase; color:var(--faint); display:block; margin:0 0 6px; }
  #lnd-auth input{ width:100%; font-family:'IBM Plex Sans'; font-size:14px;
    border:1px solid var(--line); border-radius:8px; padding:11px 13px; margin-bottom:14px;
    background:var(--field); color:var(--ink); }
  #lnd-auth input:focus{ outline:none; border-color:var(--accent);
    box-shadow:0 0 0 3px var(--accentbg); }
  .lnd-msg{ font-size:12px; line-height:1.45; color:var(--muted); min-height:16px; margin:0 0 10px; }
  .lnd-primary{ width:100%; font-family:'IBM Plex Sans'; font-weight:600; font-size:14px;
    padding:12px; border-radius:8px; border:1px solid var(--ink); background:var(--ink);
    color:var(--page); cursor:pointer; transition:background .15s, border-color .15s; }
  .lnd-primary:hover{ background:var(--accent); border-color:var(--accent); color:#fff; }
  .lnd-ghost{ width:100%; font-family:'IBM Plex Sans'; font-size:13px; padding:10px;
    border-radius:8px; border:none; background:none; color:var(--muted); cursor:pointer; }
  .lnd-ghost:hover{ color:var(--accent); }
  .lnd-signed-txt{ font-size:14px; line-height:1.5; color:var(--ink); margin:0 0 16px; }
  .lnd-signed-txt b{ color:var(--accent); }
  .lnd-note{ font-size:11px; line-height:1.5; color:var(--faint); margin:18px 0 0;
    text-align:center; }
  .lnd-cloud{ display:block; margin-top:4px; font-family:'IBM Plex Mono'; font-size:10px; }
  @media (max-width:500px){ .lnd-card{ margin:0 16px; padding:28px 24px 22px; } }
```

- [ ] **Step 2: Replace landing JSX in `FormsApp.tsx`**

Replace the landing `<div>` (lines 1372–1424, from `<div id="landing"` through its closing `</div>`) with:

```tsx
      <div id="landing" className="landing hidden">
        <div className="lnd-card">
          <div className="lnd-card-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/qq-logo.png" alt="QQ Studios" />
            <span>QQ-Studios</span>
          </div>
          <h2>Sign in to your workspace</h2>
          <p className="lnd-subtitle">77 guided document templates, auto-saved to your account.</p>
          <div className="lnd-tabs">
            <button className="lnd-tab active" data-lt="in">Sign in</button>
            <button className="lnd-tab" data-lt="up">Create account</button>
          </div>
          <div id="lnd-auth">
            <label className="lnd-fl">Email</label>
            <input id="l-email" type="email" autoComplete="username" placeholder="you@company.com" />
            <label className="lnd-fl">Password</label>
            <input id="l-pw" type="password" autoComplete="current-password" placeholder="••••••••" />
            <p id="l-msg" className="lnd-msg"></p>
            <button className="lnd-primary" id="l-submit">Sign in</button>
            <button className="lnd-ghost" id="l-magic">Email me a magic link instead</button>
          </div>
          <div id="lnd-signed" style={{ display: "none" }}>
            <p className="lnd-signed-txt">Signed in as <b id="l-who"></b></p>
            <button className="lnd-primary" id="l-continue">Continue to your forms</button>
            <button className="lnd-ghost" id="l-signout">Sign out</button>
          </div>
          <p className="lnd-note">
            Sign in to save your work. <span id="l-cloud" className="lnd-cloud"></span>
          </p>
        </div>
      </div>
```

Key changes: removed `lnd-left` hero panel, removed `lnd-right` wrapper, removed "Browse gallery" button, removed `lnd-sep`, removed `lnd-preview` rotating card, removed companion artifact links (now in the nav).

- [ ] **Step 3: Remove "browse" bypass from `initLanding()`**

In `FormsApp.tsx`, in `initLanding()` (around line 816), remove these two lines:

```typescript
    const br = document.getElementById("l-browse"); if (br) br.onclick = () => { location.hash = "#/gallery"; };
```

Also remove the `startPreviewRotation()` call (line 820) and the entire `startPreviewRotation()` method (lines 823–844) since the preview card no longer exists.

- [ ] **Step 4: Auto-redirect authenticated users past landing**

In `FormsApp.tsx`, in the `afterAuth()` method (around line 1063), after `if (this.user) await this.loadRemote();`, add:

```typescript
    if (this.user && (location.hash === "" || location.hash === "#/" || location.hash === "#/welcome")) {
      location.hash = "#/gallery";
    }
```

This sends authenticated users straight to the gallery instead of showing the landing.

- [ ] **Step 5: Verify**

Run: `npm run lint && npm run build`

Expected: 0 errors. All 8 routes build. The removed elements (`lnd-left`, `lnd-preview`, `lnd-browse`, `lnd-sep`) are no longer referenced.

- [ ] **Step 6: Commit**

```bash
git add components/forms/FormsApp.tsx components/forms/forms-css.ts
git commit -m "feat: redesign landing as focused auth card, remove browse-without-account bypass"
```

---

### Task 4: Visual Polish Pass

**Files:**
- Modify: `app/globals.css`
- Modify: `components/forms/forms-css.ts`
- Modify: `app/operating-model/page.tsx` (CSS section)

**Interfaces:**
- Consumes: Task 1 nav, Task 3 landing
- Produces: Consistent focus rings, tighter card hover states, mobile breakpoints on FormsApp sidebar

- [ ] **Step 1: Enhance `globals.css` with focus and accessibility baseline**

Replace `app/globals.css` entirely:

```css
/* Global reset only. Each route/artifact ships its own complete styling so the
   prototypes can be reproduced verbatim without class-name collisions. */
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
}
body {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  padding-top: 56px;
}

/* Accessible focus rings — visible on keyboard nav, hidden on mouse */
:focus-visible {
  outline: 2px solid #B5862A;
  outline-offset: 2px;
}
:focus:not(:focus-visible) {
  outline: none;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Add mobile responsiveness to FormsApp sidebar**

In `components/forms/forms-css.ts`, find the `@media print` block (around line 114) and add this mobile breakpoint *before* it:

```css
  @media (max-width:900px){
    .app{ grid-template-columns:1fr; }
    .side{ display:none; }
    .topbar{ padding:13px 20px; }
    .wrap{ padding:28px 20px 60px; }
    .meta{ grid-template-columns:1fr 1fr; }
    .kpi-row{ grid-template-columns:repeat(2,1fr); }
    .gal-grid{ grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); }
  }
```

- [ ] **Step 3: Tighten card hover transitions in `forms-css.ts`**

Find `.gcard:hover{` (line 169) and replace:

```css
  .gcard:hover{ border-color:var(--accent); box-shadow:0 10px 24px rgba(40,30,12,.09); transform:translateY(-2px); }
```

The change: smaller shadow (32px -> 24px, .11 -> .09), smaller lift (-3px -> -2px) for a more refined feel.

- [ ] **Step 4: Add mobile breakpoint to operating-model page**

In `app/operating-model/page.tsx`, find the CSS string and add before the closing backtick:

```css
  @media (max-width:900px){
    .pgrid{ grid-template-columns:1fr 1fr; }
    .lane{ grid-template-columns:100px repeat(5,1fr); font-size:11px; }
    .doc{ padding:30px 20px 60px; }
  }
  @media (max-width:600px){
    .pgrid{ grid-template-columns:1fr; }
    .lane{ overflow-x:auto; min-width:600px; }
  }
```

- [ ] **Step 5: Verify**

Run: `npm run lint && npm run build`

Expected: 0 errors. All routes build.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css components/forms/forms-css.ts app/operating-model/page.tsx
git commit -m "feat: polish — focus rings, reduced motion, mobile responsive, tighter hover"
```

---

### Task 5: Toast Notification Component

**Files:**
- Create: `components/Toast.tsx`
- Create: `components/toast-css.ts`
- Modify: `app/layout.tsx` (add toast container)
- Modify: `components/forms/FormsApp.tsx` (fire toasts on save/sync)

**Interfaces:**
- Consumes: nothing (self-contained event system)
- Produces: `window.dispatchEvent(new CustomEvent("qq-toast", { detail: { message, type } }))` API; Toast component listens and renders

- [ ] **Step 1: Create `components/toast-css.ts`**

```typescript
export const TOAST_CSS = `
  .qq-toast-container {
    position: fixed; bottom: 24px; right: 24px; z-index: 300;
    display: flex; flex-direction: column-reverse; gap: 8px;
    pointer-events: none;
  }
  .qq-toast {
    pointer-events: auto;
    font-family: 'IBM Plex Sans', system-ui, sans-serif;
    font-size: 13px; line-height: 1.4;
    padding: 12px 18px; border-radius: 10px;
    background: #1E1E21; color: #E7E7E1;
    border: 1px solid rgba(230, 198, 88, 0.15);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    animation: qq-toast-in 0.25s ease-out;
    max-width: 340px;
  }
  .qq-toast.success { border-left: 3px solid #5FA463; }
  .qq-toast.error { border-left: 3px solid #C2603F; }
  .qq-toast.info { border-left: 3px solid #B5862A; }
  .qq-toast.out { animation: qq-toast-out 0.2s ease-in forwards; }
  @keyframes qq-toast-in {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes qq-toast-out {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-8px); }
  }
  @media print { .qq-toast-container { display: none !important; } }
`;
```

- [ ] **Step 2: Create `components/Toast.tsx`**

```tsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import { TOAST_CSS } from "./toast-css";

interface ToastEntry {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

let _nextId = 0;

export default function Toast() {
  const containerRef = useRef<HTMLDivElement>(null);

  const show = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    const container = containerRef.current;
    if (!container) return;
    const id = ++_nextId;
    const el = document.createElement("div");
    el.className = `qq-toast ${type}`;
    el.textContent = message;
    el.dataset.id = String(id);
    container.appendChild(el);
    setTimeout(() => {
      el.classList.add("out");
      setTimeout(() => el.remove(), 200);
    }, 3000);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.message) {
        show(detail.message, detail.type || "info");
      }
    };
    window.addEventListener("qq-toast", handler);
    return () => window.removeEventListener("qq-toast", handler);
  }, [show]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: TOAST_CSS }} />
      <div ref={containerRef} className="qq-toast-container" />
    </>
  );
}
```

- [ ] **Step 3: Add Toast to `app/layout.tsx`**

Add the import and component to the layout body:

```tsx
import Toast from "@/components/Toast";
```

In the `<body>`, after `{children}`:

```tsx
        <Toast />
```

- [ ] **Step 4: Fire toasts from FormsApp on save events**

In `components/forms/FormsApp.tsx`, in the `flashSaved()` method (around line 155), add a toast dispatch:

```typescript
  flashSaved() {
    const s = document.getElementById("saved");
    if (!s) return;
    s.style.opacity = "0.4";
    if (this._st) clearTimeout(this._st);
    this._st = setTimeout(() => {
      s.style.opacity = "1";
    }, 180);
  }
```

Replace with:

```typescript
  flashSaved() {
    const s = document.getElementById("saved");
    if (!s) return;
    s.style.opacity = "0.4";
    if (this._st) clearTimeout(this._st);
    this._st = setTimeout(() => {
      s.style.opacity = "1";
    }, 180);
  }
  toast(message: string, type: "success" | "error" | "info" = "info") {
    window.dispatchEvent(new CustomEvent("qq-toast", { detail: { message, type } }));
  }
```

Then find the `setCloud` method (search for `setCloud`) and add toast calls for connection events. In `initBackend()` (search for `this.setCloud("connected")`), after `this.setCloud("connected");` add:

```typescript
      this.toast("Database connected", "success");
```

In `afterAuth()`, after the line `if (this.user) await this.loadRemote();`, add:

```typescript
    if (this.user) this.toast("Signed in as " + (this.user.email || ""), "success");
```

- [ ] **Step 5: Verify**

Run: `npm run lint && npm run build`

Expected: 0 errors. Toast component compiles. CustomEvent dispatch is type-safe.

- [ ] **Step 6: Commit**

```bash
git add components/Toast.tsx components/toast-css.ts app/layout.tsx components/forms/FormsApp.tsx
git commit -m "feat: add toast notification system for save/sync/auth events"
```

---

### Task 6: Dashboard Home Route

**Files:**
- Create: `app/dashboard/page.tsx`
- Create: `components/dashboard/Dashboard.tsx`
- Create: `components/dashboard/dashboard-css.ts`
- Modify: `components/NavBar.tsx` (add Dashboard link)

**Interfaces:**
- Consumes: Supabase client from `lib/supabase.ts`; form definitions from `lib/forms-model.ts`
- Produces: `/dashboard` route showing recent form activity and quick-access links

- [ ] **Step 1: Create `components/dashboard/dashboard-css.ts`**

```typescript
export const DASHBOARD_CSS = `
  :root{
    --ink:#222226; --muted:#6A6A6F; --faint:#9C9C98;
    --page:#FBFBF9; --paper:#ECECE8; --soft:#F2F2EF; --softer:#F7F7F4;
    --rule:#E3E3DE; --line:#D4D4CF; --field:#FFFFFF;
    --accent:#B5862A; --accent2:#E6C658; --accentsoft:#F0E4BC; --accentbg:#FAF4E2;
    --sidebar:#1E1E21;
  }
  .dash{ max-width:1080px; margin:0 auto; padding:40px 36px 80px; }
  .dash-title{ font-family:'Spectral',serif; font-weight:600; font-size:34px;
    letter-spacing:-.5px; margin:0 0 6px; color:var(--ink); }
  .dash-sub{ font-family:'Spectral',serif; font-style:italic; font-size:15px;
    color:var(--muted); margin:0 0 32px; }
  .dash-section-label{ font-family:'IBM Plex Mono',monospace; font-size:10px;
    letter-spacing:.18em; text-transform:uppercase; color:var(--accent);
    margin:0 0 14px; }
  .dash-quick{ display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
    gap:14px; margin-bottom:40px; }
  .dash-qcard{ border:1px solid var(--rule); border-radius:13px; background:var(--page);
    padding:18px 18px 16px; text-decoration:none; color:inherit;
    transition:border-color .15s, box-shadow .15s, transform .15s; }
  .dash-qcard:hover{ border-color:var(--accent); box-shadow:0 8px 20px rgba(40,30,12,.08);
    transform:translateY(-2px); }
  .dash-qcard h3{ font-family:'Spectral',serif; font-weight:600; font-size:17px;
    margin:0 0 6px; color:var(--ink); }
  .dash-qcard p{ font-size:12px; line-height:1.45; color:var(--muted); margin:0; }
  .dash-qcard .qc-count{ font-family:'IBM Plex Mono',monospace; font-size:9px;
    letter-spacing:.06em; text-transform:uppercase; color:var(--faint); margin-top:10px; }
  .dash-recent{ border:1px solid var(--rule); border-radius:14px; background:var(--page);
    overflow:hidden; }
  .dash-recent-head{ padding:18px 20px; border-bottom:1px solid var(--rule);
    font-family:'Spectral',serif; font-weight:600; font-size:17px; }
  .dash-recent-row{ display:flex; align-items:center; gap:14px; padding:14px 20px;
    border-bottom:1px solid var(--rule); }
  .dash-recent-row:last-child{ border-bottom:none; }
  .dash-recent-row:hover{ background:var(--softer); }
  .drr-title{ font-family:'Spectral',serif; font-weight:600; font-size:14px;
    color:var(--ink); flex:1; min-width:0; }
  .drr-form{ font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:.06em;
    text-transform:uppercase; color:var(--accent); background:var(--accentbg);
    border:1px solid var(--accentsoft); border-radius:5px; padding:3px 7px; flex:none; }
  .drr-time{ font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--faint);
    flex:none; white-space:nowrap; }
  .dash-empty{ text-align:center; padding:48px 24px; color:var(--muted); font-size:14px; }
  .dash-empty a{ color:var(--accent); text-decoration:none; border-bottom:1px solid var(--accentsoft); }
  @media (max-width:700px){
    .dash{ padding:28px 20px 60px; }
    .dash-quick{ grid-template-columns:1fr 1fr; }
  }
`;
```

- [ ] **Step 2: Create `components/dashboard/Dashboard.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClient, loadSavedCreds, ENV_SUPABASE } from "@/lib/supabase";
import { domains as DOMAINS, allDefs } from "@/lib/forms-model";
import { DASHBOARD_CSS } from "./dashboard-css";

interface RecentItem {
  id: string;
  title: string;
  form_id: string;
  updated_at: string;
}

export default function Dashboard() {
  const [recent, setRecent] = useState<RecentItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadRecent = async () => {
      const creds = loadSavedCreds() || ENV_SUPABASE();
      if (!creds) { setLoaded(true); return; }
      try {
        const client = getClient(creds.url, creds.key);
        const { data: { user } } = await client.auth.getUser();
        if (!user) { setLoaded(true); return; }
        const { data } = await client.from("submissions").select("id, title, form_id, updated_at")
          .eq("user_id", user.id).order("updated_at", { ascending: false }).limit(10);
        if (data) setRecent(data as RecentItem[]);
      } catch { /* ignore */ }
      setLoaded(true);
    };
    loadRecent();
  }, []);

  const defs = allDefs();
  const domainCounts = DOMAINS.map((name, i) => ({
    name,
    count: defs.filter((d) => d.d === i).length,
  }));

  const timeAgo = (iso: string) => {
    const d = Date.now() - new Date(iso).getTime();
    if (d < 60000) return "just now";
    if (d < 3600000) return Math.floor(d / 60000) + "m ago";
    if (d < 86400000) return Math.floor(d / 3600000) + "h ago";
    return Math.floor(d / 86400000) + "d ago";
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DASHBOARD_CSS }} />
      <div className="dash">
        <h1 className="dash-title">Dashboard</h1>
        <p className="dash-sub">Your workspace at a glance</p>

        <div className="dash-section-label">Quick Access</div>
        <div className="dash-quick">
          {domainCounts.map((d) => (
            <Link key={d.name} href="/#/gallery" className="dash-qcard">
              <h3>{d.name}</h3>
              <p>Document templates for {d.name.toLowerCase()}</p>
              <div className="qc-count">{d.count} forms</div>
            </Link>
          ))}
          <Link href="/notebook" className="dash-qcard">
            <h3>Reference Book</h3>
            <p>Eight chapters of documentation guidance</p>
            <div className="qc-count">8 chapters</div>
          </Link>
          <Link href="/#/planner" className="dash-qcard">
            <h3>Project Planner</h3>
            <p>PMBOK dashboard with KPIs and risk tracking</p>
            <div className="qc-count">Live data</div>
          </Link>
        </div>

        <div className="dash-section-label">Recent Activity</div>
        <div className="dash-recent">
          <div className="dash-recent-head">Your forms</div>
          {!loaded ? (
            <div className="dash-empty">Loading...</div>
          ) : recent.length === 0 ? (
            <div className="dash-empty">
              No forms yet. <Link href="/#/gallery">Browse the gallery</Link> to get started.
            </div>
          ) : (
            recent.map((item) => (
              <Link key={item.id} href={`/#/${item.form_id}`} className="dash-recent-row">
                <span className="drr-form">{item.form_id}</span>
                <span className="drr-title">{item.title || "Untitled"}</span>
                <span className="drr-time">{timeAgo(item.updated_at)}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Create `app/dashboard/page.tsx`**

```tsx
import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard — QQ-Studios",
};

export default function DashboardPage() {
  return <Dashboard />;
}
```

- [ ] **Step 4: Add Dashboard to NavBar**

In `components/NavBar.tsx`, update the `ROUTES` array to add Dashboard as the first item:

```typescript
const ROUTES = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/", label: "Forms" },
  { href: "/notebook", label: "Notebook" },
  { href: "/workbook", label: "Workbook" },
  { href: "/operating-model", label: "Operating Model" },
  { href: "/governance-reports", label: "Governance" },
];
```

- [ ] **Step 5: Verify**

Run: `npm run lint && npm run build`

Expected: 0 errors. New `/dashboard` route appears in build output. NavBar includes Dashboard link.

- [ ] **Step 6: Commit**

```bash
git add components/dashboard/Dashboard.tsx components/dashboard/dashboard-css.ts app/dashboard/page.tsx components/NavBar.tsx
git commit -m "feat: add dashboard home route with recent activity and quick access"
```

---

## Self-Review Checklist

1. **Spec coverage:** All 4 phases covered — Nav shell (Task 1), Landing redesign (Task 3), Polish (Tasks 2 + 4), New components (Tasks 5 + 6).
2. **Placeholder scan:** No TBD/TODO found. All code blocks contain complete, runnable code.
3. **Type consistency:** `NAV_CSS` exported from `nav-css.ts`, imported in `NavBar.tsx`. `TOAST_CSS` exported from `toast-css.ts`, imported in `Toast.tsx`. `DASHBOARD_CSS` exported from `dashboard-css.ts`, imported in `Dashboard.tsx`. Toast API uses `CustomEvent("qq-toast")` consistently in both producer and consumer. `FormsLogic.toast()` method signature matches `Toast.show()` parameters.
4. **Existing patterns preserved:** All new CSS follows the same raw-string-constant pattern. Design tokens are the same `:root` variables. Font usage follows established Spectral/IBM Plex hierarchy.
5. **Print layouts:** `@media print { .qq-nav { display: none !important; } }` in nav, `@media print { .qq-toast-container { display: none !important; } }` in toast. No changes to A4 paginated route CSS.
