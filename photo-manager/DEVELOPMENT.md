# Guia de Desenvolvimento

## Configuração do Ambiente

### Requisitos
- Node.js 18+
- npm 9+
- Editor de código (VS Code recomendado)

### Extensões VS Code Recomendadas
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets

### Instalação
```bash
cd "C:\Workspace\Organização de Fotos\photo-manager"
npm install
```

## Comandos de Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Verificar problemas com ESLint
npm run lint
```

## Estrutura do Código

### Adicionar um Novo Componente

1. Criar arquivo em `src/components/NomeDoComponente.tsx`
2. Usar template TypeScript + Material-UI:

```typescript
import React from 'react';
import { Box } from '@mui/material';
import { useApp } from '../context/AppContext';

interface NomeDoComponenteProps {
  // props aqui
}

const NomeDoComponente: React.FC<NomeDoComponenteProps> = ({ }) => {
  const { /* context aqui */ } = useApp();

  return (
    <Box>
      {/* JSX aqui */}
    </Box>
  );
};

export default NomeDoComponente;
```

3. Importar no componente pai

### Adicionar Nova Ação ao Context

1. Abrir `src/context/AppContext.tsx`
2. Adicionar função à interface `AppContextType`
3. Implementar função no `AppProvider`
4. Adicionar ao objeto `value`

Exemplo:
```typescript
// Interface
interface AppContextType {
  // ... existentes
  minhaNovaAcao: (param: string) => Promise<void>;
}

// Implementação
const minhaNovaAcao = async (param: string) => {
  // lógica aqui
  await storage.savePhoto(/* ... */);
  setPhotos(/* ... */);
};

// Value
const value: AppContextType = {
  // ... existentes
  minhaNovaAcao,
};
```

### Adicionar Novo Tipo

1. Abrir `src/types/index.ts`
2. Adicionar interface/type:

```typescript
export interface NovoTipo {
  id: string;
  campo1: string;
  campo2?: number; // opcional
}
```

## Debugging

### Console do Navegador
```javascript
// Verificar dados do IndexedDB
await localforage.getItem('key')

// Ver todas as chaves
await localforage.keys()

// Limpar tudo
await localforage.clear()
```

### React DevTools
1. Instalar extensão React DevTools
2. Inspecionar componentes e props
3. Ver Context values

### Redux DevTools (Futuro)
Se migrar para Redux Toolkit:
1. Instalar extensão Redux DevTools
2. Time-travel debugging
3. Ver todas as actions

## Boas Práticas

### TypeScript
- Sempre tipar props de componentes
- Evitar `any` - usar tipos específicos
- Usar interfaces para objetos complexos
- Usar types para unions/primitivos

### React
- Componentes funcionais com hooks
- Memoizar callbacks caros com `useCallback`
- Memoizar valores com `useMemo`
- Evitar state desnecessário
- Props devem ser imutáveis

### Material-UI
- Usar `sx` prop para styling
- Evitar inline styles
- Reutilizar theme values
- Componentes responsivos

### Performance
- Lazy load componentes pesados
- Debounce inputs de busca
- Virtualizar listas grandes
- Otimizar re-renders

## Padrões de Código

### Nomenclatura
- **Componentes**: PascalCase (PhotoGrid.tsx)
- **Funções**: camelCase (formatFileSize)
- **Constantes**: UPPER_SNAKE_CASE (DRAWER_WIDTH)
- **Interfaces**: PascalCase com I opcional (Photo ou IPhoto)
- **Types**: PascalCase (ViewMode)

### Organização de Imports
```typescript
// 1. React
import React, { useState, useEffect } from 'react';

// 2. Bibliotecas externas
import { Box, Button } from '@mui/material';
import { format } from 'date-fns';

// 3. Contextos e hooks internos
import { useApp } from '../context/AppContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

// 4. Componentes internos
import PhotoGrid from '../components/PhotoGrid';

