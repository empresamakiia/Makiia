from pydantic import BaseModel, ConfigDict


class PermissaoCreate(BaseModel):
    """Dados que a API aceita para criar uma permissão."""
    codigo: str
    descricao: str | None = None


class PermissaoRead(BaseModel):
    """Dados que a API devolve de uma permissão."""
    model_config = ConfigDict(from_attributes=True)

    id_permissao: int
    codigo: str
    descricao: str | None = None