# ✅ Checklist de Verificação - Photo Manager

## 📋 Checklist de Instalação

Execute este checklist para garantir que tudo está funcionando corretamente.

### 1. Pré-requisitos
- [ ] Node.js 18+ instalado (`node --version`)
- [ ] npm 9+ instalado (`npm --version`)
- [ ] Editor de código disponível (VS Code recomendado)

### 2. Instalação
- [ ] Navegou até a pasta do projeto
- [ ] Executou `npm install` sem erros
- [ ] Todas as dependências foram instaladas

### 3. Execução
- [ ] Executou `npm run dev` sem erros
- [ ] Servidor iniciou na porta 3000 (ou outra configurada)
- [ ] Navegador abriu automaticamente
- [ ] Aplicativo está visível no navegador

---

## 🎯 Checklist de Funcionalidades

### Upload e Visualização
- [ ] Área de upload aparece na tela inicial
- [ ] Consegue arrastar e soltar fotos
- [ ] Consegue clicar em "Selecionar Fotos"
- [ ] Upload é processado com sucesso
- [ ] Fotos aparecem na galeria
- [ ] Grid de fotos está responsivo
- [ ] Thumbnails carregam corretamente

### Visualização em Tela Cheia
- [ ] Ícone de tela cheia aparece em cada foto
- [ ] Clique abre o modal fullscreen
- [ ] Imagem é exibida em tamanho completo
- [ ] Botões de navegação (← →) funcionam
- [ ] Setas do teclado navegam entre fotos
- [ ] ESC fecha o visualizador
- [ ] Informações da foto aparecem no rodapé

### Sidebar
- [ ] Sidebar aparece no lado esquerdo
- [ ] "Todas as Fotos" mostra contador correto
- [ ] Seção ÁLBUNS está visível
- [ ] Botão + para criar álbum funciona
- [ ] Seção TAGS está visível
- [ ] Tags aparecem com contador

### Álbuns
- [ ] Consegue criar novo álbum
- [ ] Nome do álbum é obrigatório
- [ ] Descrição é opcional
- [ ] Álbum aparece na sidebar após criação
- [ ] Consegue selecionar fotos
- [ ] Consegue adicionar fotos ao álbum
- [ ] Contador de fotos do álbum atualiza
- [ ] Clicar no álbum filtra fotos
- [ ] Consegue deletar álbum

### Tags
- [ ] Consegue selecionar fotos
- [ ] Botão "Adicionar Tags" aparece quando há seleção
- [ ] Dialog de tags abre corretamente
- [ ] Consegue digitar novas tags
- [ ] Consegue selecionar tags existentes
- [ ] Tags são aplicadas às fotos
- [ ] Tags aparecem na sidebar
- [ ] Contador de tags está correto
- [ ] Clicar em tag filtra fotos
- [ ] Consegue deletar tag globalmente

### Busca e Filtros
- [ ] Barra de busca está visível
- [ ] Busca em tempo real funciona
- [ ] Encontra fotos por nome
- [ ] Encontra fotos por tags
- [ ] Botão limpar (✕) funciona
- [ ] Filtro de favoritos funciona
- [ ] Chips de filtros ativos aparecem
- [ ] Consegue remover filtros clicando no ✕
- [ ] Filtros combinados funcionam

### Favoritos
- [ ] Ícone de coração aparece em cada foto
- [ ] Consegue marcar foto como favorita
- [ ] Ícone fica vermelho quando favoritado
- [ ] Consegue desfavoritar
- [ ] Filtro de favoritos funciona na busca
- [ ] Favorito funciona no visualizador fullscreen
- [ ] Atalho F funciona no fullscreen

### Seleção Múltipla
- [ ] Checkboxes aparecem nas fotos
- [ ] Consegue selecionar múltiplas fotos
- [ ] Barra de ações em lote aparece
- [ ] Contador de selecionadas está correto
- [ ] Botões de ação estão disponíveis
- [ ] Consegue limpar seleção

### Ações em Lote
- [ ] "Adicionar Tags" abre dialog
- [ ] Consegue adicionar tags a múltiplas fotos
- [ ] "Adicionar a Álbum" abre dialog
- [ ] Lista de álbuns aparece
- [ ] Consegue adicionar a múltiplos álbuns
- [ ] "Deletar" pede confirmação
- [ ] Consegue deletar múltiplas fotos

