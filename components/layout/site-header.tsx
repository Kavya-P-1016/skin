"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import type { SiteConfig } from "@/lib/site-config";
import { catalogNav, catalogNavSimple } from "@/lib/site-nav";
import { ROUTES, homeSection } from "@/lib/routes";
import { cn } from "@/lib/cn";

function IconTruck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

function IconBag({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function IconUser({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function HeaderSearch({ className }: { className?: string }) {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById("product");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.assign(homeSection("product"));
  };

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={cn(
        "flex min-w-0 flex-1 items-center rounded-pill border border-sky/35 bg-surface-elevated/90 px-3 py-2 shadow-sm focus-within:border-pop-pink/50 focus-within:ring-2 focus-within:ring-pop-pink/25",
        className,
      )}
    >
      <IconSearch className="shrink-0 text-ink-subtle" />
      <label htmlFor="site-search" className="sr-only">
        Search products and topics
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        autoComplete="off"
        placeholder="Search SPF, ingredients, skin concerns…"
        className="ml-2 min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-subtle focus:outline-none"
      />
    </form>
  );
}

function UtilityLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="flex h-10 w-10 min-h-10 min-w-10 touch-manipulation items-center justify-center rounded-md text-ink transition-colors hover:bg-wash-mint/90 hover:text-brand-deep active:bg-wash-sky/50"
      aria-label={label}
    >
      {children}
    </a>
  );
}


export function SiteHeader({ config }: { config: SiteConfig }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-pop-pink/15 bg-surface-elevated/92 shadow-sm shadow-pop-pink/5 backdrop-blur-md">
      {/* Full-bleed row: logo flush-left, search flexes, utilities flush-right (no max-w-6xl) */}
      <div className="flex w-full items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5 lg:px-8">
        <Link
          href="/"
          className="shrink-0 touch-manipulation font-display text-lg font-bold tracking-tight text-ink sm:text-xl"
        >
          ON{" "}
          <span className="text-xl font-extrabold text-brand-deep sm:text-2xl">
            &amp;
          </span>{" "}
          OFF
        </Link>

        <HeaderSearch className="mx-3 hidden min-w-0 flex-1 md:flex lg:mx-8" />

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <UtilityLink href={ROUTES.track} label="Track order">
            <IconTruck />
          </UtilityLink>
          <UtilityLink href={ROUTES.cart} label="Shopping bag">
            <span className="relative inline-flex">
              <IconBag />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-pop-pink px-1 text-[9px] font-bold text-white shadow-sm">
                0
              </span>
            </span>
          </UtilityLink>
          <UtilityLink href={homeSection("cta")} label="Account">
            <IconUser />
          </UtilityLink>
          <ButtonLink
            href={config.primaryCta.href}
            className="ml-1 hidden !px-4 !py-2 text-xs lg:inline-flex"
          >
            {config.primaryCta.label}
          </ButtonLink>
          <button
            type="button"
            className="ml-1 inline-flex h-10 min-h-10 touch-manipulation items-center justify-center rounded-md border border-border px-3 text-xs font-semibold text-ink active:bg-surface-mist md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-full-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <HeaderSearch className="mx-4 mb-3 md:hidden sm:mx-6 lg:mx-8" />

      <div
        id="mobile-full-nav"
        className={cn(
          "border-t border-border-soft bg-surface md:hidden",
          mobileOpen
            ? "block max-h-[min(75dvh,calc(100dvh-10rem))] overflow-y-auto overscroll-contain"
            : "hidden",
        )}
      >
        <Container className="py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <ButtonLink
            href={config.primaryCta.href}
            className="mb-4 min-h-12 w-full touch-manipulation"
            onClick={() => setMobileOpen(false)}
          >
            {config.primaryCta.label}
          </ButtonLink>
          {catalogNav.map((col) => (
            <div key={col.label} className="border-b border-border-soft py-3">
              <a
                href={col.href}
                className="flex min-h-11 touch-manipulation items-center font-display text-sm font-semibold text-ink active:text-brand-deep"
                onClick={() => setMobileOpen(false)}
              >
                {col.label}
              </a>
              {col.children ? (
                <ul className="mt-2 space-y-0.5 border-l-2 border-border-soft pl-3">
                  {col.children.map((c) => (
                    <li key={c.href + c.label}>
                      <a
                        href={c.href}
                        className="flex min-h-11 touch-manipulation items-center text-sm text-ink-muted active:text-ink"
                        onClick={() => setMobileOpen(false)}
                      >
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
          <div className="flex flex-wrap gap-2 py-4">
            {catalogNavSimple.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="min-h-10 touch-manipulation rounded-pill border border-border bg-surface-elevated px-4 py-2 text-xs font-semibold text-ink active:bg-surface-mist"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </div>
    </header>
  );
}
