from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class AuditoriaEvento(Base):
    __tablename__ = "auditoria_eventos"

    id_evento: Mapped[int] = mapped_column(Integer, primary_key=True)
    id_usuario: Mapped[int] = mapped_column(
        ForeignKey("usuarios.id_usuario"), nullable=False
    )
    acao: Mapped[str] = mapped_column(String(100), nullable=False)
    entidade: Mapped[str] = mapped_column(String(100), nullable=False)
    id_registro: Mapped[int | None] = mapped_column(Integer)
    detalhes: Mapped[dict | None] = mapped_column(JSONB)
    data_evento: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )