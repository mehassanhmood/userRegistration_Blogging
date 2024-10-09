from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import session_maker, User
from models import MakeUser, Token
from typing import List 
from jose import jwt, JWTError
from helper import hash_password, verify_password, make_access_token, authenticate_user

OAUTH2_SCHEME = OAuth2PasswordBearer(tokenUrl = "login")

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



@router.post("/login", response_model = Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail = "Incorrect username or password",
            headers = {"WWW-Authenticate": "Bearer"}
        )
    access_token = make_access_token(
        data={
            "sub": user.username
        },
    )
    return{"access_token": access_token, "token_type": "bearer"}