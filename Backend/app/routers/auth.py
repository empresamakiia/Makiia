from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.dependencias import get_usuario_logado
from app.models.recuperacoes_senha import RecuperacaoSenha
from app.models.usuarios import Usuario
from app.schemas.usuarios import (
    LoginIn,
    LoginResponse,
    RedefinirSenhaIn,
    SolicitarRecuperacaoIn,
    TrocarSenhaIn,
    UsuarioRead,
)
from app.services.seguranca import gerar_hash_senha, verificar_senha
from app.services.token import (
    TEMPO_EXPIRACAO_RECUPERACAO_MINUTOS,
    criar_hash_token,
    criar_token_acesso,
    gerar_token_recuperacao,
)

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


@router.post("/recuperar-senha")
def solicitar_recuperacao(dados: SolicitarRecuperacaoIn, db: Session = Depends(get_db)):
    """Fluxo 1: o usuário pede a recuperação informando o e-mail."""
    usuario = db.query(Usuario).filter(Usuario.email == dados.email).first()

    if usuario:
        # O token CRU vai pro "e-mail" (console, em dev); o HASH vai pro banco
        token = gerar_token_recuperacao()
        recuperacao = RecuperacaoSenha(
            id_usuario=usuario.id_usuario,
            token_hash=criar_hash_token(token),
            utilizado=False,
            data_expiracao=datetime.now(timezone.utc)
            + timedelta(minutes=TEMPO_EXPIRACAO_RECUPERACAO_MINUTOS),
        )
        db.add(recuperacao)
        db.commit()

        # Em desenvolvimento: em vez de enviar e-mail, o token aparece no console
        print("\n" + "=" * 60)
        print("E-MAIL DE RECUPERAÇÃO (simulado) para:", dados.email)
        print("Token:", token)
        print("=" * 60 + "\n")

    # Resposta IDÊNTICA com ou sem conta: nunca revelar quem tem cadastro
    return {"mensagem": "Se o e-mail estiver cadastrado, um token de recuperação foi enviado"}


@router.post("/redefinir-senha")
def redefinir_senha(dados: RedefinirSenhaIn, db: Session = Depends(get_db)):
    """Fluxo 2: o usuário redefine a senha apresentando o token recebido."""
    token_hash = criar_hash_token(dados.token)

    recuperacao = (
        db.query(RecuperacaoSenha)
        .filter(RecuperacaoSenha.token_hash == token_hash)
        .first()
    )

    # Um token só vale se existir, não tiver sido usado e não tiver vencido
    agora = datetime.now(timezone.utc)
    if not recuperacao or recuperacao.utilizado or recuperacao.data_expiracao < agora:
        raise HTTPException(status_code=400, detail="Token inválido ou expirado")

    usuario = db.query(Usuario).filter(Usuario.id_usuario == recuperacao.id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=400, detail="Token inválido ou expirado")

    # A nova senha entra já hasheada e o token é consumido (não serve de novo)
    usuario.senha_hash = gerar_hash_senha(dados.senha_nova)
    recuperacao.utilizado = True
    recuperacao.data_utilizacao = agora
    db.commit()

    return {"mensagem": "Senha redefinida com sucesso"}