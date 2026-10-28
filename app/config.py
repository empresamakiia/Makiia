from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configurações centralizadas da aplicação."""

    APP_NAME: str = "Makiia Backend"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    database_url: str

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()