# PRD - Aplicativo Avançado de Gerenciamento de Fotos

## 1. Visão Geral do Produto

Um aplicativo web moderno e intuitivo para gerenciamento pessoal de fotos, permitindo que famílias e indivíduos organizem, editem e descubram suas memórias através de catalogação inteligente, edição poderosa e recursos de IA.

**Plataforma**: Aplicativo Web responsivo (desktop e mobile)
**Público-alvo**: Uso pessoal e familiar
**Armazenamento**: Híbrido (Local primeiro, com sincronização Cloud opcional)

---

## 2. Objetivos do Produto

### Objetivos Primários
- Simplificar a organização de grandes coleções de fotos pessoais
- Tornar a descoberta de memórias rápida e intuitiva através de IA
- Fornecer ferramentas de edição acessíveis mas poderosas
- Garantir acesso seguro e confiável às fotos de qualquer lugar

### Objetivos Secundários
- Reduzir o tempo gasto na organização manual de fotos
- Aumentar o engajamento com memórias antigas através de redescoberta inteligente
- Criar uma experiência de usuário que seja tanto bonita quanto funcional

---

## 3. Público-Alvo

### Persona Primária: "Maria, a Organizadora Familiar"
- **Idade**: 32-45 anos
- **Contexto**: Mãe/pai de família com centenas ou milhares de fotos acumuladas
- **Necessidades**:
  - Organizar fotos de eventos familiares, viagens, crescimento dos filhos
  - Encontrar fotos antigas rapidamente sem lembrar quando foram tiradas
  - Compartilhar álbuns com familiares
  - Interface simples e intuitiva
- **Frustrações atuais**:
  - Fotos espalhadas em múltiplos dispositivos e serviços
  - Difícil encontrar fotos específicas
  - Ferramentas complexas demais ou muito básicas

### Persona Secundária: "João, o Entusiasta de Memórias"
- **Idade**: 25-60 anos
- **Contexto**: Pessoa que valoriza preservar e revisitar memórias
- **Necessidades**:
  - Redescobrir fotos antigas automaticamente
  - Criar narrativas visuais (álbuns temáticos)
  - Melhorar qualidade de fotos antigas
  - Backup seguro na nuvem

---

## 4. Funcionalidades Principais

### 4.1 Gerenciamento e Catalogação
- **Upload em massa**: Arrastar e soltar múltiplas fotos ou pastas inteiras
- **Visualização em grid/lista**: Múltiplas opções de visualização com thumbnails otimizados
- **Metadados automáticos**: Extração de EXIF (data, localização, câmera, configurações)
- **Biblioteca unificada**: Todas as fotos acessíveis em um único lugar
- **Detecção de duplicatas**: Identificar e gerenciar fotos duplicadas

### 4.2 Organização Inteligente com IA

#### Agrupamento Temporal Automático
- **Por data**: Organização automática por ano, mês, dia
- **Eventos**: Detecção de eventos baseada em clusters de fotos (ex: "Férias em julho de 2023")
- **Cronologia**: Visualização em linha do tempo interativa
- **Sugestões de agrupamento**: "Parece que você tem 47 fotos de dezembro de 2024, quer criar um álbum?"

#### Busca Inteligente
- **Busca por conteúdo**: Pesquisar por objetos, cenas, atividades (ex: "praia", "cachorro", "aniversário")
- **Busca por texto**: Pesquisar em nomes de álbuns, tags, descrições
- **Busca por data**: Calendário visual para navegação temporal
- **Busca combinada**: Filtros múltiplos (ex: "praia em 2023 com tag 'família'")
- **Autocomplete inteligente**: Sugestões contextuais enquanto digita

#### Organização Automática
- **Categorização**: Sugestões automáticas de categorias (Viagens, Família, Eventos, etc.)
- **Detecção de locais**: Agrupar por lugares visitados (requer dados de GPS)
- **Reconhecimento de padrões**: Identificar coleções naturais (ex: séries de fotos similares)

### 4.3 Álbuns e Tags

