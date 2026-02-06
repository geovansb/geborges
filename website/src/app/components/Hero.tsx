export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 pt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[color:var(--color-matte-blue-soft)] rounded-full mb-8">
          <span className="w-2 h-2 bg-[color:var(--color-accent-sage)] rounded-full animate-pulse"></span>
          <span className="text-sm text-[color:var(--color-matte-blue)]">Disponível para projetos</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-[color:var(--color-text-primary)] mb-6 leading-tight">
          Olá, eu sou{" "}
          <span className="text-[color:var(--color-matte-blue)]">geborges</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[color:var(--color-text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
          Desenvolvedor, criador e entusiasta de tecnologia. 
          Construo soluções digitais com foco em simplicidade e funcionalidade.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-[color:var(--color-matte-blue)] text-white rounded-full hover:bg-[color:var(--color-matte-blue-dark)] transition-colors text-sm font-medium"
          >
            Ver projetos
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-[color:var(--color-matte-blue)] text-[color:var(--color-matte-blue)] rounded-full hover:bg-[color:var(--color-matte-blue)] hover:text-white transition-colors text-sm font-medium"
          >
            Entrar em contato
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 animate-bounce">
          <a
            href="#about"
            className="inline-flex flex-col items-center text-[color:var(--color-text-muted)] hover:text-[color:var(--color-matte-blue)] transition-colors"
          >
            <span className="text-xs mb-2">Scroll</span>
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
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
