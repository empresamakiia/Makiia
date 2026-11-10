from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.dependencias import get_usuario_logado
from app.models.projetos import Projeto
from app.models.usuarios import Usuario
from app.schemas.projetos import ProjetoCreate, ProjetoRead, ProjetoUpdate

router = APIRouter(prefix="/projetos", tags=["Projetos"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def _obter_projeto_do_usuario(
    db: Session, id_projeto: int, usuario_logado: Usuario
) -> Projeto:
    """Busca o projeto e confere se pertence ao usuário logado."""
    projeto = db.query(Projeto).filter(Projeto.id_projeto == id_projeto).first()
    if not projeto:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    if projeto.id_usuario != usuario_logado.id_usuario:
        raise HTTPException(status_code=403, detail="Este projeto não pertence a você")
    return projeto


@router.post("/", response_model=ProjetoRead, status_code=status.HTTP_201_CREATED)
def criar_projeto(
    dados: ProjetoCreate,
    usuario_logado: Usuario = Depends(get_usuario_logado),
    db: Session = Depends(get_db),
):
    novo = Projeto(
        id_usuario=usuario_logado.id_usuario,  # ← o dono vem do TOKEN, não do body
        nome=dados.nome,
        descricao=dados.descricao,
        status=dados.status,
    )
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo


@router.get("/", response_model=List[ProjetoRead])
def listar_projetos(
    usuario_logado: Usuario = Depends(get_usuario_logado),
    db: Session = Depends(get_db),
):
    # Só devolve os projetos do usuário logado
    return (
        db.query(Projeto)
        .filter(Projeto.id_usuario == usuario_logado.id_usuario)
        .order_by(Projeto.id_projeto)
        .all()
    )


@router.get("/{id_projeto}", response_model=ProjetoRead)
def obter_projeto(
    id_projeto: int,
    usuario_logado: Usuario = Depends(get_usuario_logado),
    db: Session = Depends(get_db),
):
    return _obter_projeto_do_usuario(db, id_projeto, usuario_logado)


@router.put("/{id_projeto}", response_model=ProjetoRead)
def atualizar_projeto(
    id_projeto: int,
    dados: ProjetoUpdate,
    usuario_logado: Usuario = Depends(get_usuario_logado),
    db: Session = Depends(get_db),
):
    projeto = _obter_projeto_do_usuario(db, id_projeto, usuario_logado)

    # Só altera os campos que o cliente realmente enviou
    if dados.nome is not None:
        projeto.nome = dados.nome
    if dados.descricao is not None:
        projeto.descricao = dados.descricao
    if dados.status is not None:
        projeto.status = dados.status

    db.commit()
    db.refresh(projeto)
    return projeto


@router.delete("/{id_projeto}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_projeto(
    id_projeto: int,
    usuario_logado: Usuario = Depends(get_usuario_logado),
    db: Session = Depends(get_db),
):
    projeto = _obter_projeto_do_usuario(db, id_projeto, usuario_logado)

    db.delete(projeto)
    db.commit()
    return None