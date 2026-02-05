const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "AWS"] },
  { category: "Ferramentas", items: ["Git", "Docker", "Figma", "Linux"] },
];

const interests = [
  { icon: "💻", label: "Desenvolvimento" },
  { icon: "📚", label: "Leitura" },
  { icon: "🎵", label: "Música" },
  { icon: "🌱", label: "Sustentabilidade" },
  { icon: "✈️", label: "Viagens" },
  { icon: "☕", label: "Café" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#e9ecef]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-sm text-[#5a7a8a] font-medium uppercase tracking-wider">
            Sobre mim
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-[#343a40] mt-2">
            Quem sou eu
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Bio */}
          <div>
            <p className="text-[#6c757d] leading-relaxed mb-6">
              Sou um desenvolvedor apaixonado por criar experiências digitais 
              que fazem a diferença. Acredito na simplicidade como princípio 
              fundamental do bom design e da boa engenharia.
            </p>
            <p className="text-[#6c757d] leading-relaxed mb-6">
              Com experiência em desenvolvimento full-stack, trabalho com 
              tecnologias modernas para construir aplicações escaláveis e 
              performáticas. Gosto de resolver problemas complexos de forma 
              elegante.
            </p>
            <p className="text-[#6c757d] leading-relaxed">
              Quando não estou codando, provavelmente estou explorando novas 
              tecnologias, lendo um bom livro ou planejando a próxima viagem.
            </p>

            {/* CV Link */}
            <div className="mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#5a7a8a] hover:text-[#4a6a7a] transition-colors font-medium"
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
              <h3 className="text-lg font-medium text-[#343a40] mb-4">
                Habilidades
              </h3>
              <div className="space-y-4">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category}>
                    <span className="text-sm text-[#adb5bd] mb-2 block">
                      {skillGroup.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-[#f8f9fa] text-[#5a7a8a] text-sm rounded-full"
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
              <h3 className="text-lg font-medium text-[#343a40] mb-4">
                Interesses
              </h3>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <span
                    key={interest.label}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#f8f9fa] rounded-full text-[#6c757d] text-sm"
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
