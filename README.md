# Onfly Test Application

Este repositório contém a aplicação desenvolvida como parte de um teste profissional para a empresa Onfly. O projeto consiste em uma aplicação backend que gerencia despesas.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em seu sistema:
- Node.js v20
- MySQL v8

## Configuração de Ambiente

As configurações do banco de dados e outras variáveis de ambiente devem ser definidas em seu arquivo `.env`. Exemplo de configuração:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=onfly_dev
```

## Configuração do Ambiente de Desenvolvimento

Para configurar e rodar o ambiente de desenvolvimento, siga os passos abaixo:

```bash
cd backend             # Navegue até o diretório do backend
npm install            # Instala as dependências do projeto
npm run db:migrate:dev # Executa as migrações do banco de dados para desenvolvimento
npm run db:seed:dev    # Popula o banco de dados com dados iniciais para desenvolvimento
npm start              # Inicia o servidor de desenvolvimento
```

## Executando os Testes

Para executar os testes automatizados, você deve seguir os seguintes passos:

```bash
cd backend             # Navegue até o diretório do backend, se ainda não estiver nele
npm install            # Garanta que todas as dependências estão instaladas
npm run db:migrate:test # Executa as migrações do banco de dados para teste
npm run db:seed:test   # Popula o banco de dados de teste com dados iniciais
npm test               # Executa os testes
```

## Documentação

Para verificar a documentação da API basta acessar a página do swagger

```bash
cd backend             # Navegue até o diretório do backend, se ainda não estiver nele
npm install            # Garanta que todas as dependências estão instaladas
npm run db:migrate:dev # Executa as migrações do banco de dados para desenvolvimento
npm run db:seed:dev    # Popula o banco de dados com dados iniciais para desenvolvimento
npm start               # Inicia o servidor de desenvolvimento
http://localhost:3200/api-docs # Acessa a pagina do swagger
```