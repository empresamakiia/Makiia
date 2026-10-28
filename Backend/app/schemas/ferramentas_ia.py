from datetime import datetime

from pydantic import BaseModel, ConfigDict


class FerramentaIACreate(BaseModel):
    """Dados que a API aceita para criar uma ferramenta de IA."""
    nome: str
    provedor: str
    tipo_servico: str
    ativa: bool = True
    identificador_externo: str | None = None


class FerramentaIARead(BaseModel):
    """Dados que a API devolve de uma ferramenta de IA."""
    model_config = ConfigDict(from_attributes=True)

    id_ferramenta: int
    nome: str
    provedor: str
    tipo_servico: str
    ativa: bool
    identificador_externo: str | None = None
    data_criacao: datetime