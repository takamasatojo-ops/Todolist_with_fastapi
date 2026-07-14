from typing import List

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession

import api.schemas.task as task_schema

import api.cruds.task as task_crud
from api.db import get_db

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=List[task_schema.TaskResponse])
async def list_tasks(db: AsyncSession = Depends(get_db)):
    return await task_crud.get_tasks(db)


@router.post("", response_model=task_schema.TaskResponse)
async def create_task(
    task_body: task_schema.TaskCreate,
    db: AsyncSession = Depends(get_db)
):
    return await task_crud.create_task(db, task_body)


@router.put("/order")
async def arrange_tasks(
    tasks_arrange: List[task_schema.TaskArrange],
    db: AsyncSession = Depends(get_db)
):
    await task_crud.update_task_arrange(db, tasks_arrange)
    return {"message": "order updated"}


@router.put("/{task_id}", response_model=task_schema.TaskResponse)
async def update_task(
    task_id: int,
    task_body: task_schema.TaskCreate,
    db: AsyncSession = Depends(get_db)
):
    task = await task_crud.get_task(db, task_id=task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return await task_crud.update_task(db, task_body, original=task)


@router.delete("/{task_id}", status_code=204)
async def delete_task(task_id: int, db: AsyncSession = Depends(get_db)):
    task = await task_crud.get_task(db, task_id=task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return await task_crud.delete_task(db, original=task)
