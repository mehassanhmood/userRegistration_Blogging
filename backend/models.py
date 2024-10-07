# app/models.py

from .database import Base
from sqlalchemy import Column, Integer, String, Text

class BlogPost(Base):

    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index= True)
    title = Column(String(250))
    subtitle = Column(String(250))
    date = Column(String(250))
    body = Column(Text)
    author = Column(String(250))


