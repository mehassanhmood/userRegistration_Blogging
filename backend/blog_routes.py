from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import session_maker, BlogPost, User
from models import BlogModel
from typing import List 
from helper import get_current_user

router = APIRouter()

def get_db():
    db = session_maker()
    try:
        yield db
    finally:
        db.close()

@router.post("/blogs/", response_model=BlogModel)
async def add_blog(blog: BlogModel, db: Session = Depends(get_db)):
    db_blog = BlogPost(**blog.dict())
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog

@router.get("/blogs/", response_model=List[BlogModel])
async def read_blogs(db: Session = Depends(get_db), skip: int = 0, limit: int = 10, category: str = None):
    query = db.query(BlogPost)
    if category:
        query = query.filter(BlogPost.category.ilike(f"%{category}%"))
    blogs = query.offset(skip).limit(limit).all()
    return blogs

@router.get("/blogs/{blog_id}", response_model=BlogModel)
async def read_blog(blog_id: int, db: Session = Depends(get_db)):
    blog = db.query(BlogPost).filter(BlogPost.id == blog_id).first()
    if blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

@router.delete("/blogs/{blog_id}", response_model=dict)
async def delete_blog(blog_id: int, db: Session = Depends(get_db)):
    blog_to_delete = db.query(BlogPost).filter(BlogPost.id == blog_id).first()
    if not blog_to_delete:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    db.delete(blog_to_delete)
    db.commit()
    return {"detail": "Blog post deleted successfully"}