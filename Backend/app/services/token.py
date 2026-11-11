import hashlib
import secrets
from datetime import datetime, timedelta, timezone

from jose import jwt, JWTError

# Chave que ASSINA os tokens — quem tiver ela pode forjar tokens válidos.
# EM PRODUÇÃO: deve vir de variável de ambiente, NUNCA ficar no código.
# Para gerar uma de verdade: python -c "import secrets; print(secrets.token_hex(32))"
SECRET_KEY = "makiia-dev-secret-troque-em-producao-9f3c7a1b"
ALGORITMO = "HS256"
EXPIRA_MINUTOS = 60 * 8  # token válido por 8 horas (uma jornada de trabalho)
TEMPO_EXPIRACAO_RECUPERACAO_MINUTOS = 30  # validade do token de recuperação


def criar_token_acesso(id_usuario: int) -> str:
    """Cria o crachá do usuário: um JWT assinado com prazo de validade."""
    agora = datetime.now(timezone.utc)
    payload = {
        "sub": str(id_usuario),                            # o 'assunto': dono do token
        "exp": agora + timedelta(minutes=EXPIRA_MINUTOS),  # quando o crachá vence
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITMO)


def verificar_token(token: str) -> int | None:
    """Valida o crachá. Retorna o id do usuário se válido; None se inválido ou vencido."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITMO])
        return int(payload["sub"])
    except JWTError:
        return None


def gerar_token_recuperacao() -> str:
    """Gera um token aleatório de 256 bits: impossível de adivinhar."""
    return secrets.token_urlsafe(32)


def criar_hash_token(token_cru: str) -> str:
    """Gera o hash SHA-256 do token para gravar no banco.

    Mesma lógica da senha: se o banco vazar, o token cru não expõe nada.
    """
    return hashlib.sha256(token_cru.encode("utf-8")).hexdigest()