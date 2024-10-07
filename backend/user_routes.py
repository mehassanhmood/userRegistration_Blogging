from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import session_maker, User
from models import MakeUser
from typing import List 
from helper import hash_password


router = APIRouter()

def get_db():
    db = session_maker()
    try:
        yield db
    finally:
        db.close


# User Registration:
@router.post("/register_user")
def register(user: MakeUser, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered!")
    
    hashed_password = hash_password(user.password)
    new_user = User(username= user.username, email = user.email, hashed_password = hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Registration complete!"}