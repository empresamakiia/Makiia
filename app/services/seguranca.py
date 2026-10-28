from passlib.context import CryptContext

# Contexto de hash: bcrypt é o algoritmo recomendado para senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def gerar_hash_senha(senha_pura: str) -> str:
    """Transforma a senha em hash irreversível para gravar no banco."""
    return pwd_context.hash(senha_pura)


def verificar_senha(senha_pura: str, senha_hash: str) -> bool:
    """Compara a senha enviada com o hash gravado (para o login, depois)."""
    return pwd_context.verify(senha_pura, senha_hash)