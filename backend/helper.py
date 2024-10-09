from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from database import session_maker, User

import os

# To generate a random 256-bit key:
# SECRET_KEY = os.urandom(32).hex()

SECRET_KEY = "develpment_environment"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
OAUTH2_SCHEME = OAuth2PasswordBearer(tokenUrl = "login")

PWD_CONTEXT = CryptContext(schemes=["bcrypt"], deprecated="auto")



def get_db():
    db = session_maker()
    try:
        yield db
    finally:
        db.close()


# funtion to hash the password:
def hash_password(password:str) -> str:
    return PWD_CONTEXT.hash(password)

# to verify the password:
def verify_password(plain_password: str, hashed_password:str) -> bool:
    return PWD_CONTEXT.verify(plain_password, hashed_password)

# to authenticate user
def authenticate_user(db, username:str, password:str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

# the following function goes in add_blog:
def get_current_user(db, token:str = Depends(OAUTH2_SCHEME)):
    
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                details = "Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"}
            )
        user = db.query(User).filter(User.username == username).first()
        if user is None:
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                details = "Could not validate credentials",
                headers = {"WW-Authenticate": "Bearer"},
            )
        return user
    except JWTError:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            details = "Could not validate credentials",
            headers = {"WWW-Authenticate": "Bearer"}
        )

# jwt token verification:
def make_access_token(data:dict) -> str:
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt



     
