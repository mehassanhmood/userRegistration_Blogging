
from fastapi import FastAPI, HTTPException, Depends
from blog_routes import router as blog_router
from user_routes import router as user_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = ["http://localhost:5173",]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods = ["*"],
    allow_credentials = True,
    allow_headers=["*"]

)

# def get_db():
#     db = session_maker()
#     try:
#         yield db
#     finally:
#         db.close()

# db_dependency = Annotated[Session, Depends(get_db)]


# Blog routes:
# @app.post("/blogs/",response_model=BlogModel)
# async def add_blog(blog: BlogModel, db:db_dependency):
#     db_blog = BlogPost(**blog.dict())
#     db.add(db_blog)
#     db.commit()
#     db.refresh(db_blog)
#     return db_blog

# @app.get("/blogs/",response_model=List[BlogModel])
# async def read_blog(db:db_dependency, skip: int=0, limit:int=10):
#     blogs = db.query(BlogPost).limit(limit).all()
#     return blogs

# @app.delete("/blogs/{blog_id}", response_model=dict)
# async def delete_blog(blog_id: int, db: db_dependency):
#     blog_to_delete = db.query(BlogPost).filter(BlogPost.id == blog_id).first()

#     if not blog_to_delete:
#         raise HTTPException(status_code=404, detail="Blog not found")
    
#     db.delete(blog_to_delete)
#     db.commit()
    
#     # Return a success message
#     return {"detail": "Blog post deleted successfully"}


# User Registration:
# @app.post("/register")
# def register(user: MakeUser, db: Session = Depends(get_db)):

#     db_user = db.query(User).filter(User.email == user.email).first()

#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered!")
    
#     hashed_password = hash_password(user.password)
#     new_user = User(username= user.username, email = user.email, hashed_password = hashed_password)
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return {"message": "Registration complete!"}


# Registers the blog routes:
app.include_router(blog_router, prefix="/blog", tags=["Blog"])

# Registers the user routes:
app.include_router(user_router, prefix="/user", tags=["User"])