# 🚀 INÍCIO RÁPIDO - Photo Manager

## ⚡ Execute em 2 Minutos

### 1️⃣ Abra o Terminal
```bash
cd "C:\Workspace\Organização de Fotos\photo-manager"
```

### 2️⃣ Instale as Dependências
```bash
npm install
```
*Aguarde 1-2 minutos enquanto as dependências são baixadas*

### 3️⃣ Execute o Aplicativo
```bash
npm run dev
```

### 4️⃣ Abra no Navegador
O aplicativo abrirá automaticamente em: **http://localhost:3000**

Se não abrir automaticamente, abra manualmente esse endereço.

---

## ✅ Pronto! Agora você pode:

### 📸 Fazer Upload de Fotos
1. Arraste fotos da sua pasta para a área de upload
2. Ou clique em "Selecionar Fotos"

### 📁 Criar Álbuns
1. Clique no `+` ao lado de "ÁLBUNS" na sidebar
2. Digite o nome do álbum
3. Selecione fotos e adicione ao álbum

### 🏷️ Adicionar Tags
1. Selecione fotos (checkbox)
2. Clique em "Adicionar Tags"
3. Digite as tags

### 🔍 Buscar
1. Use a barra de busca no topo
2. Ou clique em tags/álbuns na sidebar

### 👀 Visualizar
1. Clique no ícone de tela cheia em qualquer foto
2. Use ← → para navegar
3. Pressione ESC para sair

---

## 🎯 Primeira Experiência Sugerida

### Teste Completo em 5 Passos:

1. **Upload** - Faça upload de 5-10 fotos de teste
2. **Álbum** - Crie um álbum "Teste"
3. **Tags** - Adicione tags "exemplo", "teste"
4. **Busca** - Busque por "teste"
5. **Visualização** - Abra em tela cheia

---

## 📚 Documentação Completa

Depois de testar, explore a documentação:

- 📖 [README.md](photo-manager/README.md) - Documentação completa
- 🏗️ [ARCHITECTURE.md](photo-manager/ARCHITECTURE.md) - Arquitetura técnica
- 🎨 [INTERFACE_GUIDE.md](photo-manager/INTERFACE_GUIDE.md) - Guia visual
- 🔧 [DEVELOPMENT.md](photo-manager/DEVELOPMENT.md) - Guia de desenvolvimento
- ⚠️ [KNOWN_ISSUES.md](photo-manager/KNOWN_ISSUES.md) - Problemas conhecidos
- 📋 [PROJECT_SUMMARY.md](photo-manager/PROJECT_SUMMARY.md) - Resumo do projeto

---

## ⚠️ IMPORTANTE: Leia Isto!

### Limitação Atual (MVP)
**As fotos desaparecem ao recarregar a página (F5)**

**Por quê?**
Esta é uma limitação conhecida da versão MVP. As imagens precisam ser convertidas para Blob antes de serem salvas no IndexedDB.

**O que persiste:**
- ✅ Álbuns
- ✅ Tags
- ✅ Metadados
- ❌ Imagens (temporariamente)

**Solução temporária:**
Não recarregue a página durante o uso. Use o aplicativo em uma única sessão.

**Solução permanente:**
Será implementada na versão 0.2.0 (veja [KNOWN_ISSUES.md](photo-manager/KNOWN_ISSUES.md))

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview

# Lint (verificar código)
npm run lint
```

---

## ❓ Problemas?

### Porta 3000 já em uso
Altere a porta em `vite.config.ts`:
```typescript
server: {
  port: 3001,
  open: true
}
```

### Erro ao instalar
```bash
npm cache clean --force
npm install
```

### Navegador não abre
Abra manualmente: http://localhost:3000

---

## 🎉 Aproveite!

Você agora tem um gerenciador de fotos completo funcionando localmente!

Para mais informações, consulte a [documentação completa](photo-manager/README.md).

---

**Versão:** 0.1.0 (MVP)
**Status:** ✅ Funcional
**Última atualização:** Dezembro 2024
