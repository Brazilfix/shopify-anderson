#!/bin/bash

# Script de Instalação do Tema Shopify Premium
# Este script ajuda a preparar o tema para upload

echo "🎨 Tema Shopify Premium - Preparação para Upload"
echo "================================================"
echo ""

# Verificar se estamos na pasta correta
if [ ! -d "config" ] || [ ! -d "layout" ] || [ ! -d "sections" ]; then
    echo "❌ Erro: Execute este script dentro da pasta shopify-theme"
    exit 1
fi

echo "✅ Pasta do tema encontrada"
echo ""

# Criar arquivo ZIP
echo "📦 Criando arquivo ZIP do tema..."
zip -r ../tema-shopify-premium.zip . -x "*.DS_Store" -x "__MACOSX/*" -x "*.sh"

if [ $? -eq 0 ]; then
    echo "✅ Arquivo criado com sucesso: tema-shopify-premium.zip"
    echo ""
    echo "📋 Próximos passos:"
    echo ""
    echo "1. Acesse sua loja Shopify"
    echo "2. Vá em: Loja Online > Temas"
    echo "3. Clique em 'Adicionar tema'"
    echo "4. Selecione 'Fazer upload do arquivo ZIP'"
    echo "5. Escolha o arquivo: tema-shopify-premium.zip"
    echo "6. Aguarde o upload e clique em 'Personalizar'"
    echo ""
    echo "🎉 Pronto! Seu tema estará instalado!"
    echo ""
else
    echo "❌ Erro ao criar o arquivo ZIP"
    exit 1
fi

# Mostrar informações do arquivo
if [ -f "../tema-shopify-premium.zip" ]; then
    SIZE=$(du -h "../tema-shopify-premium.zip" | cut -f1)
    echo "📊 Tamanho do arquivo: $SIZE"
    echo "📍 Localização: $(pwd)/../tema-shopify-premium.zip"
fi

echo ""
echo "💡 Dica: Leia o README.md para instruções detalhadas de configuração"
echo ""
