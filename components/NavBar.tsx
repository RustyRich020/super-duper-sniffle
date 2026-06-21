"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAV_CSS } from "./nav-css";

const ROUTES = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/", label: "Forms" },
  { href: "/notebook", label: "Notebook" },
  { href: "/workbook", label: "Workbook" },
  { href: "/operating-model", label: "Operating Model" },
  { href: "/governance-reports", label: "Governance" },
  { href: "/reports", label: "Reports" },
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
