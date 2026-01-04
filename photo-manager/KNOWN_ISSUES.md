# Problemas Conhecidos e Limitações

## Issues Conhecidos

### 1. ⚠️ CRÍTICO: Imagens Não Persistem Após Reload

**Problema:**
As fotos desaparecem quando a página é recarregada.

**Causa:**
O tipo `Photo` armazena um objeto `File` e uma `url` (Object URL), mas:
- `File` objects não podem ser serializados para IndexedDB corretamente
- Object URLs (`blob:...`) são temporários e expiram quando a página recarrega

**Impacto:**
- Metadados (nome, tags, álbuns) persistem ✓
- Imagens em si desaparecem após refresh ✗

**Solução Temporária:**
Não recarregar a página durante o uso.

**Solução Permanente (A Implementar):**

Modificar o tipo `Photo` para armazenar a imagem como Blob:

```typescript
// types/index.ts
export interface Photo {
  id: string;
  blob: Blob;              // Mudar de File para Blob
  url?: string;            // Object URL (gerado em tempo de execução)
  name: string;
  size: number;
  type: string;
  dateAdded: Date;
  // ... resto dos campos
}
```

Modificar o processo de upload:

```typescript
// context/AppContext.tsx
const addPhotos = async (files: File[]) => {
  for (const file of files) {
    const blob = new Blob([file], { type: file.type });
    const photo: Photo = {
      id: generateId(),
      blob: blob,
      url: undefined, // Será gerado ao carregar
      name: file.name,
      // ...
    };
    await storage.savePhoto(photo);
  }

  // Ao carregar do storage, gerar Object URLs
  const loadedPhotos = await storage.getAllPhotos();
  const photosWithUrls = loadedPhotos.map(p => ({
    ...p,
    url: URL.createObjectURL(p.blob)
  }));
  setPhotos(photosWithUrls);
};
```

**Prioridade:** Alta
**Esforço:** Médio (2-3 horas)
**Status:** Documentado, não implementado

---

### 2. 📦 Limite de Armazenamento do Navegador

**Problema:**
IndexedDB tem limite de armazenamento (varia por navegador, ~50MB-100MB+)

**Impacto:**
- Usuários com muitas fotos podem exceder limite
- Comportamento varia entre navegadores

**Soluções:**
1. Implementar compressão de imagens antes de salvar
2. Redimensionar fotos grandes automaticamente
3. Implementar sistema de quota warning
4. Adicionar opção de cloud storage (Fase 2)

**Prioridade:** Média
**Status:** Limitação conhecida

---

### 3. 🚫 Sem Sincronização Entre Dispositivos

**Problema:**
Dados ficam apenas no navegador local

**Impacto:**
- Não pode acessar de outro dispositivo
- Dados podem ser perdidos se limpar cache

**Solução:**
Implementar sincronização cloud (Fase 2 do roadmap)

**Prioridade:** Baixa (feature futura)
**Status:** Planejado

---

### 4. 📱 Experiência Mobile Limitada

**Problema:**
Interface otimizada para desktop

**Impacto:**
- Alguns componentes podem ser pequenos em mobile
- Drag-and-drop pode não funcionar bem em touch

**Soluções:**
1. Adicionar botão de upload dedicado para mobile
2. Melhorar touch targets
3. Otimizar layout para telas pequenas

**Prioridade:** Média
**Status:** Melhoria futura

---

### 5. ⚡ Performance com Muitas Fotos

**Problema:**
Grid pode ficar lento com 500+ fotos

**Impacto:**
- Scrolling pode ter lag
- Uso alto de memória

**Soluções:**
1. Implementar virtual scrolling (react-window)
2. Lazy loading de imagens
3. Paginação
4. Otimizar re-renders

**Prioridade:** Baixa (afeta apenas heavy users)
**Status:** Otimização futura

---

## Limitações por Design (MVP)

### Não Implementado Intencionalmente

#### 1. Editor de Fotos
- **Status:** Não implementado
- **Razão:** Foco no MVP de organização
- **Roadmap:** Fase 4

#### 2. IA/Tags Automáticas
- **Status:** Não implementado
- **Razão:** Requer TensorFlow.js (aumenta bundle)
- **Roadmap:** Fase 3

#### 3. Exportação de Álbuns
- **Status:** Não implementado
- **Razão:** Feature secundária
- **Roadmap:** Fase 5

#### 4. Compartilhamento
- **Status:** Não implementado
- **Razão:** Requer backend
- **Roadmap:** Fase 5

#### 5. Detecção de Duplicatas
- **Status:** Não implementado
- **Razão:** Algoritmo complexo
- **Roadmap:** Fase 3

---

## Workarounds Temporários

### Para Persistência de Imagens

**Opção 1: Não Recarregar a Página**
```
Durante o uso, evite dar F5 ou recarregar a página.
Use o aplicativo em uma única sessão.
```

**Opção 2: Re-upload Após Reload**
```
1. Mantenha backup local das fotos originais
2. Após reload, faça upload novamente
3. Metadados (tags, álbuns) serão preservados
```

**Opção 3: Usar PWA (Futuro)**
```
Service Worker pode cachear imagens
Implementação futura
```

### Para Muitas Fotos

**Organizar em Álbuns**
```
1. Crie álbuns temáticos
2. Filtre por álbum para ver menos fotos
3. Melhora performance e organização
```

**Deletar Fotos Não Usadas**
```
Remova duplicatas e fotos ruins regularmente
```

---

## Como Reportar Novos Issues

### Informações Necessárias

1. **Browser:** Chrome 120, Firefox 121, etc.
2. **OS:** Windows 11, macOS 14, etc.
3. **Número de fotos:** Quantidade na biblioteca
4. **Passos para reproduzir:**
   - Passo 1
   - Passo 2
   - Resultado esperado
   - Resultado atual

### Onde Reportar

1. Criar issue no repositório (se houver)
2. Documentar no arquivo KNOWN_ISSUES.md
3. Adicionar tag de prioridade

---

## Roadmap de Correções

### Versão 0.2.0 (Próxima)
- [ ] Corrigir persistência de imagens (Blob storage)
- [ ] Melhorar experiência mobile
- [ ] Adicionar compressão de imagens

### Versão 0.3.0
- [ ] Virtual scrolling para performance
- [ ] Sistema de quota warning
- [ ] PWA básico

### Versão 1.0.0
- [ ] Sincronização cloud opcional
- [ ] Todas issues críticas resolvidas
- [ ] Testes automatizados

---

## Testes de Compatibilidade

### Testado e Funcionando

| Browser | Versão | Status | Notas |
|---------|--------|--------|-------|
| Chrome | 120+ | ✅ OK | Recomendado |
| Firefox | 121+ | ✅ OK | Funciona bem |
| Safari | 17+ | ⚠️ Parcial | IndexedDB pode ter quirks |
| Edge | 120+ | ✅ OK | Baseado em Chromium |

### Não Testado

| Browser | Status | Notas |
|---------|--------|-------|
| Opera | ❓ | Deve funcionar (Chromium) |
| Brave | ❓ | Deve funcionar (Chromium) |
| Mobile Safari | ❓ | Pode ter limitações |
| Chrome Mobile | ❓ | Não testado |

---

## Contribuindo com Correções

Para contribuir com correções de bugs:

1. Escolha um issue desta lista
2. Crie uma branch: `fix/nome-do-bug`
3. Implemente a correção
4. Adicione testes (se possível)
5. Atualize este documento
6. Crie pull request

---

**Última atualização:** Dezembro 2024
**Versão do App:** 0.1.0 (MVP)
**Mantenedores:** Time de desenvolvimento
