from sqlalchemy import create_engine
import os

from api.models.task import Base

DB_URL = os.getenv("MIGRATE_DATABASE_URL")
engine = create_engine(DB_URL, echo=True)


def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    reset_database()
