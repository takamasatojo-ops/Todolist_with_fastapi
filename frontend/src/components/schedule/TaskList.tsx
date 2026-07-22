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
  editStartTime: string;
  editEndTime: string;

  setEditDate: (value:string) => void;
  setEditTitle: (value:string) => void;
  setEditConcept: (value:string) => void;
  setEditStartTime: (value:string) => void;
  setEditEndTime: (value:string) => void;

  EditConcept: (e: React.SubmitEvent<HTMLFormElement>) =>void;

  reorderTasks: (oldIndex: number, newIndex: number) => void;

  ArrangeTasks: () => void;
  InputResetEdit: () => void;

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
  editStartTime,
  editEndTime,
  editId,
  editPosition,

  setEditDate,
  setEditTitle,
  setEditConcept,
  setEditStartTime,
  setEditEndTime,

  EditConcept,

  reorderTasks,

  ArrangeTasks,
  InputResetEdit,

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
    <div>
    <button type = "button" onClick={ArrangeTasks} style = {{margin: "8px"}}>タスクリストを日付順に入れ替える</button>
    </div>
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
                editStartTime={editStartTime}
                editEndTime={editEndTime}
                editId={editId}
                editPosition={editPosition}

                setEditDate={setEditDate}
                setEditTitle={setEditTitle}
                setEditConcept={setEditConcept}
                setEditStartTime={setEditStartTime}
                setEditEndTime={setEditEndTime}

                EditConcept={EditConcept}
                InputResetEdit={InputResetEdit}
                />

              ))}
      </SortableContext>

    </DndContext>
  </div>
    );
}
