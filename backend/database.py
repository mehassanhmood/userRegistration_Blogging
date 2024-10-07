from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


URL_DATABASE = "sqlite:///./blogs.db"
""" 
y default, SQLite only lets one thread use a connection at a time. This means if one part of your program is using the database, another part (in a different thread) can't use the same connection.

Setting It to False:

When you set check_same_thread=False, you allow different threads to share the same database connection.
"""
engine = create_engine(URL_DATABASE, connect_args={"check_same_thread": False})

session_maker = sessionmaker(autocommit=False, autoflush = False, bind=engine)

Base = declarative_base()

