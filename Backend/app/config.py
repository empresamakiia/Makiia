from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """ConfiguraÃ§Ãµes centralizadas da aplicaÃ§Ã£o."""

    APP_NAME: str = "Makiia Backend"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    UPLOAD_DIR: str = "uploads"
    database_url: str

    # AutenticaÃ§Ã£o / JWT
    SECRET_KEY: str = "troque-esta-chave"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Login com Google
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    GOOGLE_REDIRECT_URI: str = "http://localhost:5173/auth/google/callback"

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
