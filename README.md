# API b2cTur

API feita com NestJS e Prisma para aplicativo de venda de serviços focado em turismo local.

## Instalação

1. Clone o repositório:
    ```bash
    git clone git@github.com:lucsa-dev/api_b2c_tur.git
    cd api-b2c-tur
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o banco de dados no arquivo `.env`:
    ```env
    DATABASE_URL="sua-url-do-banco-de-dados"
    ```

4. Execute as migrações do Prisma:
    ```bash
    npx prisma migrate dev
    ```

## Uso

1. Inicie o servidor:
    ```bash
    npm run start
    ```

2. Acesse a API em `http://localhost:3000`.

## Estrutura do Projeto

- `src/`
  - `dto/`: Contém os Data Transfer Objects.
  - `entities/`: Contém as entidades do banco de dados.
  - `repositories/`: Contém os repositórios para acesso ao banco de dados.
  - `services/`: Contém os serviços da aplicação.
  - `utils/`: Contém funções utilitárias.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feature/nova-feature`).
5. Crie um novo Pull Request.