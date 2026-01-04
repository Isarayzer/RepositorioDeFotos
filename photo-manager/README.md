# Photo Manager - Gerenciador de Fotos

Aplicativo web moderno para gerenciamento pessoal de fotos com organização inteligente, busca avançada e armazenamento local.

## Características

### Funcionalidades Principais

- **Upload de Fotos**: Arraste e solte ou selecione múltiplas fotos
- **Galeria Responsiva**: Visualização em grid com 4 tamanhos diferentes
- **Visualização em Tela Cheia**: Navegação entre fotos com setas do teclado
- **Sistema de Álbuns**: Crie e organize álbuns personalizados
- **Sistema de Tags**: Adicione tags manualmente às fotos
- **Busca Inteligente**: Pesquise por nome, tags ou favoritos
- **Favoritos**: Marque fotos importantes
- **Ações em Lote**: Adicione tags ou organize múltiplas fotos simultaneamente
- **Armazenamento Local**: Todas as fotos ficam armazenadas no navegador (IndexedDB)
- **Modo Escuro/Claro**: Alterne entre temas

### Tecnologias Utilizadas

- **React 18** com TypeScript
- **Material-UI (MUI)** para componentes de UI
- **Vite** para build e desenvolvimento rápido
- **LocalForage** para armazenamento local com IndexedDB
- **React Dropzone** para upload de arquivos
- **Date-fns** para formatação de datas

## Instalação e Execução

### Pré-requisitos

- Node.js 18+ e npm instalados

### Passos para Executar Localmente

1. **Navegue até a pasta do projeto:**
   ```bash
   cd "C:\Workspace\Organização de Fotos\photo-manager"
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Abra o navegador:**
   O aplicativo abrirá automaticamente em `http://localhost:3000`

## Como Usar

### 1. Upload de Fotos

- Na tela inicial, arraste e solte fotos na área de upload
- Ou clique em "Selecionar Fotos" para escolher do seu computador
- Formatos suportados: JPG, PNG, GIF, WebP, BMP

### 2. Visualizar Fotos

- As fotos aparecem em grid na página principal
- Clique no ícone de tela cheia para visualizar em tamanho completo
- Use as setas do teclado (← →) para navegar entre fotos
- Pressione ESC para sair da visualização em tela cheia

### 3. Organizar com Álbuns

- Na sidebar esquerda, clique no "+" ao lado de "ÁLBUNS"
- Digite o nome e descrição do álbum
- Selecione fotos (checkbox) e use "Adicionar a Álbum" na barra superior
- Clique em um álbum para filtrar apenas suas fotos

### 4. Adicionar Tags

- Selecione uma ou mais fotos (checkbox)
- Clique em "Adicionar Tags" na barra superior
- Digite tags existentes ou crie novas
- Clique em uma tag na sidebar para filtrar fotos

### 5. Buscar Fotos

- Use a barra de busca no topo para pesquisar por nome ou tags
- Clique no ícone de coração para filtrar apenas favoritos
- Combine filtros de tags, álbuns e busca de texto

### 6. Ações em Lote

- Selecione múltiplas fotos marcando os checkboxes
- Use os botões na barra azul superior:
  - **Adicionar Tags**: Aplicar tags a todas as fotos selecionadas
  - **Adicionar a Álbum**: Adicionar fotos a um ou mais álbuns
  - **Deletar**: Remover fotos permanentemente

### 7. Favoritos

- Clique no ícone de coração em cada foto para marcar como favorito
- Use o filtro de favoritos na barra de busca

### 8. Alterar Tamanho da Grade

- Use os botões de visualização ao lado da busca:
  - Grade pequena: mais fotos por linha
  - Grade média: tamanho padrão
  - Grade grande: fotos maiores
  - Grade extra grande: visualização ampliada

## Atalhos de Teclado

### Visualização em Tela Cheia
- **←** (Seta Esquerda): Foto anterior
- **→** (Seta Direita): Próxima foto
- **F**: Toggle favorito
- **ESC**: Fechar visualização

## Estrutura do Projeto

```
photo-manager/
├── src/
│   ├── components/          # Componentes React
│   │   ├── PhotoUploader.tsx      # Upload de fotos
│   │   ├── PhotoGrid.tsx          # Galeria de fotos
│   │   ├── FullscreenViewer.tsx   # Visualizador tela cheia
│   │   ├── SearchBar.tsx          # Barra de busca
│   │   ├── Sidebar.tsx            # Sidebar com álbuns e tags
│   │   └── BulkActions.tsx        # Ações em lote
│   ├── context/             # Context API
│   │   └── AppContext.tsx         # Estado global da aplicação
│   ├── hooks/               # Custom hooks
│   │   └── useLocalStorage.ts     # Hook para IndexedDB
│   ├── types/               # Definições TypeScript
│   │   └── index.ts               # Tipos da aplicação
│   ├── utils/               # Utilitários
│   │   ├── theme.ts               # Temas Material-UI
│   │   └── helpers.ts             # Funções auxiliares
│   ├── App.tsx              # Componente principal
│   └── main.tsx             # Ponto de entrada
├── package.json             # Dependências
├── tsconfig.json            # Configuração TypeScript
├── vite.config.ts           # Configuração Vite
└── README.md                # Este arquivo
```

## Armazenamento de Dados

- **Tecnologia**: IndexedDB via LocalForage
- **Localização**: Armazenamento local do navegador
- **Persistência**: Os dados permanecem mesmo após fechar o navegador
- **Limite**: Depende do navegador (geralmente 50MB+)
- **Privacidade**: Tudo fica armazenado localmente, nenhum dado enviado para servidores

### Limpar Dados

Para limpar todos os dados armazenados:
1. Abra as ferramentas de desenvolvedor (F12)
2. Console > Digite: `await localforage.clear()`
3. Ou limpe os dados do site nas configurações do navegador

## Build para Produção

```bash
# Gerar build otimizado
npm run build

# Testar build de produção
npm run preview
```

Os arquivos otimizados estarão na pasta `dist/`

## Próximas Funcionalidades (Roadmap)

- [ ] Edição básica de fotos (crop, rotação, filtros)
- [ ] Detecção de duplicatas
- [ ] Exportar álbuns como ZIP
- [ ] Reconhecimento de imagem com IA (TensorFlow.js)
- [ ] Tags automáticas
- [ ] Agrupamento por data
- [ ] Compartilhamento de álbuns
- [ ] Sincronização cloud opcional

## Solução de Problemas

### As fotos não aparecem após upload
- Verifique o console do navegador (F12)
- Certifique-se de que o formato é suportado (JPG, PNG, GIF, WebP, BMP)
- Limpe o cache do navegador

### O armazenamento está cheio
- Verifique o espaço disponível no IndexedDB
- Considere deletar fotos não utilizadas
- Exporte fotos importantes e limpe o armazenamento

### O app está lento
- Reduza o número de fotos carregadas
- Use um tamanho de grade menor
- Feche outras abas do navegador

## Contribuindo

Este é um projeto de demonstração. Sinta-se livre para:
- Reportar bugs
- Sugerir melhorias
- Fazer fork e customizar

## Licença

MIT License - Uso livre para fins pessoais e comerciais.

## Créditos

Desenvolvido com base no PRD (Product Requirements Document) para um sistema avançado de gerenciamento de fotos.

---

**Versão**: 0.1.0 (MVP)
**Data**: 2025
**Status**: Beta - Funcionalidades básicas implementadas
