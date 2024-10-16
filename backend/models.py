# pydantic models:
from pydantic import BaseModel, EmailStr

from pydantic import BaseModel, Field
from typing import Optional

from pydantic import BaseModel

class BlogModel(BaseModel):
    id: int
    title: str
    # subtitle: str
    date: str
    category: str
    body: str
    author: str  # Assuming you'll pass this from the current_user

    class Config:
        orm_mode = True  # This is important to allow SQLAlchemy models to be converted to Pydantic models



class MakeUser(BaseModel):
    username: str
    email: EmailStr
    password: str

    class Config:
        from_attributes =  True


# jwt token pydantic model:
class Token(BaseModel):
    access_token: str
    token_type: str