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

  setEditDate: (value:string) => void;
  setEditTitle: (value:string) => void;
  setEditConcept: (value:string) => void;

  EditConcept: (e: React.SubmitEvent<HTMLFormElement>) =>void;

  reorderTasks: (oldIndex: number, newIndex: number) => void;

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

  setEditDate,
  setEditTitle,
  setEditConcept,

  EditConcept,

  reorderTasks,

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
  <DndContext
    onDragEnd ={handleDragEnd}
  >

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

                setEditDate={setEditDate}
                setEditTitle={setEditTitle}
                setEditConcept={setEditConcept}

                EditConcept={EditConcept}

                />
                
            ))}
    </SortableContext>

  </DndContext>
        
    );
}
