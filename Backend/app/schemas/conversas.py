from datetime import datetime
from typing import List, Literal

from pydantic import BaseModel, ConfigDict, Field


class ConversaCreate(BaseModel):
    """O dono da conversa vem do token, não do corpo."""
    titulo: str = Field(min_length=1, max_length=255)
    id_projeto: int | None = None


class ConversaUpdate(BaseModel):
    """Só altera o que for enviado."""
    titulo: str | None = Field(default=None, min_length=1, max_length=255)


class MensagemCreate(BaseModel):
    papel: Literal["usuario", "assistente"]
    conteudo: str = Field(min_length=1)


class MensagemRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id_mensagem: int
    id_conversa: int
    papel: str
    conteudo: str
    data_criacao: datetime


class ConversaRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id_conversa: int
    id_usuario: int
    id_projeto: int | None = None
    titulo: str
    data_criacao: datetime
    data_atualizacao: datetime


class ConversaDetalhe(ConversaRead):
    """Conversa com todas as mensagens, em ordem cronológica."""
    mensagens: List[MensagemRead] = []