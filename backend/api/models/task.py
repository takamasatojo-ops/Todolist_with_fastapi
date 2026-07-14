from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Date, Text
from sqlalchemy.orm import relationship

from api.db import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(1024))

    concept = Column(Text)
    due_date = Column(Date)

    done = Column(Boolean, default=False)

    task_order = Column(Integer, default=0)
