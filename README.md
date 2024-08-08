## 🚀 Descrição

## 📋 Funcionalidades

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- SQLite3 (para desenvolvimento)
- PostgreSQL (para produção)

## 📦 Como Rodar o Projeto

Siga os passos abaixo para rodar a API localmente

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/vctorgriggi/sistema-compras-api
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd sistema-compras-api
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Realize as migrações do banco de dados:**

    #### Para Desenvolvimento (usando SQLite3)

    ```bash
    npx sequelize db:migrate
    ```

    #### Para Produção (usando PostgreSQL)

    1. Renomeie o arquivo .env.example para .env e preencha os dados do banco de dados.

    2. Caso não tenha criado ainda, crie o banco de dados:

    ```bash
    npx sequelize db:create
    ```

    3. Realize as migrações:

    ```bash
    npx sequelize db:migrate
    ```

5.  **Inicie a API:**

    #### Para Desenvolvimento (usando node --watch)

    ```bash
    npm start:dev
    ```

    #### Para Produção

    ```bash
    npm start
    ```

6.  **Acesse a API.**

    A API estará disponível em `http://localhost:3333`.
