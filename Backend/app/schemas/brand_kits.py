from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

# Cor no formato hexadecimal: #RRGGBB
HEX = r"^#[0-9A-Fa-f]{6}$"


class BrandKitCreate(BaseModel):
    nome: str = Field(min_length=2, max_length=120)
    descricao: Optional[str] = None
    cor_primaria: str = Field(pattern=HEX)
    cor_secundaria: Optional[str] = Field(default=None, pattern=HEX)
    cor_acento: Optional[str] = Field(default=None, pattern=HEX)
    fonte_titulo: Optional[str] = Field(default=None, max_length=80)
    fonte_corpo: Optional[str] = Field(default=None, max_length=80)
    logo_url: Optional[str] = Field(default=None, max_length=500)


class BrandKitUpdate(BaseModel):
    """Todos opcionais: o PUT altera só o que for enviado."""
    nome: Optional[str] = Field(default=None, min_length=2, max_length=120)
    descricao: Optional[str] = None
    cor_primaria: Optional[str] = Field(default=None, pattern=HEX)
    cor_secundaria: Optional[str] = Field(default=None, pattern=HEX)
    cor_acento: Optional[str] = Field(default=None, pattern=HEX)
    fonte_titulo: Optional[str] = Field(default=None, max_length=80)
    fonte_corpo: Optional[str] = Field(default=None, max_length=80)
    logo_url: Optional[str] = Field(default=None, max_length=500)


class BrandKitRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id_brand_kit: int
    id_usuario: int
    nome: str
    descricao: Optional[str]
    cor_primaria: str
    cor_secundaria: Optional[str]
    cor_acento: Optional[str]
    fonte_titulo: Optional[str]
    fonte_corpo: Optional[str]
    logo_url: Optional[str]
    data_criacao: datetime
    data_atualizacao: datetime