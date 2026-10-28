from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AuditoriaEventoCreate(BaseModel):
    """Dados que o sistema usa para registrar um evento de auditoria."""
    id_usuario: int
    acao: str
    entidade: str
    id_registro: int | None = None
    detalhes: dict | None = None


class AuditoriaEventoRead(BaseModel):
    """Dados que a API devolve de um evento de auditoria."""
    model_config = ConfigDict(from_attributes=True)

    id_evento: int
    id_usuario: int
    acao: str
    entidade: str
    id_registro: int | None = None
    detalhes: dict | None = None
    data_evento: datetime