from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.perfis import Perfil
from app.schemas.perfis import PerfilCreate, PerfilRead

router = APIRouter(prefix="/perfis", tags=["Perfis"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=PerfilRead, status_code=status.HTTP_201_CREATED)
def criar_perfil(dados: PerfilCreate, db: Session = Depends(get_db)):
    existente = db.query(Perfil).filter(Perfil.nome == dados.nome).first()
    if existente:
        raise HTTPException(status_code=409, detail="Já existe um perfil com esse nome")

    novo = Perfil(nome=dados.nome, descricao=dados.descricao)
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo


@router.get("/", response_model=List[PerfilRead])
def listar_perfis(db: Session = Depends(get_db)):
    return db.query(Perfil).order_by(Perfil.id_perfil).all()


@router.get("/{id_perfil}", response_model=PerfilRead)
def obter_perfil(id_perfil: int, db: Session = Depends(get_db)):
    perfil = db.query(Perfil).filter(Perfil.id_perfil == id_perfil).first()
    if not perfil:
        raise HTTPException(status_code=404, detail="Perfil não encontrado")
    return perfil