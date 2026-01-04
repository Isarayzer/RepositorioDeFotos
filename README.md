# 📸 Photo Manager - Projeto Completo

Aplicativo web moderno de gerenciamento de fotos com organização inteligente, busca avançada e armazenamento local.

## 📁 Estrutura do Projeto

```
Organização de Fotos/
├── PRD.md                    # Product Requirements Document (planejamento completo)
├── INICIO_RAPIDO.md          # 🚀 COMECE AQUI - Guia de início rápido
├── README.md                 # Este arquivo
│
└── photo-manager/            # Aplicativo principal
    ├── src/                  # Código-fonte React + TypeScript
    ├── public/               # Arquivos públicos
    ├── node_modules/         # Dependências (gerado após npm install)
    │
    ├── package.json          # Configuração do projeto
    ├── vite.config.ts        # Configuração do Vite
    ├── tsconfig.json         # Configuração TypeScript
    │
    └── Documentação/
        ├── README.md         # Documentação completa do app
        ├── QUICKSTART.md     # Início rápido
        ├── ARCHITECTURE.md   # Arquitetura técnica
        ├── DEVELOPMENT.md    # Guia de desenvolvimento
        ├── INTERFACE_GUIDE.md # Guia visual da interface
        ├── KNOWN_ISSUES.md   # Problemas conhecidos
        ├── PROJECT_SUMMARY.md # Resumo do projeto
        ├── CHECKLIST.md      # Checklist de verificação
        ├── CHANGELOG.md      # Histórico de versões
        └── INDEX.md          # Índice de documentação
```

## 🚀 Início Rápido

### Execute em 3 Passos:

1. **Abra o terminal** na pasta do projeto:
   ```bash
   cd "C:\Workspace\Organização de Fotos\photo-manager"
   ```

2. **Instale as dependências** (apenas primeira vez):
   ```bash
   npm install
   ```

3. **Execute o aplicativo**:
   ```bash
   npm run dev
   ```

O aplicativo abrirá automaticamente em: **http://localhost:3000**

## 📖 Documentação

- 🚀 **[INICIO_RAPIDO.md](./INICIO_RAPIDO.md)** - Comece aqui!
- 📋 **[PRD.md](./PRD.md)** - Planejamento e requisitos completos
- 📚 **[photo-manager/INDEX.md](./photo-manager/INDEX.md)** - Índice de toda documentação

## 🎯 Principais Funcionalidades

- ✅ Upload drag-and-drop de fotos
- ✅ Galeria responsiva com 4 tamanhos
- ✅ Visualizador em tela cheia
- ✅ Sistema de álbuns
- ✅ Sistema de tags
- ✅ Busca e filtros avançados
- ✅ Favoritos
- ✅ Tema claro/escuro
- ✅ 100% armazenamento local (sem backend)

## 🛠️ Tecnologias

- **React 18** + TypeScript
- **Material-UI** (componentes)
- **Vite** (build tool)
- **IndexedDB** (armazenamento local)
- **LocalForage** (wrapper IndexedDB)
- **React Dropzone** (upload)

## ⚠️ Importante

**Limitação conhecida:** As imagens não persistem após recarregar a página (F5).
- **O que persiste:** Álbuns, tags, metadados ✅
- **O que não persiste:** Imagens ❌
- **Solução temporária:** Não recarregue a página durante o uso
- **Correção:** Planejada para v0.2.0

Veja detalhes em: [photo-manager/KNOWN_ISSUES.md](./photo-manager/KNOWN_ISSUES.md)

## 📊 Status do Projeto

- **Versão:** 0.1.0 (MVP)
- **Status:** ✅ Funcional
- **Ambiente:** Desenvolvimento
- **Próxima versão:** 0.2.0 (correção de persistência)

## 🤝 Contribuindo

1. Leia [photo-manager/DEVELOPMENT.md](./photo-manager/DEVELOPMENT.md)
2. Siga os padrões de código estabelecidos
3. Teste suas alterações
4. Atualize a documentação

## 📄 Licença

MIT License - Uso livre para fins pessoais e comerciais.

---

**Desenvolvido com base no PRD completo**
**Última atualização:** Dezembro 2024
