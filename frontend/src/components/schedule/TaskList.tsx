"use client";

import {
  DndContext,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
} from '@dnd-kit/sortable';

import TaskItem from "./TaskItem";
import { Task } from "@/types/tasks";

type Props = {
  tasks: Task[];
  turnCheck: (id:number) => void;
  startEdit: (task:Task) => void;
  CancelEdit: () => void;
  deleteTask: (id:number) => void;

  editDate: string;
  editTitle: string;
  editConcept: string;
  editId: number|null;
  editPosition: string;

  setEditDate: (value:string) => void;
  setEditTitle: (value:string) => void;
  setEditConcept: (value:string) => void;

  EditConcept: (e: React.SubmitEvent<HTMLFormElement>) =>void;

  reorderTasks: (oldIndex: number, newIndex: number) => void;

  ArrangeTasks: () => void;

};

export default function TaskList({
    tasks,
    turnCheck,
    startEdit,
    CancelEdit,
    deleteTask,

  editDate,
  editTitle,
  editConcept,
  editId,
  editPosition,

  setEditDate,
  setEditTitle,
  setEditConcept,

  EditConcept,

  reorderTasks,

  ArrangeTasks,

}:Props){

  const handleDragEnd = (event: DragEndEvent) => {

    const {
        active,
        over
    } = event;

    if(!over) return;

    if(active.id !== over.id){

        const oldIndex =
        tasks.findIndex(
            task => task.id === active.id
        );

        const newIndex =
        tasks.findIndex(
            task => task.id === over.id
        );

        reorderTasks(
            oldIndex,
            newIndex
        );
    }
  }

  return (

  <div className="task-list">
    <button type = "button" onClick={ArrangeTasks} style = {{marginBottom: "16px"}}>タスクリストを日付順に入れ替える</button>
    <DndContext onDragEnd ={handleDragEnd}>

      <SortableContext items={tasks}>
              {tasks.map((task)=>(
                <TaskItem
                key={task.id}
                task={task}
                turnCheck={turnCheck}
                startEdit={startEdit}
                CancelEdit={CancelEdit}
                deleteTask={deleteTask}
                editDate={editDate}
                editTitle={editTitle}
                editConcept={editConcept}
                editId={editId}
                editPosition={editPosition}

                setEditDate={setEditDate}
                setEditTitle={setEditTitle}
                setEditConcept={setEditConcept}

                EditConcept={EditConcept}
                />

              ))}
      </SortableContext>

    </DndContext>
  </div>
    );
}
