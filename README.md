# Makiia Backend

API do sistema Makiia — back-end desenvolvido em Python com FastAPI.

## Sobre o projeto

Back-end responsável por fornecer a API do sistema Makiia, seguindo uma
arquitetura modular e preparada para integração futura com banco de dados
e front-end.

## Stack

- Python 3.13
- FastAPI
- Uvicorn (servidor ASGI)
- Pydantic Settings (configuração via variáveis de ambiente)
- Pytest (testes)

## Estrutura do projeto

- app/               # código-fonte da aplicação
    - database/      # conexão e sessões do banco de dados
    - models/        # modelos (ORM)
    - routers/       # rotas da API
    - schemas/       # esquemas de validação (Pydantic)
    - services/      # regras de negócio
    - config.py      # configurações da aplicação (Settings)
    - main.py        # montagem da aplicação (CORS, rotas, Swagger)
- tests/             # testes automatizados
- .env               # variáveis de ambiente (NÃO versionado)
- .env.example       # modelo das variáveis de ambiente
- requirements.txt   # dependências

## Padrões do projeto

- Nomenclatura: snake_case para módulos, funções e variáveis; PascalCase para classes
- Organização: rotas em routers/, regras de negócio em services/, validação em schemas/, banco em models/ e database/
- Git: commits semânticos (feat:, fix:, docs:, refactor:, test:, chore:), desenvolvimento exclusivo em branch feat/nome-descricao
- Credenciais: nunca versionadas — apenas o .env.example com os nomes das variáveis

## Como rodar o projeto

1. Criar e ativar o ambiente virtual:

    python -m venv venv
    venv\Scripts\Activate.ps1

2. Instalar as dependências:

    pip install -r requirements.txt

3. Configurar as variáveis de ambiente: copiar .env.example para .env e preencher os valores.

4. Executar a aplicação:

    uvicorn app.main:app --reload

5. Acessar:

- API: http://localhost:8000
- Documentação (Swagger): http://localhost:8000/docs

## Testes

    pytest

## Endpoints

| Método | Rota       | Descrição                                                                 |
|--------|------------|---------------------------------------------------------------------------|
| GET    | /health    | Verificação de saúde da aplicação (status, nome e versão)                 |

## Sprint 1

- [x] Tarefa 1 — Configuração do ambiente de desenvolvimento
- [x] Tarefa 2 — Estrutura modular do back-end
- [ ] Tarefa 3 — Modelagem do banco de dados
- [ ] Tarefa 4 — Integração com banco de dados
- [ ] Tarefa 5 — Migrações
- [x] Tarefa 6 — CORS e documentação (Swagger)

## Equipe

Desenvolvimento do back-end: João Pedro
Responsável pela sprint e integração de PRs: Ana Beatriz
