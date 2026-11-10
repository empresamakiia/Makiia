from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.dependencias import get_usuario_logado
from app.models.usuarios import Usuario
from app.schemas.usuarios import LoginIn, LoginResponse, TrocarSenhaIn, UsuarioRead
from app.services.seguranca import gerar_hash_senha, verificar_senha
from app.services.token import criar_token_acesso

router = APIRouter(prefix="/auth", tags=["Autenticação"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/login", response_model=LoginResponse)
def login(dados: LoginIn, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.email == dados.email).first()

    # Mesma mensagem pros dois casos: NUNCA revelar se o e-mail existe ou não
    if not usuario or not verificar_senha(dados.senha, usuario.senha_hash):
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos")

    # Autenticou: emite o crachá que mantém o usuário logado
    token = criar_token_acesso(usuario.id_usuario)
    return LoginResponse(access_token=token, usuario=usuario)


@router.get("/me", response_model=UsuarioRead)
def quem_sou_eu(usuario_logado: Usuario = Depends(get_usuario_logado)):
    """Rota protegida: devolve os dados de quem está autenticado pelo token."""
    return usuario_logado


@router.post("/trocar-senha")
def trocar_senha(dados: TrocarSenhaIn, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.email == dados.email).first()

    # A senha ATUAL precisa estar correta pra permitir a troca
    if not usuario or not verificar_senha(dados.senha_atual, usuario.senha_hash):
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos")

    # A nova senha entra já hasheada — nunca gravamos senha pura
    usuario.senha_hash = gerar_hash_senha(dados.senha_nova)
    db.commit()

    return {"mensagem": "Senha alterada com sucesso"}