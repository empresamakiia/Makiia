from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class FerramentaIA(Base):
    __tablename__ = "ferramentas_ia"

    id_ferramenta: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(String(100), nullable=False)
    provedor: Mapped[str] = mapped_column(String(100), nullable=False)
    tipo_servico: Mapped[str] = mapped_column(String(50), nullable=False)
    ativa: Mapped[bool] = mapped_column(Boolean, default=True)
    identificador_externo: Mapped[str | None] = mapped_column(String(255))
    data_criacao: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )