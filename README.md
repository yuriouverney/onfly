Aqui está um exemplo completo de `README.md` para o seu projeto GitHub, combinando todas as seções em um único arquivo de forma clara e concisa:

```markdown
# Onfly Test Application

Este repositório contém a aplicação desenvolvida como parte de um teste profissional para a empresa Onfly. O projeto consiste em uma aplicação backend que gerencia despesas.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em seu sistema:
- Node.js v20
- MySQL v8

## Configuração de Ambiente

As configurações do banco de dados e outras variáveis de ambiente devem ser definidas em seu arquivo `.env`. Exemplo de configuração:

```
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

## Contribuição

Sinta-se livre para clonar, modificar e usar este repositório. Qualquer contribuição para melhorar o código ou a funcionalidade é bem-vinda.

## Suporte

Se você encontrar qualquer problema ao configurar ou executar este projeto, por favor, abra uma issue neste repositório GitHub.
```

### Explicações Adicionais

1. **Documentação Clara**: Este README fornece instruções detalhadas sobre como configurar e operar o ambiente de desenvolvimento e teste, garantindo que novos colaboradores possam começar rapidamente.

2. **Script de Execução**: As instruções são claras sobre onde navegar e quais comandos executar para preparar e iniciar a aplicação.

3. **Detalhes de Contribuição e Suporte**: Estimula a colaboração e oferece um caminho claro para reportar problemas, melhorando a colaboração comunitária.

Este arquivo README ajuda a garantir que os desenvolvedores possam configurar e contribuir para o projeto sem confusão, melhorando a colaboração e a manutenção do código.