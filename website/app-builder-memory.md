O que foi feito
Criei uma landing page minimalista com o design que você pediu:

Design & Cores:
Tons pasteis com azul mate (#5a7a8a) como cor principal
Background suave (#f8f9fa) com seções alternadas
Tipografia clean e discreta
Scrollbar e seleção de texto customizadas

Seções criadas:
Header - Navegação fixa com links para as seções + botão para o blog
Hero - Apresentação com CTA para projetos e contato
Sobre - Bio, habilidades organizadas por categoria e interesses
Projetos - Grid de 4 projetos exemplo com links GitHub
Contato - Email CTA e links sociais (GitHub, LinkedIn, Twitter)
Footer - Copyright e links rápidos

Funcionalidades:
Navegação suave entre seções (scroll)
Totalmente responsivo (mobile/desktop)
Link para blog.geborges.com já configurado
Build estático pronto para S3 + CloudFront

Arquivos principais:
src/app/page.tsx - Página principal
src/app/components/ - Componentes da página
next.config.ts - Configuração de export estático
dist/ - Build pronto para deploy

Para fazer deploy no S3:
aws s3 sync dist/ s3://geborges.com --delete
Próximos passos sugeridos:
Personalizar conteúdo - Atualizar textos, projetos e links sociais nos componentes
Adicionar foto - Incluir sua foto na seção About
CV PDF - Fazer upload do currículo e atualizar o link de download
Blog - Configurar o subdomínio blog.geborges.com (pode usar Ghost, Hashnode, etc.)
