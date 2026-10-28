from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProjetoCreate(BaseModel):
    """Dados que a API aceita para criar um projeto."""
    id_usuario: int
    nome: str
    descricao: str | None = None
    status: str = "ativo"


class ProjetoRead(BaseModel):
    """Dados que a API devolve de um projeto."""
    model_config = ConfigDict(from_attributes=True)

    id_projeto: int
    id_usuario: int
    nome: str
    descricao: str | None = None
    status: str
    data_criacao: datetime
    data_atualizacao: datetime