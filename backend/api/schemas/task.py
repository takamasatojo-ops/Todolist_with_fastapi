from datetime import date, time
from typing import Optional

from pydantic import BaseModel


class TaskBase(BaseModel):
    title: str
    concept: Optional[str] = None
    startDate: Optional[date] = None
    dueDate: Optional[date] = None
    starttime: Optional[time] = None
    endtime: Optional[time] = None


class TaskCreate(TaskBase):
    done: bool = False
    taskOrder: int = 0


class TaskResponse(TaskCreate):
    id: int

    class Config:
        from_attributes = True


class TaskArrange(BaseModel):
    id: int
    taskOrder: int