// 5. Tipos
import { Photo, Album } from '../types';

// 6. Utilitários
import { formatFileSize } from '../utils/helpers';
```

### Estrutura de Componente
```typescript
// 1. Imports

// 2. Interfaces/Types
interface Props {
  // ...
}

// 3. Constantes do componente
const DEFAULT_VALUE = 10;

// 4. Componente
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  // 4.1. Hooks do Context
  const { photos, addPhotos } = useApp();

  // 4.2. State local
  const [value, setValue] = useState('');

  // 4.3. Effects
  useEffect(() => {
    // ...
  }, []);

  // 4.4. Handlers
  const handleClick = () => {
    // ...
  };

  // 4.5. Render helpers
  const renderItem = (item: Item) => {
    // ...
  };

  // 4.6. Early returns
  if (!photos) return null;

  // 4.7. JSX
  return (
    <Box>
      {/* ... */}
    </Box>
  );
};

// 5. Export
export default MyComponent;
```

## Solução de Problemas Comuns

### TypeScript errors
```bash
# Limpar cache do TypeScript
rm -rf node_modules/.vite
npm run dev
```

### Hot reload não funciona
```bash
# Reiniciar servidor
# Ctrl+C para parar
npm run dev
```

### IndexedDB corrompido
```javascript
// No console do navegador
await localforage.clear()
// Recarregar página
```

### Performance lenta
1. Verificar número de fotos (> 1000?)
2. Implementar virtualização
3. Otimizar re-renders (React DevTools)
4. Debounce busca

## Git Workflow (Recomendado)

### Branches
```bash
# Feature
git checkout -b feature/nome-da-feature

# Bug fix
git checkout -b fix/nome-do-bug

# Hotfix
git checkout -b hotfix/descricao
```

### Commits
Usar mensagens descritivas:
```bash
git commit -m "feat: adicionar editor de fotos"
git commit -m "fix: corrigir bug na busca"
git commit -m "refactor: melhorar performance do grid"
git commit -m "docs: atualizar README"
```

### Pull Requests
1. Atualizar branch com main
2. Testar localmente
3. Criar PR com descrição clara
4. Aguardar review

## Testes (A Implementar)

### Unit Tests
```typescript
import { describe, it, expect } from 'vitest';
import { formatFileSize } from './helpers';

describe('formatFileSize', () => {
  it('formata bytes corretamente', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1048576)).toBe('1 MB');
  });
});
```

### Component Tests
```typescript
import { render, screen } from '@testing-library/react';
import PhotoGrid from './PhotoGrid';

describe('PhotoGrid', () => {
  it('renderiza fotos', () => {
    render(<PhotoGrid photos={mockPhotos} />);
    expect(screen.getByText('photo1.jpg')).toBeInTheDocument();
  });
});
```

## Performance Monitoring

### Lighthouse
1. Build de produção: `npm run build`
2. Preview: `npm run preview`
3. Abrir Chrome DevTools > Lighthouse
4. Rodar audit

### Métricas a Monitorar
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.8s
- Cumulative Layout Shift (CLS) < 0.1

## Recursos Úteis

### Documentação
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Material-UI](https://mui.com/material-ui/getting-started/)
- [Vite Guide](https://vitejs.dev/guide/)

### Ferramentas
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Can I Use](https://caniuse.com/) - Browser compatibility

### Comunidade
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)
- [React Discord](https://discord.gg/reactiflux)
- [TypeScript Discord](https://discord.gg/typescript)

## Próximos Passos

1. Implementar testes automatizados
2. Adicionar CI/CD pipeline
3. Configurar code coverage
4. Implementar storybook para componentes
5. Adicionar performance monitoring
6. Implementar error boundary
7. Adicionar analytics (opcional)

## Dúvidas?

Consulte a documentação completa em:
- [README.md](./README.md) - Visão geral
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura
- [QUICKSTART.md](./QUICKSTART.md) - Início rápido