#### Álbuns
- **Criar álbuns personalizados**: Organização manual com drag-and-drop
- **Álbuns inteligentes**: Baseados em regras (ex: "Todas as fotos de 2024 com tag 'viagem'")
- **Capas personalizáveis**: Escolher foto de capa e design
- **Álbuns aninhados**: Estrutura hierárquica (ex: "Viagens" > "Europa 2024" > "Paris")
- **Compartilhamento de álbuns**: Links de visualização com controle de privacidade

#### Sistema de Tags
- **Tags manuais**: Adicionar múltiplas tags por foto
- **Tags sugeridas**: IA sugere tags baseadas no conteúdo
- **Hierarquia de tags**: Tags pai/filho (ex: "Pessoas" > "Família" > "Filhos")
- **Cores de tags**: Organização visual por cores
- **Tag em massa**: Aplicar tags a múltiplas fotos simultaneamente

### 4.4 Edição de Fotos

#### Edições Básicas
- **Corte e rotação**: Ferramentas intuitivas com proporções pré-definidas
- **Ajustes básicos**: Brilho, contraste, saturação, nitidez
- **Filtros**: Coleção de filtros pré-configurados
- **Desfazer/Refazer**: Histórico completo de edições

#### Edições Avançadas
- **Curvas de cor**: Ajustes RGB avançados
- **Ajuste seletivo**: Editar áreas específicas da imagem
- **Remoção de olhos vermelhos**: Correção automática
- **Ajustes de exposição**: Highlights, shadows, whites, blacks
- **Temperatura e matiz**: Correção de balanço de branco

#### Editor Não-Destrutivo
- **Preservar original**: Edições nunca sobrescrevem a foto original
- **Reverter a qualquer momento**: Voltar ao original com um clique
- **Histórico de edições**: Ver e desfazer edições específicas

### 4.5 Interface e UX

#### Design
- **Interface limpa e moderna**: Design minimalista focado nas fotos
- **Modo escuro/claro**: Alternância entre temas
- **Responsivo**: Otimizado para desktop, tablet e mobile
- **Animações suaves**: Transições fluidas e feedback visual

#### Navegação
- **Sidebar com coleções**: Acesso rápido a álbuns, tags, datas
- **Breadcrumbs**: Navegação contextual clara
- **Atalhos de teclado**: Navegação rápida para usuários avançados
- **Visualização em tela cheia**: Modo imersivo para visualizar fotos

#### Performance
- **Carregamento progressivo**: Lazy loading de imagens
- **Thumbnails otimizados**: Múltiplos tamanhos para diferentes contextos
- **Cache inteligente**: Pré-carregamento de próximas fotos
- **Indicadores de progresso**: Feedback claro durante uploads e processamento

---

## 5. Requisitos Funcionais Detalhados

### RF-001: Upload e Importação
- Sistema deve aceitar formatos: JPG, PNG, HEIC, RAW (CR2, NEF, etc.)
- Upload em lote de até 1000 fotos simultaneamente
- Barra de progresso individual e geral
- Processamento em background com notificações
- Retomada automática de uploads interrompidos

### RF-002: Visualização de Fotos
- Grid view: 4 tamanhos de thumbnail (pequeno, médio, grande, extra-grande)
- Lista detalhada com metadados
- Visualização em tela cheia com zoom até 200%
- Navegação por setas (anterior/próxima)
- Slideshow automático configurável

### RF-003: Busca e Filtros
- Busca em tempo real (< 500ms)
- Filtros por: data, tags, álbum, tipo de arquivo, resolução
- Salvar pesquisas como "álbuns inteligentes"
- Histórico de buscas recentes
- Sugestões de busca baseadas em conteúdo

### RF-004: Organização com IA
- Detecção automática de data/hora (EXIF)
- Agrupamento sugerido por eventos (mínimo 5 fotos em 24h)
- Reconhecimento de cenas com 90%+ de precisão
- Sugestões de organização semanais
- Notificações de "memórias" (fotos de X anos atrás)

### RF-005: Gerenciamento de Álbuns
- Criar/editar/excluir álbuns
- Adicionar/remover fotos via drag-and-drop
- Reordenar fotos dentro do álbum
- Álbum pode conter 1 a 10.000 fotos
- Exportar álbum como ZIP

### RF-006: Sistema de Tags
- Até 50 tags por foto
- Autocompletar com tags existentes
- Criar novas tags inline
- Renomear/mesclar/excluir tags globalmente
- Visualizar todas as fotos com determinada tag

