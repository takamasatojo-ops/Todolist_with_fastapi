from typing import List, Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

import api.models.task as task_model
import api.schemas.task as task_schema


async def create_task(
    db: AsyncSession, task_create: task_schema.TaskCreate
) -> task_model.Task:
    task = task_model.Task(**task_create.model_dump())
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task


async def get_tasks(db: AsyncSession) -> List[task_model.Task]:
    result = await db.execute(
        select(task_model.Task).order_by(task_model.Task.taskOrder)
    )
    return result.scalars().all()


async def get_task(
    db: AsyncSession,
    task_id: int
) -> Optional[task_model.Task]:

    result = await db.execute(
        select(task_model.Task).where(task_model.Task.id == task_id)
    )

    return result.scalar_one_or_none()


async def update_task_arrange(
    db: AsyncSession, tasks_arrange: List[task_schema.TaskArrange]
):
    for item in tasks_arrange:

        result = await db.execute(
            select(task_model.Task).where(task_model.Task.id == item.id)
        )

        task = result.scalar_one_or_none()

        if task:
            task.taskOrder = item.taskOrder

    await db.commit()


async def update_task(
    db: AsyncSession,
    task_create: task_schema.TaskCreate,
    original: task_model.Task
) -> task_model.Task:
    original.title = task_create.title
    original.concept = task_create.concept
    original.startDate = task_create.startDate
    original.dueDate = task_create.dueDate
    original.done = task_create.done
    original.starttime = task_create.starttime
    original.endtime = task_create.endtime
    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


async def delete_task(db: AsyncSession, original: task_model.Task) -> None:
    await db.delete(original)
    await db.commit()
