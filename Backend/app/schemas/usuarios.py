from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class UsuarioCreate(BaseModel):
    """Dados que a API aceita para criar um usuário."""
    id_perfil: int
    nome: str
    email: EmailStr
    senha: str


class UsuarioRead(BaseModel):
    """Dados que a API devolve de um usuário."""
    model_config = ConfigDict(from_attributes=True)

    id_usuario: int
    id_perfil: int
    nome: str
    email: str
    ativo: bool
    data_criacao: datetime
    data_atualizacao: datetime


class UsuarioUpdate(BaseModel):
    """Dados que o cliente pode alterar em um usuário existente."""
    nome: str | None = None
    id_perfil: int | None = None
    ativo: bool | None = None


class LoginIn(BaseModel):
    """Dados que a API aceita para autenticar um usuário."""
    email: EmailStr
    senha: str


class TrocarSenhaIn(BaseModel):
    """Dados que a API aceita para trocar a senha de um usuário."""
    email: EmailStr
    senha_atual: str
    senha_nova: str