### RF-007: Edição de Imagens
- Aplicar preset de edição com um clique
- Comparação antes/depois (slider ou split screen)
- Copiar ajustes entre fotos
- Exportar versão editada (original preservado)
- Suporte a edição em lote para ajustes básicos

### RF-008: Armazenamento Híbrido
**Fase 1 (Local):**
- Armazenamento local no servidor/sistema de arquivos
- Organização hierárquica por data (YYYY/MM/DD)
- Geração de thumbnails otimizados
- Backup local opcional (cópia para outro diretório)

**Fase 2 (Híbrido - opcional):**
- Sincronização automática local ↔ cloud (quando configurado)
- Acesso de qualquer dispositivo com login
- Versioning de fotos editadas (manter original + versões)
- Backup incremental na nuvem
- Status de sincronização visível (sincronizado/pendente/erro)
- Fallback: Se cloud indisponível, usar cache local
- Preferência do usuário: apenas local, apenas cloud, ou híbrido

---

## 6. Requisitos Não-Funcionais

### RNF-001: Performance
- Carregamento inicial da biblioteca: < 2 segundos
- Renderização de grid com 100 fotos: < 1 segundo
- Upload: Mínimo 5MB/s (dependente da conexão)
- Processamento de IA: < 5 segundos por foto
- Busca: Resultados em < 500ms

### RNF-002: Escalabilidade
- Suportar bibliotecas de até 50.000 fotos por usuário
- Suportar 10.000 usuários simultâneos (fase inicial)
- Arquitetura preparada para escalar horizontalmente

### RNF-003: Segurança
- Autenticação via email/senha + OAuth (Google, Apple)
- Autenticação de dois fatores (2FA) opcional
- Criptografia de dados em trânsito (TLS 1.3)
- Criptografia de dados em repouso (AES-256)
- Sessões expiram após 30 dias de inatividade
- Logs de auditoria de ações críticas

### RNF-004: Disponibilidade
- Uptime de 99.5% (meta inicial)
- Backup automático diário
- Recovery Point Objective (RPO): 24 horas
- Recovery Time Objective (RTO): 4 horas

### RNF-005: Usabilidade
- Interface intuitiva: usuário deve completar primeira organização em < 10 minutos
- Suporte a português (BR)
- Suporte a inglês (planejado)
- Acessibilidade WCAG 2.1 nível AA
- Onboarding interativo para novos usuários

### RNF-006: Compatibilidade
- Navegadores: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- Responsivo: Desktop (1920px+), Tablet (768px-1919px), Mobile (320px-767px)
- Leitura de EXIF de todas as câmeras principais

---

## 7. Stack Tecnológico Sugerido

### Frontend
- **Framework**: React 18+ com TypeScript
- **Gerenciamento de estado**: Redux Toolkit ou Zustand
- **UI Components**: Material-UI ou Chakra UI
- **Upload de arquivos**: Uppy ou react-dropzone
- **Editor de imagens**: fabric.js ou Pintura Image Editor
- **Visualização de imagens**: react-image-gallery
- **Virtualização**: react-window para grids grandes

### Backend
- **Runtime**: Node.js 20+ com Express ou NestJS
- **Linguagem**: TypeScript
- **API**: RESTful + GraphQL (opcional para busca complexa)
- **Autenticação**: Passport.js + JWT
- **Processamento de imagens**: Sharp (redimensionamento, thumbnails)

### Banco de Dados
- **Principal**: PostgreSQL (metadados, usuários, álbuns, tags)
- **Cache**: Redis (sessões, resultados de busca)
- **Busca**: Elasticsearch ou Meilisearch (busca em texto e tags)

### Armazenamento

#### Fase 1: Armazenamento Local (MVP)
- **Armazenamento de Fotos**: Sistema de arquivos local do servidor
- **Organização**: Estrutura de pastas hierárquica (ano/mês/dia)
- **Banco de dados**: SQLite ou PostgreSQL local para metadados
- **Custo**: $0 (100% gratuito)

