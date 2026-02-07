const skills = [
  {
    category: "Serviços AWS (fluência)",
    items: [
      "Aurora MySQL",
      "Aurora PostgreSQL",
      "DynamoDB",
      "DMS",
      "KMS",
      "AWS Backup",
    ],
  },
  {
    category: "Outros serviços (menor contato)",
    items: [
      "MongoDB Atlas",
      "DocumentDB",
      "Aurora DSQL",
      "CockroachDB",
      "Yugabyte",
    ],
  },
  {
    category: "IaC & Dev",
    items: ["Terraform", "Bash", "Python", "Go", "Java", "Git"],
  },
];

const interests = [
  { icon: "🗄️", label: "Banco de dados" },
  { icon: "💻", label: "Tecnologia" },
  { icon: "🤖", label: "Inteligência Artificial" },
  { icon: "🎵", label: "Música" },
  { icon: "📚", label: "Leitura" },
  { icon: "✈️", label: "Viagens" },
  { icon: "🐾", label: "Pet Friendly" },
  { icon: "🌿", label: "Slow Living" },
  { icon: "🚜", label: "Turismo Rural" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[color:var(--color-bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-sm text-[color:var(--color-matte-blue)] font-medium uppercase tracking-wider">
            Sobre mim
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-[color:var(--color-text-primary)] mt-2">
            Quem sou eu
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Bio */}
          <div>
            <p className="text-[color:var(--color-text-secondary)] leading-relaxed mb-6">
              Estou em tecnologia desde 2007. Comecei em monitoramento de
              aplicações e, ao investigar incidentes e gargalos de performance,
              fui mergulhando cada vez mais em bancos de dados. Hoje trabalho com
              plataforma de dados na nuvem (AWS), desenhando e operando ambientes
              com observabilidade, automação e boas práticas — e alterno com
              naturalidade para o papel de DBA quando o time precisa de
              troubleshooting e otimização end-to-end (aplicação + banco).
            </p>
            <p className="text-[color:var(--color-text-secondary)] leading-relaxed mb-6">
              No dia a dia, atuo principalmente com Aurora/RDS (PostgreSQL e
              MySQL), além de DynamoDB, DocumentDB e MongoDB Atlas, e trago
              experiências com CockroachDB. Uso Terraform como IaC e automações
              em Python, Go e Java. Sou AWS Certified Solutions Architect –
              Associate (desde 2022) e trabalho em equipe global, com inglês
              como idioma de rotina.
            </p>
            <p className="text-[color:var(--color-text-secondary)] leading-relaxed">
              Fora do trabalho, sou voluntário como técnico de som na minha
              igreja local. Gosto de música, leitura e viagens — e tenho dois
              gatos.
            </p>

            {/* LinkedIn + CV Link */}
            <div className="mt-8 space-y-4">
              <a
                href="https://www.linkedin.com/in/geovansb/"
                target="_blank"
                rel="noopener noreferrer"
                title="https://www.linkedin.com/in/geovansb/"
                className="flex items-center gap-3 text-[color:var(--color-matte-blue)] hover:text-[color:var(--color-matte-blue-dark)] transition-colors font-medium w-fit"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>Conheça meu perfil no LinkedIn</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-[color:var(--color-matte-blue)] hover:text-[color:var(--color-matte-blue-dark)] transition-colors font-medium w-fit"
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Baixar currículo (PDF)
              </a>
            </div>
          </div>

          {/* Skills & Interests */}
          <div className="space-y-10">
            {/* Skills */}
            <div>
              <h3 className="text-lg font-medium text-[color:var(--color-text-primary)] mb-4">
                Habilidades
              </h3>
              <div className="space-y-4">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category}>
                    <span className="text-sm text-[color:var(--color-text-muted)] mb-2 block">
                      {skillGroup.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-[color:var(--color-bg-primary)] text-[color:var(--color-matte-blue)] text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-lg font-medium text-[color:var(--color-text-primary)] mb-4">
                Interesses
              </h3>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <span
                    key={interest.label}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[color:var(--color-bg-primary)] rounded-full text-[color:var(--color-text-secondary)] text-sm"
                  >
                    <span>{interest.icon}</span>
                    {interest.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
