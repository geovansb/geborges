const projects = [
  {
    title: "SaaS Dashboard",
    description:
      "Dashboard administrativo completo com autenticação, relatórios em tempo real e gerenciamento de usuários.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    link: "#",
    github: "#",
  },
  {
    title: "E-commerce API",
    description:
      "API RESTful para e-commerce com integração de pagamentos, gestão de estoque e notificações.",
    tags: ["Node.js", "Express", "MongoDB", "Stripe"],
    link: "#",
    github: "#",
  },
  {
    title: "Portfolio Generator",
    description:
      "Ferramenta CLI para gerar portfolios estáticos a partir de arquivos Markdown.",
    tags: ["Python", "Jinja2", "Markdown"],
    link: "#",
    github: "#",
  },
  {
    title: "Task Manager",
    description:
      "Aplicativo de gerenciamento de tarefas com colaboração em tempo real e integração com calendário.",
    tags: ["React", "Firebase", "PWA"],
    link: "#",
    github: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[color:var(--color-bg-primary)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-sm text-[color:var(--color-matte-blue)] font-medium uppercase tracking-wider">
            Projetos
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-[color:var(--color-text-primary)] mt-2">
            Trabalhos recentes
          </h2>
          <p className="text-[color:var(--color-text-secondary)] mt-4 max-w-2xl">
            Uma seleção de projetos que desenvolvi. Cada um representa um 
            desafio único e uma oportunidade de aprendizado.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group p-6 bg-[color:var(--color-bg-secondary)] rounded-2xl hover:bg-[color:var(--color-bg-tertiary)] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-medium text-[color:var(--color-text-primary)] group-hover:text-[color:var(--color-matte-blue)] transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    className="p-2 text-[color:var(--color-text-muted)] hover:text-[color:var(--color-matte-blue)] transition-colors"
                    aria-label="Ver código no GitHub"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href={project.link}
                    className="p-2 text-[color:var(--color-text-muted)] hover:text-[color:var(--color-matte-blue)] transition-colors"
                    aria-label="Ver projeto"
                  >
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <p className="text-[color:var(--color-text-secondary)] mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[color:var(--color-bg-primary)] text-[color:var(--color-matte-blue)] text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/geborges"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[color:var(--color-matte-blue)] hover:text-[color:var(--color-matte-blue-dark)] transition-colors font-medium"
          >
            Ver mais no GitHub
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