#### Fase 2+: Cloud Opcional (Sincronização)
- **Object Storage**:
  - Cloudflare R2 (10GB grátis) - **RECOMENDADO**
  - AWS S3 ou Google Cloud Storage
  - Supabase Storage (1GB grátis)
- **CDN**: Cloudflare (plano gratuito)
- **Sincronização**: Bidirecional entre local e cloud

### IA e Machine Learning

#### Fase 1: IA Local/Gratuita (MVP)
- **TensorFlow.js**: Modelos rodando no navegador (100% gratuito)
  - CLIP ou MobileNet para classificação de imagens
  - COCO-SSD para detecção de objetos
- **Processamento local**: Análise de EXIF e agrupamento temporal
- **Clustering**: K-means para detecção de eventos (implementação própria)
- **Custo**: $0

#### Fase 2+: IA Avançada (Opcional)
- **Google Cloud Vision API** ou **AWS Rekognition** (APIs pagas)
  - Apenas se usuário optar e configurar suas próprias chaves
- **Fallback**: Sempre usar modelos locais se APIs não configuradas

### Infraestrutura

#### Fase 1: Infraestrutura Gratuita (MVP)
- **Frontend**: Vercel ou Cloudflare Pages (grátis)
- **Backend**: Render, Fly.io ou Railway (free tiers)
- **Banco de Dados**:
  - Supabase (PostgreSQL grátis até 500MB)
  - Upstash (Redis grátis até 10k comandos/dia)
- **CI/CD**: GitHub Actions (grátis)
- **Monitoramento**:
  - Sentry (5k eventos/mês grátis)
  - Google Analytics (grátis)
- **Custo Total**: $0/mês

#### Fase 2+: Infraestrutura Escalável
- **Backend**: VPS dedicado (DigitalOcean, Hetzner ~$5-10/mês)
- **Database**: PostgreSQL gerenciado
- **Logs**: CloudWatch ou self-hosted Grafana

---

## 8. Arquitetura de Alto Nível

### Fase 1: Arquitetura Local (MVP)
```
┌─────────────────────────────────────────────────────┐
│                Frontend (React + TensorFlow.js)      │
│  ┌──────────┐  ┌──────────┐  ┌─────────────────┐   │
│  │ Gallery  │  │  Editor  │  │  Search & Tags  │   │
│  │          │  │          │  │  + IA Local     │   │
│  └──────────┘  └──────────┘  └─────────────────┘   │
└─────────────────────────┬───────────────────────────┘
                          │ HTTPS/REST API
┌─────────────────────────▼───────────────────────────┐
│                  Backend (Node.js)                   │
│  ┌───────────┐  ┌──────────┐  ┌─────────────────┐  │
│  │    API    │  │   Auth   │  │  Processing     │  │
│  │ Gateway   │  │ Service  │  │     Queue       │  │
│  └───────────┘  └──────────┘  └─────────────────┘  │
└────┬──────────────┬──────────────┬──────────────────┘
     │              │              │
     ▼              ▼              ▼
┌─────────┐  ┌──────────┐  ┌──────────────────────┐
│   DB    │  │  Cache   │  │  Armazenamento       │
│(Postgres│  │ (Redis)  │  │  Local (FileSystem)  │
│  local) │  │ (local)  │  │  /uploads/YYYY/MM/   │
└─────────┘  └──────────┘  └──────────────────────┘
```

### Fase 2+: Arquitetura Híbrida (Local + Cloud)
```
┌─────────────────────────────────────────────────────┐
│                Frontend (React + TensorFlow.js)      │
│  ┌──────────┐  ┌──────────┐  ┌─────────────────┐   │
│  │ Gallery  │  │  Editor  │  │  Search & Tags  │   │
│  └──────────┘  └──────────┘  └─────────────────┘   │
└─────────────────────────┬───────────────────────────┘
                          │ HTTPS/REST API
┌─────────────────────────▼───────────────────────────┐
│                  Backend (Node.js)                   │
│  ┌───────────┐  ┌──────────┐  ┌─────────────────┐  │
│  │    API    │  │   Auth   │  │  Sync Service   │  │
│  │ Gateway   │  │ Service  │  │  (Local↔Cloud)  │  │
│  └───────────┘  └──────────┘  └─────────────────┘  │
└────┬──────────────┬──────────────┬──────────────────┘
     │              │              │
     ▼              ▼              ▼
┌─────────┐  ┌──────────┐  ┌──────────────────────┐
│   DB    │  │  Cache   │  │  Armazenamento       │
│(Postgres)│  │ (Redis)  │  │  HÍBRIDO             │
└─────────┘  └──────────┘  └──────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
         ┌────────────────────┐         ┌─────────────────┐
         │  Local Storage     │         │  Cloud Storage  │
         │  (primário)        │◄───────►│  (backup/sync)  │
         │  /uploads/         │  Sync   │  Cloudflare R2  │
         └────────────────────┘         └────────┬────────┘
                                                  │
                                                  ▼
                                         ┌────────────────┐
                                         │ CDN (opcional) │
                                         │   Cloudflare   │
                                         └────────────────┘
```

