from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.usuarios import Usuario
from app.services.token import verificar_token

# Este esquema faz o Swagger mostrar o botão 'Authorize' (cadeado)
bearer_scheme = HTTPBearer(auto_error=False)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_usuario_logado(
    credenciais: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> Usuario:
    """Protege rotas: exige um crachá válido e devolve o usuário dono dele."""

    # Caso 1: nem apresentou crachá (header Authorization ausente)
    if credenciais is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Não autenticado",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Caso 2: crachá inválido ou vencido
    id_usuario = verificar_token(credenciais.credentials)
    if id_usuario is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Caso 3: crachá válido, mas o usuário não existe mais ou foi desativado
    usuario = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    if usuario is None or not usuario.ativo:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não encontrado ou desativado",
        )

    return usuario