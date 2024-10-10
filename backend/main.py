
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



# Registers the blog routes:
app.include_router(blog_router, prefix="/blog", tags=["Blog"])

# Registers the user routes:
app.include_router(user_router, prefix="/user", tags=["User"])