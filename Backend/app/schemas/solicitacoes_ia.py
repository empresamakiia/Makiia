from datetime import datetime

from pydantic import BaseModel, ConfigDict


class SolicitacaoIACreate(BaseModel):
    """Dados que a API aceita para criar uma solicitação de IA."""
    id_usuario: int
    id_projeto: int | None = None
    tipo_tarefa: str
    entrada: str
    status: str = "pendente"


class SolicitacaoIARead(BaseModel):
    """Dados que a API devolve de uma solicitação de IA."""
    model_config = ConfigDict(from_attributes=True)

    id_solicitacao: int
    id_usuario: int
    id_projeto: int | None = None
    tipo_tarefa: str
    entrada: str
    status: str
    data_criacao: datetime
    data_atualizacao: datetime