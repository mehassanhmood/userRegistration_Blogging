# pydantic models:
from pydantic import BaseModel, EmailStr

class BlogModel(BaseModel):
    id: int
    title: str
    subtitle: str
    date: str
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


