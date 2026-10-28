from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ExecucaoIACreate(BaseModel):
    """Dados que o sistema usa para registrar uma execução de IA."""
    id_solicitacao: int
    id_ferramenta: int
    status: str = "em_andamento"


class ExecucaoIARead(BaseModel):
    """Dados que a API devolve de uma execução de IA."""
    model_config = ConfigDict(from_attributes=True)

    id_execucao: int
    id_solicitacao: int
    id_ferramenta: int
    status: str
    resultado_texto: str | None = None
    mensagem_erro: str | None = None
    codigo_erro: str | None = None
    data_inicio: datetime
    data_fim: datetime | None = None
    duracao_ms: int | None = None