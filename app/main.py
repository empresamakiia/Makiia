from fastapi import FastAPI

from app.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
)


@app.get("/health", tags=["Health"])
def health_check():
    """Endpoint de verificação de saúde da API."""
    return {"status": "ok", "app": settings.APP_NAME, "version": settings.APP_VERSION}