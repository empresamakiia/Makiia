from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import settings

def _normalizar_url(url: str) -> str:
    """Força o driver psycopg2 em URLs sem driver explícito (ex.: as do Neon/Vercel).

    No SQLAlchemy 2.1, "postgresql://" usa o driver psycopg (v3), que não
    está instalado. O projeto usa psycopg2.
    """
    for prefixo in ("postgres://", "postgresql://"):
        if url.startswith(prefixo):
            return "postgresql+psycopg2://" + url[len(prefixo):]
    return url


engine = create_engine(_normalizar_url(settings.database_url))

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


def get_db():
    """Fornece uma sessão de banco para cada requisição."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()