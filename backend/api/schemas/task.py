from datetime import date
from typing import Optional

from pydantic import BaseModel


class TaskBase(BaseModel):
    title: str
    concept: Optional[str] = None
    due_date: Optional[date] = None


class TaskCreate(TaskBase):
    done: bool = False
    task_order: int = 0


class TaskResponse(TaskCreate):
    id: int

    class Config:
        from_attributes = True


class TaskArrange(BaseModel):
    id: int
    task_arrange: int

