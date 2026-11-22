from pydantic import BaseModel


class GoogleCallbackRequest(BaseModel):
    code: str
    state: str


class GoogleTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"