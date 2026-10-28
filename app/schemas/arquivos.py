from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ArquivoCreate(BaseModel):
    """Dados que a API aceita para registrar um arquivo."""
    id_usuario: int
    id_projeto: int | None = None
    id_execucao: int | None = None
    nome_arquivo: str
    tipo_mime: str
    tamanho_bytes: int
    origem: str


class ArquivoRead(BaseModel):
    """Dados que a API devolve de um arquivo."""
    model_config = ConfigDict(from_attributes=True)

    id_arquivo: int
    id_usuario: int
    id_projeto: int | None = None
    id_execucao: int | None = None
    nome_arquivo: str
    tipo_mime: str
    tamanho_bytes: int
    origem: str
    data_criacao: datetime