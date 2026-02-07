export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 pt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-[color:var(--color-text-primary)] mb-6 leading-tight">
          Olá, eu sou{" "}
          <span className="text-[color:var(--color-matte-blue)]">
            Geovan Borges
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[color:var(--color-text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
          <strong className="font-semibold">
            Engenheiro de Plataforma de Dados
          </strong>{" "}
          na{" "}
          <a
            href="https://www.pismo.io/pt/"
            target="_blank"
            rel="noreferrer"
            title="https://www.pismo.io/pt/"
            className="text-[color:var(--color-matte-blue)] font-semibold underline decoration-[color:var(--color-matte-blue)]/60 underline-offset-4 hover:text-[color:var(--color-matte-blue-dark)] hover:decoration-[color:var(--color-matte-blue-dark)] transition-colors"
          >
            Pismo
          </a>{" "}
          |{" "}
          <a
            href="https://www.visa.com.br/"
            target="_blank"
            rel="noreferrer"
            title="https://www.visa.com.br/"
            className="text-[color:var(--color-matte-blue)] font-semibold underline decoration-[color:var(--color-matte-blue)]/60 underline-offset-4 hover:text-[color:var(--color-matte-blue-dark)] hover:decoration-[color:var(--color-matte-blue-dark)] transition-colors"
          >
            Visa
          </a>
          , atuando com soluções bancárias na nuvem{" "}
          <strong className="font-semibold">AWS</strong>. Trabalho para melhorar
          escalabilidade, resiliência, performance e operação sustentável. Atuo
          em TI desde 2007, com base sólida como{" "}
          <strong className="font-semibold">DBA</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#about"
            className="px-8 py-3 bg-[color:var(--color-matte-blue)] text-white rounded-full hover:bg-[color:var(--color-matte-blue-dark)] transition-colors text-sm font-medium"
          >
            Conheça mais sobre mim
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
