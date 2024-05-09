# TODO
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

- [ ] Paginação
  - ative e desative os botoes quando nao á mais paginas
  - Deve ser refletido na URL

### Desafio
- [X] Utilizar o hook `UseDebounce` para atrasar a execução de busca textual
