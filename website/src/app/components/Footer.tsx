export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 bg-[color:var(--color-bg-primary)] border-t border-[color:var(--color-bg-tertiary)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-[color:var(--color-text-muted)]">
            © {currentYear} geborges.com. Todos os direitos reservados.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://blog.geborges.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-matte-blue)] transition-colors"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-matte-blue)] transition-colors"
            >
              RSS
            </a>
            <a
              href="https://github.com/geborges"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-matte-blue)] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Made with */}
        <p className="text-center text-xs text-[color:var(--color-text-muted)] mt-6">
          Feito com{" "}
          <span className="text-[color:var(--color-matte-blue)]">♥</span>
          {" "}usando Next.js + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
