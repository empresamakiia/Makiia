from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Configurações centralizadas da aplicação."""

    APP_NAME: str = "Makiia Backend"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False

    class Config:
        env_file = ".env"


settings = Settings()