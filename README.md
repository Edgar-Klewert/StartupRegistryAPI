# Startup Management Application

Este projeto oferece uma plataforma para gerenciamento de startups, fornecendo uma interface de frontend e uma API robusta no backend. A aplicação suporta o cadastro de startups, listagem e remoção, com integração a um banco de dados MongoDB e suporte a importação de dados via CSV.

## Tecnologias Utilizadas

### Frontend
- **Vite** para um desenvolvimento rápido e moderno.
- **React** para a construção da interface de usuário.
- **Tailwind CSS** para estilização de componentes.
- **PNPM** para gerenciamento eficiente de pacotes.

### Backend
- **Fastify** como framework de servidor, focado em performance e simplicidade.
- **Prisma** como ORM para interagir com MongoDB.
- **MongoDB** como banco de dados principal.
- **csvtojson** e **Streams** do Node.js para leitura e processamento de grandes arquivos CSV.
- **Zod** para validação de dados de entrada.

## Funcionalidades

### Frontend
- **Cadastro de Startups**: Adicionar startups fornecendo o nome e a cidade.
- **Listagem de Startups**: Exibir todas as startups cadastradas, com indicação de status ativo ou inativo.
- **Remoção de Startups**: Deletar startups diretamente pela interface.

### Backend

O backend oferece uma API RESTful que suporta as seguintes operações:
- **Criação de startups** via `POST /customer`
- **Listagem de startups** via `GET /customers`
- **Exclusão de startups** via `DELETE /customer/:id`

O backend também lida com **importação em massa de dados de startups** a partir de arquivos CSV, utilizando a API de streams do Node.js para garantir eficiência e escalabilidade na leitura e gravação dos dados.

### Importação de CSV

A aplicação inclui um processo automatizado de leitura de arquivos CSV, convertendo os dados para o formato JSON e salvando-os no banco de dados MongoDB. Este processo é feito de forma assíncrona e otimizada usando streams nativos do Node.js.

**Detalhes do processo**:
- O arquivo CSV é lido com `createReadStream`.
- O conteúdo é convertido de CSV para JSON usando o pacote `csvtojson`.
- Um **Writable Stream** grava os dados diretamente no MongoDB, utilizando **Prisma** para persistência.

### Manipulação de Erros

O backend usa um **Error Handler** personalizado para retornar respostas claras e consistentes em caso de erros de validação ou operação. Todos os erros são tratados de forma centralizada, garantindo que a API retorne respostas adequadas, como códigos de erro HTTP e mensagens detalhadas.

## Estrutura do Backend

O backend segue uma arquitetura modular, separando a lógica de controle, validação e serviços. Abaixo estão algumas características importantes:

- **Controladores**: Responsáveis por receber as requisições HTTP, validar os dados e delegar a lógica de negócio aos serviços.
- **Serviços**: Classes que encapsulam a lógica de negócio, como criação, exclusão e listagem de startups.
- **Validação com Zod**: A validação dos dados de entrada é feita com o `zod`, garantindo que apenas dados corretos cheguem à camada de serviço.

## Configuração e Execução

### Pré-requisitos

- **Node.js** 18+
- **MongoDB** rodando localmente ou em um servidor remoto.
- **PNPM** para o gerenciamento de pacotes.

### Instalação

1. Clone o repositório:

    ```bash
    https://github.com/Edgar-Klewert/StartupRegistryAPI.git
    cd repositorio
    ```

2. Instale as dependências:

    ```bash
    pnpm install
    ```

3. Configure o arquivo `.env` com a string de conexão ao MongoDB:

    ```bash
    DATABASE_URL="mongodb://localhost:27017/startups-db"
    ```

4. Execute as migrações do Prisma para configurar o banco de dados:

    ```bash
    pnpm prisma generate
    ```
5. Execute o backend com:

    ```bash
    pnpm dev
    ```

### Executando o Frontend

No diretório `frontend`, rode o servidor com o comando:

```bash
pnpm dev
```
O frontend estará acessível em http://localhost:5173.

### Importando dados CSV

Para importar um arquivo CSV de startups, coloque o arquivo chamado `startup-data.csv` na raiz do projeto e execute o script de leitura de CSV que já está configurado no backend. O script irá ler o arquivo e salvar os dados diretamente no banco de dados MongoDB, aproveitando streams para otimizar o processo.

### Deploy

O deploy pode ser feito em qualquer ambiente que suporte **Node.js** e **MongoDB**, como:

- **Heroku**
- **DigitalOcean**
- **AWS**

A estrutura modular do backend e a separação de responsabilidades permitem escalabilidade e fácil manutenção.
