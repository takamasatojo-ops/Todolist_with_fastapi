from sqlalchemy.ext.asyncio import AsyncSession

import api.models.task as task_model
import api.schemas.task as task_schema

from typing import List, Optional


async def create_task(
    db: AsyncSession, task_create: task_schema.TaskCreate
) -> task_model.Task:
    task = task_model.Task(**task_create.model_dump())
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task


from sqlalchemy import select


async def get_tasks(db: AsyncSession) -> List[task_model.Task]:
    result = await db.execute(
        select(task_model.Task).order_by(task_model.Task.task_order)
    )
    return result.scalars().all()


async def get_task(db: AsyncSession, task_id: int) -> Optional[task_model.Task]:

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
            task.task_arrange = item.task_arrange

    await db.commit()


async def update_task(
    db: AsyncSession, task_create: task_schema.TaskCreate, original: task_model.Task
) -> task_model.Task:
    original.title = task_create.title
    original.concept = task_create.concept
    original.due_date = task_create.due_date
    original.done = task_create.done
    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


async def delete_task(db: AsyncSession, original: task_model.Task) -> None:
    await db.delete(original)
    await db.commit()
