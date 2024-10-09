# pydantic models:
from pydantic import BaseModel, EmailStr

class BlogModel(BaseModel):
    id: int
    title: str
    subtitle: str
    date: str
    category: str
    body: str
    author: str

    class Config:
        orm_mode = True

class MakeUser(BaseModel):
    username: str
    email: EmailStr
    password: str

    class Config:
        orm_mode =  True


# jwt token pydantic model:
class Token(BaseModel):
    access_token: str
    token_type: str