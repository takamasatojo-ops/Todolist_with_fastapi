from sqlalchemy import Column, Integer, String, Boolean, Date, Text, Time

from api.db import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(1024))

    concept = Column(Text)
    startDate = Column(Date)
    dueDate = Column(Date)

    done = Column(Boolean, default=False)

    taskOrder = Column(Integer, default=0)

    starttime = Column(Time)
    endtime = Column(Time)
