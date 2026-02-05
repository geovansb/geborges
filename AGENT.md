# AGENTS.md - Guia para Agentes de IA

## 🎯 Visão Geral do Projeto

Este é o **portfolio pessoal de Geovane Borges (geborges.com)** - um site minimalista desenvolvido com Next.js, React, TypeScript e Tailwind CSS. O site é estático e projetado para deploy em S3 + CloudFront.

### Propósito
- Apresentar o profissional e suas habilidades
- Exibir projetos desenvolvidos
- Facilitar contato via email e redes sociais
- Direcionar para o blog no subdomínio blog.geborges.com

---

## 🏗️ Arquitetura e Tecnologias

### Stack Principal
- **Framework**: Next.js 16.1.3 (App Router)
- **React**: 19.2.3
- **Linguagem**: TypeScript 5.9.3
- **Estilização**: Tailwind CSS 4.1.17
- **Build**: Export estático (`output: 'export'`)

### Estrutura de Diretórios
```
website/
├── src/app/
│   ├── page.tsx              # Página principal (SPA)
│   ├── layout.tsx            # Layout raiz
│   ├── globals.css           # Estilos globais
│   └── components/           # Componentes React
│       ├── Header.tsx        # Navegação fixa
│       ├── Hero.tsx          # Seção inicial
│       ├── About.tsx         # Sobre mim + habilidades
│       ├── Projects.tsx      # Projetos
│       ├── Contact.tsx       # Contato
│       └── Footer.tsx        # Rodapé
├── dist/                     # Build estático (output)
├── next.config.ts            # Configuração do Next.js
├── package.json              # Dependências
└── AGENTS.md                 # Este arquivo

infra/
├── scripts/
│   ├── deploy-site.sh        # Script de deploy para S3 + CloudFront
│   └── create-tfstate-bucket.sh  # Script de criação do bucket de estado Terraform
└── terraform/
    ├── s3.tf                 # Configuração do S3 bucket
    ├── cloudfront.tf         # Configuração do CloudFront
    └── ...                   # Outros arquivos Terraform
```

### Configurações Importantes
- **Base Path**: `/` (deploy na raiz do domínio)
- **Asset Prefix**: `https://d3iepotnaojrtv.cloudfront.net/`
- **Trailing Slash**: Habilitado (para S3)

---

## 🎨 Design System

### Paleta de Cores
- **Primária**: `#5a7a8a` (azul mate)
- **Background Principal**: `#f8f9fa` (cinza claro)
- **Background Secundário**: `#e9ecef` (cinza médio)
- **Texto Principal**: `#343a40` (cinza escuro)
- **Texto Secundário**: `#6c757d` (cinza médio)

### Tipografia
- Fonte: Inter (Google Fonts - configurada no layout)
- Estilo: Clean, minimalista, discreta

### Componentes Visuais
- Cards com bordas sutis e sombras leves
- Tags/badges com cantos arredondados (rounded-full)
- Botões com hover states suaves
- Animações de scroll suaves entre seções

---

## 📝 Seções do Site

### 1. Header (Navegação)
- Fixo no topo com efeito glassmorphism ao scrollar
- Links: Início, Sobre, Projetos, Contato
- Botão "Blog" (link externo para blog.geborges.com)
- Menu mobile responsivo

### 2. Hero
- Apresentação pessoal
- CTA para projetos e contato
- Design clean com tipografia impactante

### 3. About (Sobre)
- Bio pessoal em 3 parágrafos
- Habilidades organizadas por categoria:
  - Frontend: React, Next.js, TypeScript, Tailwind CSS
  - Backend: Node.js, Python, PostgreSQL, AWS
  - Ferramentas: Git, Docker, Figma, Linux
- Interesses com emojis
- Link para download do CV (PDF)

### 4. Projects (Projetos)
- Grid de 4 projetos exemplo
- Cada projeto: título, descrição, tags, link GitHub
- Layout responsivo (1 coluna mobile, 2 colunas desktop)

### 5. Contact (Contato)
- CTA para email
- Links sociais: GitHub, LinkedIn, Twitter

### 6. Footer
- Copyright
- Links rápidos

