from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from sqlalchemy import func
from app.database.session import SessionLocal
from app.dependencias import get_usuario_logado
from app.models.conversas import Conversa
from app.models.mensagens import Mensagem
from app.models.projetos import Projeto
from app.models.usuarios import Usuario
from app.schemas.conversas import (
    ConversaCreate,
    ConversaDetalhe,
    ConversaRead,
    ConversaUpdate,
    MensagemCreate,
    MensagemRead,
)

router = APIRouter(prefix="/conversas", tags=["Conversas"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def _obter_conversa_do_dono(db: Session, id_conversa: int, usuario: Usuario) -> Conversa:
    """Devolve a conversa só se ela existir E pertencer ao usuário logado.
    Conversa de outro usuário responde 404, igual a inexistente.
    """
    conversa = (
        db.query(Conversa)
        .filter(
            Conversa.id_conversa == id_conversa,
            Conversa.id_usuario == usuario.id_usuario,
        )
        .first()
    )
    if not conversa:
        raise HTTPException(status_code=404, detail="Conversa não encontrada")
    return conversa


def _confere_projeto_do_dono(db: Session, id_projeto: int | None, usuario: Usuario) -> None:
    """Se a conversa for ligada a um projeto, o projeto precisa ser do mesmo usuário."""
    if id_projeto is None:
        return
    projeto = (
        db.query(Projeto)
        .filter(
            Projeto.id_projeto == id_projeto,
            Projeto.id_usuario == usuario.id_usuario,
        )
        .first()
    )
    if not projeto:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")


@router.post("", response_model=ConversaRead, status_code=status.HTTP_201_CREATED)
def criar_conversa(
    dados: ConversaCreate,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    _confere_projeto_do_dono(db, dados.id_projeto, usuario)
    conversa = Conversa(
        id_usuario=usuario.id_usuario,
        id_projeto=dados.id_projeto,
        titulo=dados.titulo,
    )
    db.add(conversa)
    db.commit()
    db.refresh(conversa)
    return conversa


@router.get("", response_model=List[ConversaRead])
def listar_conversas(
    id_projeto: int | None = None,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    """Lista as conversas do usuário. Use ?id_projeto=X para filtrar por projeto."""
    query = db.query(Conversa).filter(Conversa.id_usuario == usuario.id_usuario)
    if id_projeto is not None:
        query = query.filter(Conversa.id_projeto == id_projeto)
    return query.order_by(Conversa.data_atualizacao.desc()).all()


@router.get("/{id_conversa}", response_model=ConversaDetalhe)
def obter_conversa(
    id_conversa: int,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    conversa = _obter_conversa_do_dono(db, id_conversa, usuario)
    mensagens = (
        db.query(Mensagem)
        .filter(Mensagem.id_conversa == conversa.id_conversa)
        .order_by(Mensagem.id_mensagem)
        .all()
    )
    return ConversaDetalhe(
        id_conversa=conversa.id_conversa,
        id_usuario=conversa.id_usuario,
        id_projeto=conversa.id_projeto,
        titulo=conversa.titulo,
        data_criacao=conversa.data_criacao,
        data_atualizacao=conversa.data_atualizacao,
        mensagens=[MensagemRead.model_validate(m) for m in mensagens],
    )


@router.put("/{id_conversa}", response_model=ConversaRead)
def atualizar_conversa(
    id_conversa: int,
    dados: ConversaUpdate,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    conversa = _obter_conversa_do_dono(db, id_conversa, usuario)
    if dados.titulo is not None:
        conversa.titulo = dados.titulo
    db.commit()
    db.refresh(conversa)
    return conversa


@router.delete("/{id_conversa}", status_code=status.HTTP_204_NO_CONTENT)
def remover_conversa(
    id_conversa: int,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    conversa = _obter_conversa_do_dono(db, id_conversa, usuario)
    db.delete(conversa)  # as mensagens são removidas junto (CASCADE)
    db.commit()
    return None


@router.post(
    "/{id_conversa}/mensagens",
    response_model=MensagemRead,
    status_code=status.HTTP_201_CREATED,
)
def adicionar_mensagem(
    id_conversa: int,
    dados: MensagemCreate,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    conversa = _obter_conversa_do_dono(db, id_conversa, usuario)
    mensagem = Mensagem(
        id_conversa=conversa.id_conversa,
        papel=dados.papel,
        conteudo=dados.conteudo,
    )
    db.add(mensagem)
    # Atualiza a data da conversa, para ela subir na lista de recentes
    conversa.data_atualizacao = func.now()
    db.commit()
    db.refresh(mensagem)
    return mensagem