# Shopify Anderson

Um tema Shopify moderno e totalmente customizado, desenvolvido em português com design premium e recursos avançados.

## 🎨 Características

### Design

- ✨ Design moderno e premium com gradientes vibrantes
- 🌓 Modo escuro integrado
- 📱 Totalmente responsivo (mobile-first)
- 🎭 Animações suaves e micro-interações
- 🎨 Glassmorphism e efeitos modernos

### Funcionalidades

- 🛒 Carrinho Ajax (sem recarregar a página)
- 👁️ Visualização rápida de produtos
- 🔍 Busca integrada
- ⭐ Sistema de favoritos
- 📦 Badges de produtos (Novo, Promoção, Esgotado)
- 🖼️ Galeria de imagens com hover effect
- 💳 Ícones de pagamento
- 📧 Newsletter integrada
- 🔗 Links de redes sociais

### Otimizações

- ⚡ Performance otimizada
- 🔍 SEO-friendly
- ♿ Acessibilidade (WCAG)
- 📊 Compatível com Shopify 2.0

## 📁 Estrutura do Tema

```
shopify-theme/
├── assets/
│   ├── theme.css          # Estilos principais
│   ├── theme.js           # JavaScript principal
│   └── product.js         # JS específico de produtos
├── config/
│   ├── settings_schema.json  # Configurações do tema
│   └── settings_data.json    # Valores padrão
├── layout/
│   └── theme.liquid       # Layout principal
├── locales/
│   └── pt-BR.json         # Traduções em português
├── sections/
│   ├── header.liquid      # Cabeçalho
│   ├── footer.liquid      # Rodapé
│   ├── hero.liquid        # Seção hero
│   └── featured-products.liquid  # Produtos em destaque
├── snippets/
│   ├── product-card.liquid    # Card de produto
│   ├── cart-drawer.liquid     # Carrinho lateral
│   └── icon-*.liquid          # Ícones SVG
└── templates/
    ├── index.json         # Página inicial
    ├── product.json       # Página de produto
    ├── collection.json    # Página de coleção
    ├── cart.json          # Página do carrinho
    ├── page.json          # Páginas genéricas
    └── 404.json           # Página de erro
```

## 🚀 Como Instalar

### Opção 1: Upload Manual

1. **Compacte o tema:**

   ```bash
   cd shopify-theme
   zip -r tema-premium.zip .
   ```

2. **Faça upload na Shopify:**
   - Acesse: Admin > Temas Online
   - Clique em "Adicionar tema" > "Fazer upload do arquivo ZIP"
   - Selecione o arquivo `tema-premium.zip`

### Opção 2: Shopify CLI (Recomendado)

1. **Instale o Shopify CLI:**

   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

2. **Autentique-se:**

   ```bash
   shopify login --store=sua-loja.myshopify.com
   ```

3. **Faça upload do tema:**

   ```bash
   cd shopify-theme
   shopify theme push
   ```

4. **Ou desenvolva localmente:**
   ```bash
   shopify theme dev
   ```

## ⚙️ Configuração

### 1. Configurações Básicas

Após instalar o tema, acesse **Personalizar tema** e configure:

#### Cores

- Cor Primária (padrão: #6366f1)
- Cor Secundária (padrão: #8b5cf6)
- Cor de Destaque (padrão: #ec4899)

#### Tipografia

- Fonte dos Títulos
- Fonte do Texto
- Tamanho base da fonte

#### Recursos

- ✅ Ativar Modo Escuro
- ✅ Ativar Carrinho Ajax
- ✅ Ativar Visualização Rápida
- ✅ Ativar Animações

### 2. Configurar Menus

1. **Menu Principal:**
   - Navegação > Menus > Main Menu
   - Adicione links para suas coleções e páginas

2. **Menu do Rodapé:**
   - Crie menus para "Links Rápidos" e "Atendimento"

### 3. Redes Sociais

Em **Configurações do Tema > Redes Sociais**, adicione:

- Instagram
- Facebook
- Twitter/X
- YouTube
- TikTok

### 4. Personalizar a Homepage

No editor de temas, você pode:

- Editar o Hero (título, descrição, botões, imagem de fundo)
- Escolher qual coleção mostrar em "Produtos em Destaque"
- Adicionar mais seções conforme necessário

## 🎨 Personalização Avançada

### Cores Customizadas

Edite `assets/theme.css` e modifique as variáveis CSS:

```css
:root {
  --color-primary: #sua-cor;
  --color-secondary: #sua-cor;
  --color-accent: #sua-cor;
}
```

### Adicionar Novas Seções

1. Crie um arquivo em `sections/sua-secao.liquid`
2. Adicione o schema no final do arquivo
3. Use a seção no editor de temas

### Modificar Animações

Em `assets/theme.css`, ajuste as variáveis de transição:

```css
:root {
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}
```

## 📱 Responsividade

O tema é mobile-first e se adapta automaticamente a:

- 📱 Mobile (< 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🔧 Recursos Técnicos

### JavaScript

O tema usa JavaScript vanilla (sem dependências) para:

- Menu mobile
- Modo escuro
- Carrinho Ajax
- Visualização rápida
- Animações de scroll

### CSS

- CSS moderno com variáveis
- Flexbox e Grid
- Animações CSS
- Dark mode com `data-theme`

### Shopify Liquid

- Shopify 2.0 (sections everywhere)
- Schema settings
- Metafields support
- Internacionalização (i18n)

## 🌐 Tradução

O tema está em português brasileiro. Para adicionar outros idiomas:

1. Copie `locales/pt-BR.json`
2. Renomeie para o código do idioma (ex: `en.json`)
3. Traduza os textos

## 📊 SEO

O tema inclui:

- Meta tags otimizadas
- Structured data
- Canonical URLs
- Alt text para imagens
- Heading hierarchy adequada

## ♿ Acessibilidade

- Navegação por teclado
- ARIA labels
- Skip links
- Contraste adequado
- Suporte a screen readers

## 🐛 Solução de Problemas

### O carrinho Ajax não funciona

- Verifique se a opção está ativada em Configurações do Tema
- Limpe o cache do navegador

### Modo escuro não salva

- Verifique se o localStorage está habilitado no navegador

### Imagens não aparecem

- Certifique-se de que as imagens foram carregadas na Shopify
- Verifique os nomes dos arquivos

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique a documentação da Shopify
2. Revise o código nos arquivos do tema
3. Consulte a comunidade Shopify

## 📝 Licença

Este tema foi desenvolvido como um projeto customizado.

## 🎯 Próximos Passos

1. ✅ Instalar o tema na sua loja
2. ✅ Personalizar cores e fontes
3. ✅ Adicionar seus produtos
4. ✅ Configurar menus e navegação
5. ✅ Testar em diferentes dispositivos
6. ✅ Publicar!

---

**Desenvolvido com ❤️ para Shopify**
