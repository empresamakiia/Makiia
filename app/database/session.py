from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import settings

engine = create_engine(settings.database_url)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


def get_db():
    """Fornece uma sessão de banco para cada requisição."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()