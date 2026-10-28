from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class RecuperacaoSenha(Base):
    __tablename__ = "recuperacoes_senha"

    id_recuperacao: Mapped[int] = mapped_column(Integer, primary_key=True)
    id_usuario: Mapped[int] = mapped_column(
        ForeignKey("usuarios.id_usuario"), nullable=False
    )
    token_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    utilizado: Mapped[bool] = mapped_column(Boolean, default=False)
    data_criacao: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    data_expiracao: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    data_utilizacao: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))