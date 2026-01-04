# Guia Rápido - Photo Manager

## Começar em 3 Passos

### 1. Instalar Dependências
```bash
cd "C:\Workspace\Organização de Fotos\photo-manager"
npm install
```

### 2. Executar o Aplicativo
```bash
npm run dev
```

### 3. Abrir no Navegador
O aplicativo abrirá automaticamente em: `http://localhost:3000`

## Primeiros Passos

### Upload de Fotos
1. Arraste e solte fotos na área indicada
2. Ou clique em "Selecionar Fotos"

### Criar Álbum
1. Clique no "+" ao lado de "ÁLBUNS" na sidebar
2. Digite o nome do álbum
3. Selecione fotos e clique em "Adicionar a Álbum"

### Adicionar Tags
1. Selecione uma ou mais fotos (checkbox)
2. Clique em "Adicionar Tags" no topo
3. Digite as tags desejadas

### Visualizar em Tela Cheia
1. Clique no ícone de tela cheia em qualquer foto
2. Use ← → para navegar
3. Pressione ESC para sair

## Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## Problemas Comuns

### Porta 3000 já está em uso
Altere a porta no arquivo `vite.config.ts`:
```typescript
server: {
  port: 3001, // altere para outra porta
  open: true
}
```

### Erro ao instalar dependências
Tente limpar o cache do npm:
```bash
npm cache clean --force
npm install
```

## Recursos

- Todas as fotos são armazenadas localmente no navegador
- Não há necessidade de servidor backend
- Os dados persistem mesmo após fechar o navegador
- Funciona 100% offline

## Próximos Passos

Consulte o [README.md](./README.md) para documentação completa.
