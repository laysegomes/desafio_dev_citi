# Documentacao do desafio PTC 26.1
Layse Gomes (lmfg)

## Objetivo

Foi implementado um CRUD completo para gerenciamento de usuarios e calcados usando Express, Prisma e SQLite. O projeto foi adaptado para usar SQLite em vez de Docker/PostgreSQL para simplificar o ambiente de desenvolvimento local.

## Modelagem

As entidades `User` e `Calcado` ficam em `server/prisma/schema.prisma`.

### User

A entidade `User` possui os campos:

- `id`: identificador unico em formato UUID
- `name`: nome do usuario
- `email`: email unico do usuario
- `cpf`: CPF unico do usuario
- `password`: senha do usuario
- `createdAt`: data de criacao automatica
- `updatedAt`: data de atualizacao automatica

### Calcado

A entidade `Calcado` possui os campos:

- `id`: identificador unico auto-incrementado
- `nome_produto`: nome do calcado
- `cor`: cor do calcado
- `marca`: marca fabricante
- `tamanho`: numero do sapato
- `preco`: valor em inteiros (centavos)
- `quantidade_em_estoque`: quantidade de pares disponiveis

## Controller

### UserController

O arquivo `server/src/controllers/UserController.ts` concentra as operacoes de usuario:

- `createUser`: cria um novo usuario.
- `readAllUsers`: lista todos os usuarios cadastrados.
- `readUserById`: busca um usuario pelo `id`.
- `updateUser`: atualiza um usuario pelo `id`.
- `deleteUser`: remove um usuario pelo `id`.

Validacoes implementadas:
- Email unico (nao permite duplicatas)
- CPF unico (nao permite duplicatas)
- Campos obrigatorios nao podem estar vazios

### CalcadosController

O arquivo `server/src/controllers/CalcadosController.ts` concentra as operacoes de calcados:

- `create`: cria um novo calcado no estoque.
- `readAll`: lista todos os calcados cadastrados.
- `readById`: busca um calcado pelo `id`.
- `update`: atualiza um calcado pelo `id`.
- `delete`: remove um calcado pelo `id`.

Validacoes implementadas:
- Tamanho valido (numero positivo)
- Preco valido (numero positivo)
- Quantidade nao pode ser negativa
- Campos obrigatorios sao necessarios

## Rotas

### Rotas de Usuario

| Metodo | Rota | Funcao |
| --- | --- | --- |
| `POST` | `/users` | Criar usuario |
| `GET` | `/users` | Listar usuarios |
| `GET` | `/users/:id` | Buscar usuario |
| `PUT` | `/users/:id` | Atualizar usuario |
| `DELETE` | `/users/:id` | Excluir usuario |

### Rotas de Calcado

| Metodo | Rota | Funcao |
| --- | --- | --- |
| `POST` | `/calcados` | Criar calcado |
| `GET` | `/calcados` | Listar calcados |
| `GET` | `/calcados/:id` | Buscar calcado |
| `PUT` | `/calcados/:id` | Atualizar calcado |
| `DELETE` | `/calcados/:id` | Excluir calcado |

## Exemplos de body JSON

### Criar Usuario

```json
{
  "name": "Joao Silva",
  "email": "joao@example.com",
  "cpf": "12345678901",
  "password": "senha123"
}
```

### Criar Calcado

```json
{
  "nome_produto": "Tenis Esportivo",
  "cor": "Preto",
  "marca": "Nike",
  "tamanho": 41,
  "preco": 29990,
  "quantidade_em_estoque": 5
}
```

## Como executar

1. Dentro da pasta `server`, crie um arquivo `.env` com as variaveis:

```env
SERVER_PORT=3001
DATABASE_URL="file:./dev.db"
```

2. Instale as dependencias:

```bash
npm install
```

3. Gere o cliente Prisma e crie o banco de dados:

```bash
npx prisma generate
npx prisma db push
```

4. Inicie o servidor:

```bash
npm run dev
```

5. Teste as rotas no Thunder Client ou outra ferramenta de API, enviando o corpo das requisicoes no formato JSON.

## Estrutura de Pastas

```
server/
├── .env                          ← Variaveis de ambiente
├── prisma/
│   ├── dev.db                   ← Banco de dados SQLite
│   └── schema.prisma            ← Definicao dos modelos
├── src/
│   ├── server.ts                ← Entrada da aplicacao
│   ├── routes.ts                ← Definicao das rotas
│   ├── database/
│   │   └── index.ts            ← Conexao com Prisma
│   └── controllers/
│       ├── UserController.ts    ← CRUD de usuarios
│       └── CalcadosController.ts ← CRUD de calcados
└── package.json                 ← Dependencias
```

## Decisoes Tecnicas

### Por que SQLite?

O projeto original usava PostgreSQL com Docker. Como meu computador nao estava funcionando de forma nenhuma instalar o docker, optei por SQLite para conseguir realizar o desafio:

- Banco de dados em arquivo (sem servidor externo)
- Configuracao simples e rapida
- Ideal para desenvolvimento local
- Compativel com Prisma ORM

### Por que separar em Controllers?

Cada controller concentra a logica de um recurso (User ou Calcado), deixando o codigo mais organizado e facil de manter.

### Por que usar try/catch?

Para capturar erros durante as operacoes (email duplicado, registro nao encontrado, etc) e retornar mensagens descritivas.

## Uso de Inteligencia Artificial

Foi usada IA (GitHub Copilot, Claude e Gemini) como assistentes para:
- Auxilio na configuração do doker (que no final não consegui usar)
- Auxilio com a decisão de  mudar para Sqlite
- Sugerir estrutura de projeto e padroes de codigo
- Auxiliar na resolucao de problemas tecnicos (erro de file lock no Windows)
- Revisar e melhorar a organizacao do codigo

As decisoes principais, implementacao e testes foram realizados manualmente por mim. A IA foi utilizada como ferramenta de suporte, nao como autora principal do código.
