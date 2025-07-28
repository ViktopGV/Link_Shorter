from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.link import LinkCreate, LinkOut, LinkStats
from app.crud.link import create_link, get_link_by_code
from app.db.session import get_db
from fastapi.responses import RedirectResponse

router = APIRouter()

@router.post("/shorten", response_model=LinkOut)
def shorten_url(payload: LinkCreate, db: Session = Depends(get_db)):
    link = create_link(db, payload.original_url)
    return link

@router.get("/{short_code}")
def redirect_to_original(short_code: str, db: Session = Depends(get_db)):
    link = get_link_by_code(db, short_code)
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")

    link.clicks += 1
    db.commit()

    return RedirectResponse(url=link.original_url)

@router.get("/{short_code}/stats", response_model=LinkStats)
def get_stats(short_code: str, db: Session = Depends(get_db)):
    link = get_link_by_code(db, short_code)
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")
    return link