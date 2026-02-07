"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = root.getAttribute("data-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = prefersDark ? "dark" : "light";
    root.setAttribute("data-theme", initialTheme);
    setTheme(initialTheme);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      window.localStorage.setItem("theme", next);
      return next;
    });
  };

  const ThemeToggleButton = ({ className = "" }: { className?: string }) => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      aria-pressed={theme === "dark"}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[color:var(--color-bg-secondary)] text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-matte-blue)] hover:bg-[color:var(--color-bg-tertiary)] transition-colors text-xs font-medium ${className}`}
    >
      {theme === "dark" ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m0-11.314L7.05 7.05m9.9 9.9 1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
          />
        </svg>
      )}
      <span>{theme === "dark" ? "Claro" : "Escuro"}</span>
    </button>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-[color:var(--color-bg-primary)] backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-matte-blue)] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://blog.geborges.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 bg-[color:var(--color-matte-blue)] text-white rounded-full hover:bg-[color:var(--color-matte-blue-dark)] transition-colors"
            >
              Blog
            </a>
          </nav>

          <div className="hidden md:flex items-center ml-auto">
            <ThemeToggleButton />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <ThemeToggleButton />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[color:var(--color-matte-blue)]"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-[color:var(--color-bg-tertiary)]">
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-matte-blue)] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://blog.geborges.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-matte-blue)] transition-colors"
              >
                Blog
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