### Fluxo de Upload e Processamento (Fase 1 - Local)
1. Usuário faz upload → Frontend envia para API
2. API salva arquivo original no armazenamento local (/uploads/YYYY/MM/DD/)
3. Worker assíncrono processa:
   - Extrai metadados EXIF (data, GPS, câmera)
   - Gera thumbnails (3 tamanhos: pequeno, médio, grande)
   - TensorFlow.js (no navegador) analisa conteúdo da imagem
   - Salva metadados e tags no PostgreSQL local
4. Frontend recebe notificação de conclusão
5. Foto aparece na biblioteca do usuário

### Fluxo de Upload e Processamento (Fase 2 - Híbrido)
1-4. Mesmos passos da Fase 1
5. **Sync Service** (opcional, se configurado):
   - Detecta nova foto no armazenamento local
   - Faz upload para Cloudflare R2 em background
   - Atualiza registro no DB com URL cloud
   - Mantém sincronia bidirecional
6. Foto acessível tanto localmente quanto na nuvem

### Fluxo de Busca Inteligente
1. Usuário digita busca → Autocomplete via cache
2. Query enviada para backend
3. Backend consulta:
   - Meilisearch ou PostgreSQL Full-Text Search (texto, tags)
   - PostgreSQL (metadados, datas, labels de IA)
   - Redis cache para resultados recentes
4. Resultados ranqueados por relevância (score baseado em matches)
5. Resultados retornados paginados (50 por página)
6. Frontend carrega imagens do armazenamento local (ou cloud se configurado)

---

## 9. Roadmap de Desenvolvimento

### Fase 1: MVP Local (3-4 meses)
**Objetivo**: Produto mínimo viável 100% local e gratuito

#### Mês 1-2: Fundação Local
- [ ] Setup de infraestrutura (repos, CI/CD, Docker)
- [ ] Autenticação local (login, registro com JWT)
- [ ] Upload de fotos básico (JPG, PNG)
- [ ] **Armazenamento local** em sistema de arquivos + geração de thumbnails
- [ ] PostgreSQL local para metadados
- [ ] Visualização em grid e tela cheia
- [ ] Extração de metadados EXIF
- [ ] **TensorFlow.js** integrado para análise básica de imagens

#### Mês 3-4: Organização Básica + IA Local
- [ ] Criação e gerenciamento de álbuns
- [ ] Sistema de tags manual
- [ ] **Tags automáticas com TensorFlow.js** (MobileNet/COCO-SSD)
- [ ] Busca por texto (nome, tags, descrição) com PostgreSQL Full-Text
- [ ] Filtros por data
- [ ] Agrupamento temporal automático (por ano/mês/dia)
- [ ] Interface responsiva básica
- [ ] Detecção de eventos (clustering temporal)

**Entregáveis MVP**:
- Sistema 100% funcional rodando localmente (sem custos de cloud)
- IA básica funcionando no navegador
- Usuários podem fazer upload, organizar, adicionar tags e buscar fotos
- Interface funcional em desktop e mobile
- **Custo: $0/mês**

### Fase 2: Sincronização Cloud (2-3 meses)
**Objetivo**: Adicionar backup e sincronização na nuvem (opcional)

