"use client";

import dynamic from "next/dynamic"
import React, { useState } from "react";

import TaskForm from "@/components/schedule/TaskForm"
import { useTasks } from "@/hooks/useTasks";

import TaskCalendar from "@/components/calendar/calendar"

import TaskEdit from '@/components/edittask/edittask';

import { Task } from "@/types/tasks";

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
        editPosition,
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
        startCalendarEdit,
        CancelEdit,
        EditConcept,
        AddTask,
        ArrangeTasks,
        reorderTasks,
        changeDateCalendar,
  } =useTasks()

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task |null>(null);

  const handleEditConcept = async (
    e: React.SubmitEvent<HTMLFormElement>) => {
      await EditConcept(e);

      setShowEditModal(false);
    };

  const handleAddTask = async (
    e: React.SubmitEvent<HTMLFormElement>) => {
      await AddTask(e);

      setShowAddModal(false);
    };

  const cancelEdit = () => {
    CancelEdit();
    setShowEditModal(false);
  }

  const cancelAdd = () => {
    setShowAddModal(false);
  }

  return (
    <main>
      {showAddModal && (
        <div className="add">
          <TaskForm
                tasks={tasks}
                AddTask={handleAddTask}
                newDate={newDate}
                newTitle={newTitle}
                newConcept={newConcept}

                setNewDate={setNewDate}
                setNewTitle={setNewTitle}
                setNewConcept={setNewConcept}

          />
        <button type ="button" onClick={cancelAdd} style={{marginLeft: "8px"}}>
        追加取消
        </button>
        </div>
      )}
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
        />
      </>
      {showEditModal && (
        <div className="modal">
          <TaskEdit
              editDate={editDate}
              editTitle={editTitle}
              editConcept={editConcept}

              setEditDate={setEditDate}
              setEditTitle={setEditTitle}
              setEditConcept={setEditConcept}

              EditConcept={handleEditConcept}
              CancelEdit={cancelEdit}
          />
          <button type ="button" onClick={() => {
            if(selectedTask){
              deleteTask(selectedTask.id);
              CancelEdit();
              setShowEditModal(false);
            }
          }}
          style={{marginLeft: "8px"}}>
          タスク削除
          </button>
          </div>
      )}
      <div className="content-layout">
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
                editPosition={editPosition}

                setEditDate={setEditDate}
                setEditTitle={setEditTitle}
                setEditConcept={setEditConcept}

                EditConcept={EditConcept}
                reorderTasks={reorderTasks}

                ArrangeTasks={ArrangeTasks}
        />
        <TaskCalendar
                tasks={tasks}
                startEdit={startCalendarEdit}
                setNewDate={setNewDate}
                setShowEditModal={setShowEditModal}
                setShowAddModal={setShowAddModal}
                setSelectedTask={setSelectedTask}
                changeDateCalendar={changeDateCalendar}
        />
      </div>
    </main>
  );
}