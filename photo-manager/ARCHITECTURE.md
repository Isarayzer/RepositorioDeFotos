# Arquitetura do Photo Manager

## Visão Geral

O Photo Manager é uma aplicação React SPA (Single Page Application) que utiliza armazenamento local (IndexedDB) para persistência de dados sem necessidade de backend.

## Stack Tecnológico

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Tipagem estática
- **Material-UI (MUI)** - Biblioteca de componentes
- **Vite** - Build tool e dev server
- **React Dropzone** - Upload de arquivos
- **LocalForage** - Wrapper para IndexedDB

### Armazenamento
- **IndexedDB** - Banco de dados local do navegador
- **LocalForage** - Abstração sobre IndexedDB para facilitar uso

## Estrutura de Pastas

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── PhotoUploader.tsx      # Upload drag-and-drop
│   ├── PhotoGrid.tsx          # Galeria de fotos
│   ├── FullscreenViewer.tsx   # Visualizador modal
│   ├── SearchBar.tsx          # Busca e filtros
│   ├── Sidebar.tsx            # Navegação lateral
│   └── BulkActions.tsx        # Ações em lote
│
├── context/             # Context API para estado global
│   └── AppContext.tsx         # Provider com toda lógica de negócio
│
├── hooks/               # Custom React hooks
│   └── useLocalStorage.ts     # Interface com IndexedDB
│
├── types/               # TypeScript types/interfaces
│   └── index.ts               # Photo, Album, Tag, etc.
│
├── utils/               # Funções utilitárias
│   ├── theme.ts               # Temas MUI (light/dark)
│   └── helpers.ts             # Funções auxiliares
│
├── App.tsx              # Componente raiz da aplicação
└── main.tsx             # Entry point
```

## Fluxo de Dados

```
┌─────────────────────────────────────────────────┐
│           User Interaction (UI)                  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│          React Components                        │
│  (PhotoGrid, Sidebar, SearchBar, etc.)          │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│           AppContext (Context API)               │
│  • Estado global (photos, albums, tags)         │
│  • Ações (addPhotos, createAlbum, etc.)         │
│  • Lógica de negócio                            │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│         useLocalStorage Hook                     │
│  • Interface com IndexedDB                      │
│  • CRUD operations                              │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│       IndexedDB (Browser Storage)                │
│  • photosStore: Objetos Photo                   │
│  • albumsStore: Objetos Album                   │
│  • tagsStore: Objetos Tag                       │
└─────────────────────────────────────────────────┘
```

## Modelos de Dados

### Photo
```typescript
interface Photo {
  id: string;              // UUID único
  file: File;              // Objeto File original
  url: string;             // Object URL para visualização
  name: string;            // Nome do arquivo
  size: number;            // Tamanho em bytes
  type: string;            // MIME type (image/jpeg, etc.)
  dateAdded: Date;         // Data de upload
  dateTaken?: Date;        // Data da foto (EXIF)
  width?: number;          // Largura em pixels
  height?: number;         // Altura em pixels
  tags: string[];          // Array de tags
  albums: string[];        // IDs dos álbuns
  favorite: boolean;       // Flag de favorito
}
```

### Album
```typescript
interface Album {
  id: string;              // UUID único
  name: string;            // Nome do álbum
  description?: string;    // Descrição opcional
  coverPhotoId?: string;   // ID da foto de capa
  photoIds: string[];      // IDs das fotos no álbum
  createdAt: Date;         // Data de criação
  updatedAt: Date;         // Data de atualização
}
```

### Tag
```typescript
interface Tag {
  id: string;              // UUID único
  name: string;            // Nome da tag
  color?: string;          // Cor hex (opcional)
  count: number;           // Número de fotos com esta tag
}
```

## Padrões de Design Utilizados

### 1. Context API Pattern
- **AppContext** centraliza todo o estado e lógica
- Componentes são "dumb" e apenas renderizam/disparam ações
- Evita prop drilling

### 2. Custom Hooks
- **useLocalStorage**: Encapsula toda interação com IndexedDB
- Reutilizável e testável
- Separação de responsabilidades

### 3. Compound Components
- Componentes compostos (ex: SearchBar com filtros)
- Cada componente tem responsabilidade única

### 4. Controlled Components
- Formulários controlados com state do React
- Validação em tempo real

## Gerenciamento de Estado

### Estado Global (AppContext)
```typescript
{
  photos: Photo[];              // Todas as fotos
  albums: Album[];              // Todos os álbuns
  tags: Tag[];                  // Todas as tags
  selectedPhotos: string[];     // IDs selecionados
  currentView: ViewMode;        // Configuração da view
  searchFilters: SearchFilters; // Filtros ativos
  fullscreenPhotoId: string;    // Foto em fullscreen
  darkMode: boolean;            // Tema escuro/claro
}
```

### Estado Local (Componentes)
- Formulários (inputs)
- Estados de UI temporários (dialogs, menus)

## Armazenamento Local (IndexedDB)

### Estrutura
```
PhotoManager Database
├── photosStore         # Armazena objetos Photo
├── albumsStore         # Armazena objetos Album
└── tagsStore           # Armazena objetos Tag
```

### Vantagens
- Persiste entre sessões
- Armazenamento ilimitado (comparado a localStorage)
- API assíncrona (não bloqueia UI)
- Suporta objetos complexos e blobs

### Limitações
- Específico por origem (domínio)
- Pode ser limpo pelo usuário
- Não sincroniza entre dispositivos (MVP)

## Performance

### Otimizações Implementadas
1. **Lazy Loading**: Componentes carregam sob demanda
2. **Object URLs**: Uso de `URL.createObjectURL` para exibir imagens
3. **Memoization**: Filtros calculados apenas quando necessário
4. **Debounce**: Busca em tempo real com delay

### Otimizações Futuras
- Virtual scrolling para grandes bibliotecas
- Web Workers para processamento de imagens
- Service Workers para cache
- Lazy loading de imagens (intersection observer)

## Segurança

### Validações
- Tipo de arquivo (apenas imagens)
- Tamanho de arquivo (configurável)
- Sanitização de inputs

### Privacidade
- Dados 100% locais
- Sem tracking
- Sem envio para servidores externos

## Extensibilidade

### Pontos de Extensão
1. **Novos Storage Providers**: Adicionar cloud sync
2. **Plugins de IA**: TensorFlow.js para análise
3. **Temas Customizados**: Expandir sistema de temas
4. **Exportação**: Adicionar novos formatos

### Arquitetura Preparada Para
- Sincronização cloud (Fase 2 do PRD)
- IA local com TensorFlow.js
- PWA (Progressive Web App)
- Editor de fotos integrado

## Testes

### Estratégia (A Implementar)
- **Unit Tests**: Funções utilitárias e hooks
- **Integration Tests**: Context e storage
- **E2E Tests**: Fluxos principais do usuário

### Ferramentas Sugeridas
- Vitest (unit tests)
- React Testing Library
- Playwright (E2E)

## Build e Deploy

### Build de Produção
```bash
npm run build
```
Gera bundle otimizado em `dist/`

### Deploy Options
1. **Vercel** (recomendado para SPAs)
2. **Netlify**
3. **GitHub Pages**
4. **Cloudflare Pages**
5. **Qualquer servidor estático**

### Configuração de Deploy
- SPA routing: Configurar fallback para index.html
- Cache headers para assets
- Compression (gzip/brotli)

## Roadmap Técnico

### Fase 1 (Atual - MVP)
- [x] Upload e visualização de fotos
- [x] Álbuns e tags
- [x] Busca e filtros
- [x] Armazenamento local

### Fase 2 (Próxima)
- [ ] Editor de fotos básico
- [ ] TensorFlow.js para tags automáticas
- [ ] PWA com offline support
- [ ] Exportação de álbuns

### Fase 3 (Futura)
- [ ] Sincronização cloud opcional
- [ ] Detecção de duplicatas
- [ ] Reconhecimento facial
- [ ] Timeline inteligente

## Referências

- [React Documentation](https://react.dev)
- [Material-UI](https://mui.com)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [LocalForage](https://localforage.github.io/localForage/)
- [PRD Original](../PRD.md)