#### Funcionalidades
- [ ] **Sync Service**: Sincronização bidirecional local ↔ cloud
- [ ] Integração com Cloudflare R2 (10GB grátis)
- [ ] Configuração opcional (usuário escolhe se quer cloud)
- [ ] Upload incremental em background
- [ ] Indicadores de status de sincronização
- [ ] Resolução de conflitos (última modificação ganha)
- [ ] Acesso multi-dispositivo (se cloud habilitado)
- [ ] CDN para distribuição de imagens (Cloudflare)

**Entregáveis**:
- Sistema híbrido funcional: local + cloud opcional
- Usuários podem escolher entre local-only ou sincronização
- **Custo: $0/mês (dentro do free tier)** ou $5-10/mês se exceder

### Fase 3: IA Avançada e Busca Inteligente (2 meses)
**Objetivo**: Melhorar experiência de descoberta com IA

#### Funcionalidades
- [ ] **Modelos de IA mais avançados** (CLIP para busca semântica)
- [ ] Busca por conteúdo visual ("mostrar fotos parecidas com esta")
- [ ] Álbuns inteligentes (baseados em regras: "fotos de 2024 com praia")
- [ ] Sugestões automáticas de agrupamento
- [ ] Recurso "Memórias" (fotos de X anos atrás)
- [ ] Melhoria da precisão de tags automáticas
- [ ] Detecção de duplicatas (perceptual hashing)
- [ ] Busca por cor dominante

**Entregáveis**:
- IA que melhora significativamente a descoberta de fotos
- Busca semântica funcional
- **Custo: $0/mês (tudo rodando localmente)**

### Fase 4: Editor Avançado (2 meses)
**Objetivo**: Ferramentas de edição poderosas

#### Funcionalidades
- [ ] Editor completo integrado (fabric.js)
- [ ] Ajustes básicos (crop, rotate, brightness, contrast, saturation)
- [ ] Filtros pré-definidos (10-15 filtros)
- [ ] Ajustes avançados (curves, selective edits)
- [ ] Edições não-destrutivas (preservar original)
- [ ] Histórico de edições (undo/redo ilimitado)
- [ ] Edição em lote (aplicar ajustes em múltiplas fotos)
- [ ] Presets personalizados (salvar configurações)

**Entregáveis**:
- Editor completo que elimina necessidade de apps externos

### Fase 5: Colaboração e Compartilhamento (1-2 meses)
**Objetivo**: Recursos sociais e compartilhamento

#### Funcionalidades
- [ ] Compartilhamento de álbuns via link
- [ ] Controles de privacidade (público, privado, link)
- [ ] Comentários em fotos (opcional)
- [ ] Convites para colaboração em álbuns
- [ ] Exportação de álbuns (ZIP, PDF)

### Fase 6: Otimizações e Polimento (Contínuo)
- [ ] Melhorias de performance baseadas em métricas
- [ ] A/B testing de features
- [ ] Análise de uso e otimização de UX
- [ ] Suporte a mais formatos (RAW, HEIC)
- [ ] Modo offline (PWA)
- [ ] Backup e recuperação de conta

---

## 10. Métricas de Sucesso

### Métricas de Adoção
- **Usuários ativos mensais (MAU)**: 10.000 no primeiro ano
- **Taxa de retenção**: 60% após 30 dias, 40% após 90 dias
- **Crescimento**: 20% MoM nos primeiros 6 meses

### Métricas de Engajamento
- **Fotos por usuário**: Média de 500 fotos nos primeiros 3 meses
- **Sessões por usuário**: 8-10 sessões por mês
- **Tempo médio de sessão**: 8-12 minutos
- **Álbuns criados**: 3-5 álbuns por usuário ativo
- **Uso de busca**: 40% dos usuários usam busca semanalmente
- **Uso de IA**: 70% dos usuários interagem com sugestões de IA

### Métricas de Satisfação
- **Net Promoter Score (NPS)**: > 40
- **Satisfação geral**: > 4.2/5 em pesquisas
- **Taxa de conversão (free → paid)**: 5-10% (se houver planos pagos)

### Métricas Técnicas
- **Uptime**: > 99.5%
- **Tempo de carregamento**: < 2s (p95)
- **Taxa de erro**: < 0.5%
- **Taxa de sucesso de upload**: > 99%

