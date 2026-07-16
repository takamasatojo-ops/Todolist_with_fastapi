"use client";

import dynamic from "next/dynamic"

import TaskForm from "@/components/schedule/TaskForm"
import { useTasks } from "@/hooks/useTasks";

const TaskList = dynamic(
  () => import("@/components/schedule/TaskList"),
  {
    ssr:false
  }
);

export default function Home() {
  // useStateでタスクを管理

  const {
        tasks,
        editId,
        editConcept,
        editDate,
        editTitle,
        newTitle,
        newDate,
        newConcept,
        setEditConcept,
        setEditDate,
        setEditTitle,
        setNewDate,
        setNewTitle,
        setNewConcept,
        deleteTask,
        turnCheck,
        startEdit,
        CancelEdit,
        EditConcept,
        AddTask,
        ArrangeTasks,
        reorderTasks,
  } =useTasks()

  return (
    <main>
      <>
        <TaskForm
                tasks={tasks}
                AddTask={AddTask}
                newDate={newDate}
                newTitle={newTitle}
                newConcept={newConcept}

                setNewDate={setNewDate}
                setNewTitle={setNewTitle}
                setNewConcept={setNewConcept}

                ArrangeTasks={ArrangeTasks}
        />
      </>

      <>
        <TaskList
                tasks={tasks}
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
                reorderTasks={reorderTasks}
        />
      </>
    </main>
  );
}