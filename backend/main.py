
from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from .database import session_maker, engine
from .models import BlogPost, Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [""]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins
)

class BlogBase(BaseModel):
    id: int
    title: str
    subtitle: str
    date: str
    body: str
    author: str


class BlogModel(BlogBase):
    id: int

    class Config:
        orm_mode = True


def get_db():
    db = session_maker()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
Base.metadata.create_all(bind=engine)

@app.post("/blogs/",response_model=BlogModel)
async def add_blog(blog: BlogBase, db:db_dependency):
    db_blog = BlogPost(**blog.dict())
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog

@app.get("/blogs/",response_model=List[BlogModel])
async def read_blog(db:db_dependency, skip: int=0, limit:int=10):
    blogs = db.query(BlogPost).limit(limit).all()
    return blogs

@app.delete("/blogs/{blog_id}", response_model=dict)
async def delete_blog(blog_id: int, db: db_dependency):
    blog_to_delete = db.query(BlogPost).filter(BlogPost.id == blog_id).first()

    if not blog_to_delete:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    db.delete(blog_to_delete)
    db.commit()
    
    # Return a success message
    return {"detail": "Blog post deleted successfully"}