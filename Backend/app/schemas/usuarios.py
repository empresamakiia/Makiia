from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UsuarioCreate(BaseModel):
    """Dados que a API aceita para criar um usuário."""
    id_perfil: int
    nome: str = Field(min_length=2, max_length=100)
    email: EmailStr
    senha: str = Field(min_length=8)


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
    nome: str | None = Field(default=None, min_length=2, max_length=100)
    id_perfil: int | None = None
    ativo: bool | None = None


class LoginIn(BaseModel):
    """Dados que a API aceita para autenticar um usuário."""
    email: EmailStr
    senha: str  # sem validação de tamanho aqui: falha de login é 401, não 422


class TrocarSenhaIn(BaseModel):
    """Dados que a API aceita para trocar a senha de um usuário."""
    email: EmailStr
    senha_atual: str
    senha_nova: str = Field(min_length=8)


class LoginResponse(BaseModel):
    """Resposta do login: o crachá (token) junto com os dados do usuário."""
    access_token: str
    token_type: str = "bearer"
    usuario: UsuarioRead