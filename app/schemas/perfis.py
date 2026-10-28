from pydantic import BaseModel, ConfigDict


class PerfilCreate(BaseModel):
    """Dados que a API aceita para criar um perfil."""
    nome: str
    descricao: str | None = None


class PerfilRead(BaseModel):
    """Dados que a API devolve de um perfil."""
    model_config = ConfigDict(from_attributes=True)

    id_perfil: int
    nome: str
    descricao: str | None = None