### Métricas de Negócio (Futuro)
- **Custo por usuário**: < $2/mês (infraestrutura + IA)
- **LTV/CAC ratio**: > 3:1
- **Churn rate**: < 5% mensal

---

## 11. Riscos e Mitigações

### Risco 1: Custos de IA e Storage
**Risco**: APIs de IA e armazenamento podem ficar caros rapidamente
**Mitigação**:
- **Abordagem híbrida**: Começar 100% local (custo zero)
- Usar TensorFlow.js rodando no navegador (sem custo de servidor)
- Cloud storage apenas opcional (Cloudflare R2 free tier: 10GB)
- Implementar cache agressivo de resultados de IA
- Limites de storage se usar cloud (10GB grátis, depois pago)
- Otimizar compressão de imagens e thumbnails
- **MVP pode rodar indefinidamente sem custos de infraestrutura**

### Risco 2: Performance com Bibliotecas Grandes
**Risco**: Degradação de performance com muitas fotos
**Mitigação**:
- Paginação e lazy loading desde o início
- Indexação adequada no banco de dados
- CDN para distribuição de imagens
- Virtualização de listas longas

### Risco 3: Privacidade e Segurança
**Risco**: Vazamento de fotos pessoais seria catastrófico
**Mitigação**:
- Criptografia end-to-end
- Auditorias de segurança regulares
- Compliance com LGPD/GDPR
- Testes de penetração
- Backups redundantes

### Risco 4: Precisão da IA
**Risco**: IA pode categorizar fotos incorretamente
**Mitigação**:
- Apresentar sugestões como opcionais, não automáticas
- Permitir usuário corrigir/rejeitar sugestões
- Melhorar modelos com feedback do usuário
- Transparência sobre como a IA funciona

### Risco 5: Competição
**Risco**: Mercado tem players grandes (Google Photos, iCloud)
**Mitigação**:
- Focar em nicho familiar/pessoal com UX superior
- Recursos únicos (agrupamento temporal inteligente)
- Privacidade como diferencial
- Planos de preço competitivos

---

## 12. Considerações Futuras

### Features Pós-MVP (Backlog)
- Reconhecimento facial para agrupar por pessoas
- Upload automático de mobile (app nativo)
- Integração com redes sociais (import de Instagram, Facebook)
- Impressão de álbuns físicos (parceria)
- Livros de fotos customizáveis
- Compartilhamento familiar (contas família)
- Vídeos (suporte básico)
- Colaboração em tempo real
- API pública para integrações
- Desktop app (Electron)

### Modelo de Negócio (Potencial)
- **Plano Gratuito**: 10GB, features básicas
- **Plano Premium**: $4.99/mês - 100GB, IA ilimitada, editor avançado
- **Plano Família**: $9.99/mês - 500GB, até 6 contas
- **Enterprise**: Preço customizado para organizações

### Compliance e Legal
- Termos de serviço
- Política de privacidade (LGPD/GDPR)
- Direitos de propriedade de fotos
- Retenção de dados
- Direito ao esquecimento

---

## 12.1. Estratégia de Armazenamento Híbrido (Detalhamento)

### Visão Geral
O aplicativo adota uma estratégia **local-first** (local primeiro), onde o armazenamento local é a fonte primária de verdade, com sincronização cloud opcional e configurável pelo usuário.

### Vantagens da Abordagem Híbrida

**1. Custo Zero Inicial**
- MVP pode rodar indefinidamente sem custos de cloud
- Ideal para desenvolvimento, testes e validação
- Escalável: pagar apenas quando necessário

**2. Privacidade e Controle**
- Dados ficam no servidor/dispositivo do usuário
- Não dependência de terceiros para funcionalidade básica
- Usuário escolhe se quer enviar dados para cloud

**3. Performance**
- Acesso local é sempre mais rápido
- Sem latência de rede para operações básicas
- Cache local elimina requisições desnecessárias

**4. Resiliência**
- Funciona offline ou com internet instável
- Se cloud ficar indisponível, app continua funcionando
- Redundância: dados existem em múltiplos locais

### Modos de Operação

**Modo 1: Local-Only (Padrão no MVP)**
```
Usuário → App → Armazenamento Local
```
- Todas as fotos armazenadas localmente
- Nenhum custo de cloud
- Máxima privacidade
- Acesso apenas do servidor onde está hospedado

