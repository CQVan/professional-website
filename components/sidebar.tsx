"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { href: "/", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: "https://github.com/CQVan", label: "GitHub" },
  { href: "https://www.linkedin.com/in/cqvan/", label: "LinkedIn" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col gap-8 border-b border-hairline px-6 py-8 md:sticky md:top-0 md:h-screen md:w-64 md:gap-0 md:border-r md:border-b-0 md:px-8 md:py-12">
      <div>
        <Link
          href="/"
          className="text-base font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          Chandler Van
        </Link>
        <p className="mt-2 max-w-[22ch] text-xs leading-relaxed text-muted">
          Backend &amp; CI/CD Software Developer
        </p>
      </div>

      <nav aria-label="Pages" className="md:mt-12">
        <ul className="flex flex-wrap gap-x-6 md:flex-col md:gap-y-0.5">
          {pages.map((page) => {
            const isCurrent = pathname === page.href;

            return (
              <li key={page.href}>
                <Link
                  href={page.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`-mx-2 block rounded-sm px-2 py-1.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-current ${
                    isCurrent
                      ? "font-medium text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {page.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <ul className="flex gap-5 md:mt-auto md:pt-10">
        {socials.map((social) => (
          <li key={social.href}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
