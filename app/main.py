from fastapi import FastAPI

from app.config import settings
from app.routers import health

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(health.router)