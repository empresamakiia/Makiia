from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class ExecucaoIA(Base):
    __tablename__ = "execucoes_ia"

    id_execucao: Mapped[int] = mapped_column(Integer, primary_key=True)
    id_solicitacao: Mapped[int] = mapped_column(
        ForeignKey("solicitacoes_ia.id_solicitacao"), nullable=False
    )
    id_ferramenta: Mapped[int] = mapped_column(
        ForeignKey("ferramentas_ia.id_ferramenta"), nullable=False
    )
    status: Mapped[str] = mapped_column(String(50), nullable=False)
    resultado_texto: Mapped[str | None] = mapped_column(Text)
    mensagem_erro: Mapped[str | None] = mapped_column(Text)
    codigo_erro: Mapped[str | None] = mapped_column(String(50))
    data_inicio: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    data_fim: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    duracao_ms: Mapped[int | None] = mapped_column(Integer)