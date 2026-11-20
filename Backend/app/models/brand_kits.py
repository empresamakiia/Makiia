from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class BrandKit(Base):
    __tablename__ = "brand_kits"

    id_brand_kit: Mapped[int] = mapped_column(Integer, primary_key=True)
    id_usuario: Mapped[int] = mapped_column(
        ForeignKey("usuarios.id_usuario"), nullable=False, index=True
    )
    nome: Mapped[str] = mapped_column(String(120), nullable=False)
    descricao: Mapped[str | None] = mapped_column(Text, nullable=True)
    cor_primaria: Mapped[str] = mapped_column(String(7), nullable=False)
    cor_secundaria: Mapped[str | None] = mapped_column(String(7), nullable=True)
    cor_acento: Mapped[str | None] = mapped_column(String(7), nullable=True)
    fonte_titulo: Mapped[str | None] = mapped_column(String(80), nullable=True)
    fonte_corpo: Mapped[str | None] = mapped_column(String(80), nullable=True)
    logo_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    data_criacao: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    data_atualizacao: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )