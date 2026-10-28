# Makiia

Plataforma em desenvolvimento para apoiar a criação e organização de conteúdos de marketing com inteligência artificial. Este repositório reúne uma interface web em React e uma API REST em Python com FastAPI.

> **Estado atual:** o frontend contém uma landing page e uma tela visual de login. O backend fornece a estrutura inicial da API e um endpoint de verificação de saúde. Autenticação, geração de conteúdo por IA, persistência de dados e integração entre frontend e backend ainda não estão implementadas.

## Funcionalidades disponíveis

- Landing page com apresentação da proposta e navegação para a tela de login.
- Rotas de frontend `/` e `/login`, gerenciadas pelo React Router.
- Formulário de login com validações nativas do navegador; o envio ainda não autentica o usuário.
- API FastAPI com endpoint `GET /health`.
- Documentação interativa da API via Swagger UI e ReDoc.
- Configuração de CORS para desenvolvimento local nas portas `3000` e `5173`.
- Teste automatizado do endpoint de saúde.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 19, JavaScript, Vite 8, React Router 7, Axios |
| Backend | Python, FastAPI, Uvicorn, Pydantic Settings |
| Testes do backend | Pytest, FastAPI TestClient, HTTPX |

## Estrutura do projeto

```text
Makiia/
├── Backend/
│   ├── app/
│   │   ├── database/       # Preparação para acesso a dados
│   │   ├── models/         # Modelos da aplicação
│   │   ├── routers/        # Rotas da API, incluindo /health
│   │   ├── schemas/        # Esquemas de validação
│   │   ├── services/       # Camada de serviços
│   │   ├── config.py       # Configurações via ambiente
│   │   └── main.py         # Aplicação FastAPI, CORS e documentação
│   ├── tests/              # Testes automatizados
│   ├── .env.example        # Exemplo de configuração local
│   └── requirements.txt    # Dependências Python
├── Frontend/
│   ├── src/
│   │   ├── pages/          # Páginas Home e Login
│   │   ├── App.jsx         # Rotas do frontend
│   │   ├── index.css       # Estilos globais
│   │   └── main.jsx        # Inicialização do React
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Pré-requisitos

- Git
- Python 3.13 ou superior
- Node.js compatível com Vite 8 e npm

Não é necessário configurar PostgreSQL para executar a versão atual: o backend ainda não persiste dados.

## Como executar localmente

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd Makiia
```

### 2. Configure e inicie o backend

No terminal, entre na pasta do backend e crie um ambiente virtual:

```bash
cd Backend
python -m venv .venv
```

Ative o ambiente virtual. No PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

No Linux ou macOS:

```bash
source .venv/bin/activate
```

Instale as dependências e crie o arquivo local de configuração:

```bash
python -m pip install -r requirements.txt
```

No PowerShell:

```powershell
Copy-Item .env.example .env
```

No Linux ou macOS:

```bash
cp .env.example .env
```

As configurações disponíveis têm valores padrão no exemplo:

```dotenv
APP_NAME="Makiia Backend"
APP_VERSION="0.1.0"
DEBUG=True
```

Inicie a API a partir da pasta `Backend`:

```bash
python -m uvicorn app.main:app --reload
```

A API ficará disponível em `http://localhost:8000`.

### 3. Inicie o frontend

Em outro terminal, na raiz do repositório:

```bash
cd Frontend
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Rotas e documentação da API

| Método | Rota | Autenticação | Descrição |
| --- | --- | --- | --- |
| `GET` | `/health` | Não | Retorna o estado, nome e versão da API. |

Exemplo de resposta de `GET /health`:

```json
{
  "status": "ok",
  "app": "Makiia Backend",
  "version": "0.1.0"
}
```

Com o backend em execução, a documentação fica disponível em:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- Especificação OpenAPI: `http://localhost:8000/openapi.json`

## Rotas do frontend

| Rota | Página | Observação |
| --- | --- | --- |
| `/` | Home | Landing page da Makiia. |
| `/login` | Login | Formulário visual; ainda não envia credenciais para a API. |

O frontend e a API ainda não estão integrados. A tela de login não cria sessão, não utiliza JWT e não deve ser considerada um mecanismo de autenticação implementado.

## Testes e validações

Para executar os testes do backend, ative o ambiente virtual, entre em `Backend` e rode:

```bash
pytest
```

Para compilar o frontend:

```bash
cd Frontend
npm run build
```

Para verificar o estilo do código do frontend:

```bash
npm run lint
```

## Configuração e segurança

- O backend carrega configurações do arquivo `Backend/.env` e de variáveis de ambiente. O arquivo `.env` é ignorado pelo Git.
- Não armazene senhas, tokens ou outras credenciais no repositório.
- O CORS atual permite `http://localhost:3000` e `http://localhost:5173`; ajuste essa lista antes de publicar em outro domínio.
- Os valores em `.env.example` são exemplos de configuração, não credenciais de produção.

## Equipe

- Desenvolvimento do backend: João Pedro.
- Responsável pela sprint e integração de pull requests: Ana Beatriz.
