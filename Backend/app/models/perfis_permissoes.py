from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class PerfilPermissao(Base):
    __tablename__ = "perfis_permissoes"

    id_perfil: Mapped[int] = mapped_column(
        ForeignKey("perfis.id_perfil"), primary_key=True
    )
    id_permissao: Mapped[int] = mapped_column(
        ForeignKey("permissoes.id_permissao"), primary_key=True
    )