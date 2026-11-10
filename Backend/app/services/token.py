from datetime import datetime, timedelta, timezone

from jose import jwt, JWTError

# Chave que ASSINA os tokens — quem tiver ela pode forjar tokens válidos.
# EM PRODUÇÃO: deve vir de variável de ambiente, NUNCA ficar no código.
# Para gerar uma de verdade: python -c "import secrets; print(secrets.token_hex(32))"
SECRET_KEY = "makiia-dev-secret-troque-em-producao-9f3c7a1b"
ALGORITMO = "HS256"
EXPIRA_MINUTOS = 60 * 8  # token válido por 8 horas (uma jornada de trabalho)


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