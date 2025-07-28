from pydantic import BaseModel, HttpUrl
from datetime import datetime

class LinkCreate(BaseModel):
    original_url: HttpUrl

class LinkOut(BaseModel):
    original_url: HttpUrl
    short_code: str

    class Config:
        orm_mode = True

class LinkStats(BaseModel):
    original_url: HttpUrl
    short_code: str
    clicks: int
    created_at: datetime

    class Config:
        orm_mode = True