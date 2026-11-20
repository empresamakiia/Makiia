from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.dependencias import get_usuario_logado
from app.models.brand_kits import BrandKit
from app.models.usuarios import Usuario
from app.schemas.brand_kits import BrandKitCreate, BrandKitRead, BrandKitUpdate
from app.services.armazenamento import localizar_logo, remover_logo, salvar_logo

router = APIRouter(prefix="/brand-kits", tags=["Brand Kits"])

# Campos que não podem ficar vazios no banco (NOT NULL)
CAMPOS_OBRIGATORIOS = ("nome", "cor_primaria")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def buscar_do_dono(db: Session, id_brand_kit: int, usuario: Usuario) -> BrandKit:
    """Devolve o kit só se ele existir E pertencer ao usuário logado.

    Kit de outro usuário responde 404, igual a kit inexistente:
    não revela que ele existe.
    """
    kit = (
        db.query(BrandKit)
        .filter(
            BrandKit.id_brand_kit == id_brand_kit,
            BrandKit.id_usuario == usuario.id_usuario,
        )
        .first()
    )
    if not kit:
        raise HTTPException(status_code=404, detail="Brand Kit não encontrado")
    return kit


@router.post("", response_model=BrandKitRead, status_code=201)
def criar_brand_kit(
    dados: BrandKitCreate,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    kit = BrandKit(id_usuario=usuario.id_usuario, **dados.model_dump())
    db.add(kit)
    db.commit()
    db.refresh(kit)
    return kit


@router.get("", response_model=list[BrandKitRead])
def listar_brand_kits(
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    return (
        db.query(BrandKit)
        .filter(BrandKit.id_usuario == usuario.id_usuario)
        .order_by(BrandKit.id_brand_kit)
        .all()
    )


@router.get("/{id_brand_kit}", response_model=BrandKitRead)
def obter_brand_kit(
    id_brand_kit: int,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    return buscar_do_dono(db, id_brand_kit, usuario)


@router.put("/{id_brand_kit}", response_model=BrandKitRead)
def atualizar_brand_kit(
    id_brand_kit: int,
    dados: BrandKitUpdate,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    kit = buscar_do_dono(db, id_brand_kit, usuario)

    # exclude_unset: só altera o que o cliente enviou de fato
    for campo, valor in dados.model_dump(exclude_unset=True).items():
        # Campo obrigatório não aceita null: ignora em vez de estourar erro 500
        if campo in CAMPOS_OBRIGATORIOS and valor is None:
            continue
        setattr(kit, campo, valor)

    db.commit()
    db.refresh(kit)
    return kit


@router.delete("/{id_brand_kit}")
def remover_brand_kit(
    id_brand_kit: int,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    kit = buscar_do_dono(db, id_brand_kit, usuario)
    db.delete(kit)
    db.commit()
    remover_logo(id_brand_kit)
    return {"mensagem": "Brand Kit removido com sucesso"}


@router.post("/{id_brand_kit}/logo", response_model=BrandKitRead)
def enviar_logo(
    id_brand_kit: int,
    arquivo: UploadFile = File(...),
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    kit = buscar_do_dono(db, id_brand_kit, usuario)
    salvar_logo(id_brand_kit, arquivo)
    kit.logo_url = f"/brand-kits/{id_brand_kit}/logo"
    db.commit()
    db.refresh(kit)
    return kit


@router.get("/{id_brand_kit}/logo")
def obter_logo(
    id_brand_kit: int,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_logado),
):
    buscar_do_dono(db, id_brand_kit, usuario)
    caminho = localizar_logo(id_brand_kit)
    if not caminho:
        raise HTTPException(status_code=404, detail="Este Brand Kit ainda não tem logo")
    return FileResponse(caminho)