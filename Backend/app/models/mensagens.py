from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Mensagem(Base):
    __tablename__ = "mensagens"

    id_mensagem: Mapped[int] = mapped_column(Integer, primary_key=True)
    # Ao apagar a conversa, as mensagens são apagadas junto (CASCADE no banco)
    id_conversa: Mapped[int] = mapped_column(
        ForeignKey("conversas.id_conversa", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    papel: Mapped[str] = mapped_column(String(20), nullable=False)  # "usuario" ou "assistente"
    conteudo: Mapped[str] = mapped_column(Text, nullable=False)
    data_criacao: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )