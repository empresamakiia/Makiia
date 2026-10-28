from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import auth, health
from app.routers import perfis
from app.routers import usuarios

# Metadados das tags: organizam os grupos de endpoints na documentação
tags_metadata = [
    {
        "name": "Health",
        "description": "Endpoints de verificação de saúde da aplicação.",
    },
    {
        "name": "Perfis",
        "description": "Gestão de perfis de acesso do sistema.",
    },
    {
        "name": "Usuários",
        "description": "Gestão de usuários do sistema.",
    },
    {
        "name": "Autenticação",
        "description": "Login e verificação de credenciais de usuários.",
    },
]

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "API do sistema Makiia — back-end desenvolvido em Python e FastAPI.\n\n"
        "**Sprint 1:** ambiente, estrutura modular, health check, CORS e documentação.\n\n"
        "Use esta interface para testar os endpoints diretamente no navegador."
    ),
    contact={
        "name": "Equipe Makiia",
        "email": "contato@makiia.com.br",
    },
    openapi_tags=tags_metadata,
)

# Origens autorizadas a chamar a API (front-end em desenvolvimento)
origens_permitidas = [
    "http://localhost:3000",   # Next.js (porta padrão)
    "http://localhost:5173",   # Vite (porta padrão)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origens_permitidas,   # quem pode chamar
    allow_credentials=True,             # pode enviar cookies/autenticação
    allow_methods=["*"],                # quais métodos HTTP (GET, POST...)
    allow_headers=["*"],                # quais cabeçalhos podem viajar
)

app.include_router(health.router)
app.include_router(perfis.router)
app.include_router(usuarios.router)
app.include_router(auth.router)