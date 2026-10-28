from datetime import datetime

from sqlalchemy import BigInteger, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Arquivo(Base):
    __tablename__ = "arquivos"

    id_arquivo: Mapped[int] = mapped_column(Integer, primary_key=True)
    id_usuario: Mapped[int] = mapped_column(
        ForeignKey("usuarios.id_usuario"), nullable=False
    )
    id_projeto: Mapped[int | None] = mapped_column(ForeignKey("projetos.id_projeto"))
    id_execucao: Mapped[int | None] = mapped_column(
        ForeignKey("execucoes_ia.id_execucao")
    )
    nome_arquivo: Mapped[str] = mapped_column(String(255), nullable=False)
    tipo_mime: Mapped[str] = mapped_column(String(100), nullable=False)
    tamanho_bytes: Mapped[int] = mapped_column(BigInteger, nullable=False)
    caminho_armazenamento: Mapped[str] = mapped_column(String(255), nullable=False)
    origem: Mapped[str] = mapped_column(String(50), nullable=False)
    data_criacao: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )