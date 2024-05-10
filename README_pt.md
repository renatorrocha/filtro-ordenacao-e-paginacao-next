
# Busca, filtro, ordenação e paginação com Next.js

Neste Mini Projeto, implementei uma API que retorna uma listagem de pedidos. Por mais simples que pareça, essa é uma API poderosa: ela nos permite passar, como _query parameters_, busca textual, filtro, ordenação e paginação. E o melhor de tudo: **todas essas informações ficarão na URL** para fácil compartilhamento!

Tudo isso no front usando Next.js e Server Components!

## ScreenShot

![App Screenshot](public/screenshot.png)

## Tecnologias
  - Next14
  - Tailwind
  - shadcn/ui
  - Typescript


## A API

API que foi utilizada foi desenvolvida pela equipe Codante.

documentação da API está em <a target="_blank" href="https://apis-docs.codante.io/orders-api">https://apis-docs.codante.io/orders-api</a>.

## Rode Localmente
Clone the project

```bash
  git clone https://github.com/renatorrocha/filtro-ordenacao-e-paginacao-next
```

Go to the project directory

```bash
  cd filtro-ordenacao-e-paginacao-next
```

Install dependencies

```bash
  pnpm install
```

Run project

```bash
  pnpm run dev
```

## Features e desafio
- [X] Conectar dados da API
  - Popular a tabela com os dados
  - utilizar os campos de:
    - Nome do Cliente
    - Email do Cliente
    - Status
    - Data do Pedido
    - Valor do Pedido

- [X] Busca Textual
  - pelo Nome do Cliente 
  - Deve ser server-side (pela API)
  - Deve ser refletida na URL

- [X] Filtro de Status
  - Pelo botão de filtro (pending, completed)
  - Server-side
  - Deve ser refletido na URL

- [X] Ordenação de Campos
  - ordenação para os campos de *Data do pedido* e *Valor*
  - Deve ser acionada com um clique no nome da coluna
  - Trocar o ícone para corresponder a ordenação
  - Deve ser refletido na URL

- [X] Paginação
  - ative e desative os botoes quando não á mais paginas
  - Deve ser refletido na URL

### Desafio
  - [X] Utilizar o hook `UseDebounce` para atrasar a execução de busca textual