### View Modes (Tamanhos de Grade)
- [ ] Botões de tamanho aparecem
- [ ] Grade pequena funciona
- [ ] Grade média funciona (padrão)
- [ ] Grade grande funciona
- [ ] Grade extra grande funciona
- [ ] Transições são suaves

### Tema
- [ ] Botão de tema aparece no AppBar
- [ ] Consegue alternar para modo escuro
- [ ] Consegue voltar para modo claro
- [ ] Cores mudam corretamente
- [ ] Todos os componentes se adaptam

### Performance
- [ ] Interface é responsiva (não trava)
- [ ] Upload processa sem travar
- [ ] Navegação é fluida
- [ ] Sem lags visíveis no grid
- [ ] Transições são suaves

---

## 🔧 Checklist Técnico

### Código
- [ ] Sem erros no console do navegador (F12)
- [ ] Sem warnings críticos no terminal
- [ ] TypeScript compila sem erros
- [ ] ESLint não reporta erros críticos

### Storage
- [ ] IndexedDB está sendo usado
- [ ] Dados persistem na sessão
- [ ] Consegue ver dados no DevTools → Application → IndexedDB
- [ ] Três stores existem: photos, albums, tags

### Responsividade
- [ ] Funciona em desktop (1920px+)
- [ ] Funciona em tablet (768px-1919px)
- [ ] Funciona em mobile (320px-767px)
- [ ] Sidebar adapta em telas menores

---

## ⚠️ Problemas Conhecidos (OK se falhar)

### Esperado Não Funcionar (MVP)
- [ ] ❌ Fotos persistem após reload (F5) - **KNOWN ISSUE**
  - Metadados persistem ✓
  - Imagens desaparecem ✗
- [ ] ❌ Edição de fotos - Não implementado
- [ ] ❌ Tags automáticas com IA - Não implementado
- [ ] ❌ Exportação de álbuns - Não implementado
- [ ] ❌ Sincronização cloud - Não implementado

---

## 📊 Resultado do Checklist

### Pontuação

Conte quantos itens você marcou:

- **Instalação:** ___ / 9 itens
- **Funcionalidades:** ___ / 82 itens
- **Técnico:** ___ / 8 itens

**Total:** ___ / 99 itens

### Classificação

- **90-99 itens (91-100%):** ✅ Excelente! Tudo funcionando perfeitamente
- **80-89 itens (81-90%):** ✅ Muito Bom! Pequenos ajustes necessários
- **70-79 itens (71-80%):** ⚠️ Bom, mas precisa de atenção
- **60-69 itens (61-70%):** ⚠️ Funcional, mas com problemas
- **< 60 itens (<60%):** ❌ Revisar instalação e documentação

---

## 🐛 Encontrou Problemas?

### Se itens essenciais falharam:

1. **Verifique o console do navegador (F12)**
   - Procure por erros em vermelho
   - Anote a mensagem de erro

2. **Verifique o terminal**
   - Veja se há erros no npm run dev
   - Verifique se todas dependências instalaram

3. **Consulte a documentação:**
   - [KNOWN_ISSUES.md](./KNOWN_ISSUES.md) - Problemas conhecidos
   - [README.md](./README.md) → Solução de Problemas
   - [DEVELOPMENT.md](./DEVELOPMENT.md) → Debugging

4. **Tente soluções comuns:**
   ```bash
   # Limpar cache e reinstalar
   rm -rf node_modules
   npm cache clean --force
   npm install

   # Reiniciar servidor
   npm run dev
   ```

---

## 📝 Notas de Teste

### Anote aqui problemas encontrados:

```
Data: _______________
Browser: _____________
OS: __________________

Problema 1:
_______________________________________________
_______________________________________________

Problema 2:
_______________________________________________
_______________________________________________

Problema 3:
_______________________________________________
_______________________________________________
```

---

## ✅ Conclusão

Após completar este checklist, você terá:

- ✅ Verificado que a instalação está correta
- ✅ Testado todas as funcionalidades principais
- ✅ Identificado possíveis problemas
- ✅ Confirmado que o MVP está funcional

**Próximo passo:** Começar a usar o aplicativo! 🎉

Consulte [INICIO_RAPIDO.md](../INICIO_RAPIDO.md) para começar.

---

**Versão do Checklist:** 1.0
**Versão do App:** 0.1.0 (MVP)
**Data:** Dezembro 2024
