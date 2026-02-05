export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 bg-[#f8f9fa] border-t border-[#dee2e6]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-[#adb5bd]">
            © {currentYear} geborges.com. Todos os direitos reservados.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://blog.geborges.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#6c757d] hover:text-[#5a7a8a] transition-colors"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-sm text-[#6c757d] hover:text-[#5a7a8a] transition-colors"
            >
              RSS
            </a>
            <a
              href="https://github.com/geborges"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#6c757d] hover:text-[#5a7a8a] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Made with */}
        <p className="text-center text-xs text-[#adb5bd] mt-6">
          Feito com{" "}
          <span className="text-[#5a7a8a]">♥</span>
          {" "}usando Next.js + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