**Modo 2: Local + Cloud Sync (Fase 2)**
```
Usuário → App → Armazenamento Local ↔ Cloud Storage
                       (primário)         (backup/sync)
```
- Fotos armazenadas localmente (primário)
- Sincronizadas automaticamente com cloud (backup)
- Acesso de qualquer dispositivo
- Fallback para local se cloud indisponível

**Modo 3: Cloud-First (Futuro - Fase 3+)**
```
Usuário → App → Cloud Storage ↔ Cache Local
                   (primário)     (cache)
```
- Fotos armazenadas primariamente na cloud
- Cache local para performance
- Ideal para múltiplos usuários/dispositivos

### Estratégia de Sincronização (Fase 2)

**Sincronização Bidirecional:**
1. **Upload (Local → Cloud)**:
   - Detectar novas fotos em `/uploads/`
   - Fazer upload em background para Cloudflare R2
   - Marcar como "sincronizado" no DB
   - Retry automático em caso de falha

2. **Download (Cloud → Local)**:
   - Ao fazer login em novo dispositivo
   - Baixar índice de fotos da cloud
   - Download sob demanda ou em background
   - Priorizar fotos recentes

3. **Resolução de Conflitos**:
   - Última modificação vence (Last-Write-Wins)
   - Alternativa: Manter ambas versões com timestamp
   - Notificar usuário em caso de conflito

### Configuração de Storage por Usuário

```typescript
// Exemplo de configuração
interface StorageConfig {
  mode: 'local-only' | 'hybrid' | 'cloud-first'
  cloudProvider?: 'cloudflare-r2' | 's3' | 'gcs'
  syncEnabled: boolean
  syncInterval: number // minutos
  autoUpload: boolean
  storageQuota: number // GB
}
```

### Estimativa de Custos por Modo

**Local-Only (Fase 1)**:
- Armazenamento: $0 (usa disco local)
- Bandwidth: $0
- IA: $0 (TensorFlow.js)
- **Total: $0/mês**

**Híbrido com 100 usuários, 500 fotos/usuário (Fase 2)**:
- Armazenamento local: $0
- Cloud (50GB no R2): $0 (dentro do free tier de 10GB) a $1/mês
- Bandwidth: $0 (Cloudflare grátis)
- IA: $0
- **Total: $0-1/mês**

**Híbrido com 1.000 usuários, 500 fotos/usuário**:
- Armazenamento: 500GB no R2 = $10/mês
- Bandwidth: Grátis (Cloudflare)
- **Total: ~$10-15/mês**

---

## 13. Conclusão

Este PRD define um aplicativo de gerenciamento de fotos focado em:
1. **Simplicidade**: Interface intuitiva para uso familiar
2. **Inteligência**: IA local gratuita que facilita organização e descoberta
3. **Poder**: Ferramentas de edição robustas
4. **Flexibilidade**: Armazenamento híbrido (local primeiro, cloud opcional)
5. **Custo Zero**: MVP 100% funcional sem necessidade de infraestrutura paga

### Diferenciais da Abordagem Híbrida

**Fase 1 (MVP Local)**:
- Desenvolvimento completo sem custos de cloud
- IA rodando no navegador (TensorFlow.js)
- Armazenamento local seguro e privado
- Deploy simples em qualquer servidor ou localhost
- Ideal para validação e desenvolvimento inicial

**Fase 2+ (Cloud Opcional)**:
- Sincronização apenas se usuário configurar
- Backup automático na nuvem
- Acesso multi-dispositivo
- Mantém funcionamento local mesmo se cloud falhar

O desenvolvimento será iterativo, começando com um **MVP 100% local e gratuito**, expandindo gradualmente com sincronização cloud opcional. O sucesso será medido pela adoção, engajamento e satisfação dos usuários.

**Próximos passos**:
1. Validar PRD com stakeholders
2. Criar designs de UI/UX (wireframes e mockups)
3. Setup de infraestrutura local (Docker, PostgreSQL, Node.js)
4. Início do desenvolvimento da Fase 1 (MVP Local)
5. Configurar TensorFlow.js para IA no navegador
