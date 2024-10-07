# database schemas:

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text

URL_DATABASE = "sqlite:///./blogs.db"
""" 
By default, SQLite only lets one thread use a connection at a time. This means if one part of your program is using the database, another part (in a different thread) can't use the same connection.

Setting It to False:

When you set check_same_thread=False, you allow different threads to share the same database connection.
"""
engine = create_engine(URL_DATABASE, connect_args={"check_same_thread": False})

session_maker = sessionmaker(autocommit=False, autoflush = False, bind=engine)

Base = declarative_base()

class BlogPost(Base):

    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index= True)
    title = Column(String(250))
    subtitle = Column(String(250))
    date = Column(String(250))
    body = Column(Text)
    author = Column(String(250))

Base.metadata.create_all(bind=engine)

class User(Base):
    __tablename__ = "users_data"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String,unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

Base.metadata.create_all(bind=engine)