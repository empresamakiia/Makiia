from urllib.parse import urlencode

import httpx
from fastapi import HTTPException, status

from app.config import settings

AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
TOKEN_URL = "https://oauth2.googleapis.com/token"
USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"


def montar_url_autorizacao(state: str) -> str:
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": "openid email profile",
        "state": state,
    }
    return f"{AUTH_URL}?{urlencode(params)}"


def trocar_code_por_usuario(code: str) -> dict:
    try:
        resposta = httpx.post(
            TOKEN_URL,
            data={
                "code": code,
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uri": settings.GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code",
            },
            timeout=10,
        )
        resposta.raise_for_status()
        tokens = resposta.json()
    except httpx.HTTPError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Não foi possível validar o código do Google",
        )

    acesso = tokens.get("access_token")
    if not acesso:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google não retornou access_token",
        )

    try:
        perfil = httpx.get(
            USERINFO_URL,
            headers={"Authorization": f"Bearer {acesso}"},
            timeout=10,
        )
        perfil.raise_for_status()
    except httpx.HTTPError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Não foi possível obter os dados do usuário no Google",
        )

    return perfil.json()