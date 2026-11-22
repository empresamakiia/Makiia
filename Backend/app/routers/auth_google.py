import secrets
import time

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db  # ajuste se o nome for outro
from app.models.usuarios import Usuario
from app.schemas.auth_google import GoogleCallbackRequest, GoogleTokenResponse
from app.services.token import criar_token_acesso
from app.services.google_auth import montar_url_autorizacao, trocar_code_por_usuario

router = APIRouter(prefix="/auth/google", tags=["Autenticação"])

_estados: dict[str, float] = {}
VALIDADE_ESTADO = 600  # 10 minutos


@router.get("/url")
def obter_url_autorizacao():
    state = secrets.token_urlsafe(32)
    _estados[state] = time.time() + VALIDADE_ESTADO
    return {"url": montar_url_autorizacao(state), "state": state}


@router.post("/callback", response_model=GoogleTokenResponse)
def callback_google(payload: GoogleCallbackRequest, db: Session = Depends(get_db)):
    expira = _estados.pop(payload.state, None)
    if expira is None or expira < time.time():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="State inválido ou expirado",
        )

    dados = trocar_code_por_usuario(payload.code)

    email = (dados.get("email") or "").lower()
    if not email or not dados.get("email_verified"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail do Google não verificado",
        )

    usuario = db.query(Usuario).filter(Usuario.email == email).first()

    if usuario is None:
        usuario = Usuario(
            nome=dados.get("name") or email.split("@")[0],
            email=email,
            senha_hash=secrets.token_hex(32),
            id_perfil=1,
            ativo=True,
        )
        db.add(usuario)
        db.commit()
        db.refresh(usuario)

    if not usuario.ativo:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuário inativo",
        )

    token = criar_token_acesso(usuario.id_usuario)
    return {"access_token": token, "token_type": "bearer"}