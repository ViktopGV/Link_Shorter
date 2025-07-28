from sqlalchemy.orm import Session
from app.models.link import Link
import string, random

CODE_LENGTH = 6

def generate_short_code():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=CODE_LENGTH))

def create_link(db: Session, original_url: str):
    if not isinstance(original_url, str):
        original_url = str(original_url) 
    code = generate_short_code()
    while db.query(Link).filter(Link.short_code == code).first():
        code = generate_short_code()
    new_link = Link(original_url=original_url, short_code=code)
    db.add(new_link)
    db.commit()
    db.refresh(new_link)
    return new_link


def get_link_by_code(db: Session, code: str):
    return db.query(Link).filter(Link.short_code == code).first()