"use client";

import { useEffect, useRef, useCallback } from "react";
import { TOAST_CSS } from "./toast-css";

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