---

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
bun run dev          # Inicia servidor de desenvolvimento

# Build
bun run build        # Gera build estático na pasta dist/

# Qualidade
bun run lint         # ESLint - verificação de código
bun run typecheck    # TypeScript - verificação de tipos

# Produção
bun run start        # Serve o build (após build)
```

### Scripts de Infraestrutura
```bash
# deploy do site (da pasta infra/scripts/)
./deploy-site.sh --profile <aws_profile>           # deploy sem build
./deploy-site.sh --profile <aws_profile> --install --build  # instala deps + build + deploy
./deploy-site.sh --profile <aws_profile> --dry-run # simular deploy

# criar bucket de estado Terraform
./create-tfstate-bucket.sh --profile <aws_profile> --region us-east-1
```

---

## 📋 Regras de Desenvolvimento

### SEMPRE executar após modificações:
1. **Lint**: `bun run lint`
2. **Typecheck**: `bun run typecheck`
3. **Build**: `bun run build` (para testar export estático)

### Convenções de Código
- Usar TypeScript com tipagem estrita
- Componentes React funcionais com export default
- Tailwind CSS para todos os estilos (sem CSS modules)
- Nomes de arquivos: PascalCase para componentes
- Cores: SEMPRE usar variáveis da paleta definida acima

### Boas Práticas
- Manter design minimalista e clean
- Garantir responsividade mobile-first
- Navegação suave entre seções (scrollIntoView)
- Evitar adicionar dependências desnecessárias

---

## 🔄 Atualizações Frequentes

### Conteúdo que muda regularmente:
- **Projetos**: Adicionar/remover projetos em `Projects.tsx`
- **Habilidades**: Atualizar skills em `About.tsx`
- **Bio**: Atualizar texto sobre mim
- **Links Sociais**: Verificar URLs em `Contact.tsx`

### Deploy
O build estático na pasta `dist/` é sincronizado com o S3 e invalidado o cache do CloudFront automaticamente:
```bash
# Da pasta infra/scripts/
./deploy-site.sh --profile <aws_profile>

# Opções:
#   -p, --profile    Perfil AWS (obrigatório)
#   -r, --region     Região AWS (default: us-east-1)
#   -i, --install    Instala dependências com bun install
#   -b, --build      Build o site antes do deploy
#   --no-wait        Não esperar a invalidação completar
#   -d, --dry-run    Simular sem executar
```

**Pré-requisitos:**
1. AWS CLI v2 instalado
2. Sessão SSO ativa: `aws sso login --profile <profile>`
3. Bun instalado (para build)

---

## ⚠️ Importante

### Antes de fazer qualquer alteração:
1. Leia este arquivo AGENTS.md completamente
2. Entenda o contexto da mudança solicitada
3. Siga as convenções de código existentes

### Após completar qualquer tarefa:
1. Execute lint e typecheck
2. Teste o build (`bun run build`)
3. **ATUALIZE ESTE ARQUIVO** se necessário:
   - Se adicionou novas dependências
   - Se mudou a estrutura do projeto
   - Se alterou configurações importantes
   - Se adicionou novas seções ou componentes
   - Se modificou o design system

---

## 📝 Histórico de Atualizações

### 2026-02-05
- Adicionado script de deploy `deploy-site.sh`
- Script automatiza sync com S3 e invalidação do CloudFront
- Suporte a build automático com Bun
- Flags: --profile, --build, --dry-run, --no-wait
- Adicionada flag --install para instalação de dependências
- Atualizada estrutura de diretórios no AGENTS.md
- Corrigido sync do deploy para aplicar cache distinto em HTML e assets
- ACM fixado no provider us-east-1 para compatibilidade com CloudFront
- Adicionada policy de headers de segurança e attach no CloudFront

### 2026-02-04
- Criação inicial do AGENTS.md
- Documentação completa do projeto
- Estrutura e tecnologias mapeadas
- Design system documentado
- Regras de desenvolvimento estabelecidas

---

**Nota para Agentes**: Este arquivo é a fonte da verdade para o projeto. Sempre mantenha-o atualizado após fazer mudanças significativas. Se algo não estiver claro, pergunte antes de assumir.
