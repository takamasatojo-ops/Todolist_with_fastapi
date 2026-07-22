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
        editStartTime,
        editEndTime,
        newTitle,
        newDate,
        newConcept,
        newStartTime,
        newEndTime,
        newTitleCalendar,
        newDateCalendar,
        newConceptCalendar,
        newStartTimeCalendar,
        newEndTimeCalendar,
        setEditConcept,
        setEditDate,
        setEditTitle,
        setEditStartTime,
        setEditEndTime,
        setNewDate,
        setNewTitle,
        setNewConcept,
        setNewStartTime,
        setNewEndTime,
        setNewDateCalendar,
        setNewTitleCalendar,
        setNewConceptCalendar,
        setNewStartTimeCalendar,
        setNewEndTimeCalendar,
        deleteTask,
        turnCheck,
        startEdit,
        startCalendarEdit,
        CancelEdit,
        EditConcept,
        AddTask,
        AddTaskCalendar,
        ArrangeTasks,
        reorderTasks,
        changeDateCalendar,
        InputResetEdit,
        InputResetAdd,
        InputResetAddCalendar,
  } =useTasks()

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showWarningTimeModal, setShowWarningTimeModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task |null>(null);

  const handleEditConcept = async (
    e: React.SubmitEvent<HTMLFormElement>) => {
      const result = await EditConcept(e);

      if (result==="task"){
      setShowWarningModal(true);
      return;
      }

      if (result==="time"){
        setShowWarningTimeModal(true);
        return;
      }

      setShowEditModal(false);
    };

  const handleAddTask = async (
    e: React.SubmitEvent<HTMLFormElement>) => {
      const result = await AddTask(e);

    if (result==="task"){
    setShowWarningModal(true);
    return;
    }

    if (result==="time"){
      setShowWarningTimeModal(true);
      return;
    }

      setShowAddModal(false);
    };

  const handleAddTaskCalendar = async (
    e: React.SubmitEvent<HTMLFormElement>) => {
      const result = await AddTaskCalendar(e);

    if (result==="task"){
    setShowWarningModal(true);
    return;
    }

    if (result==="time"){
      setShowWarningTimeModal(true);
      return;
    }

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
                AddTask={handleAddTaskCalendar}
                newDate={newDateCalendar}
                newTitle={newTitleCalendar}
                newConcept={newConceptCalendar}
                newStartTime={newStartTimeCalendar}
                newEndTime={newEndTimeCalendar}

                setNewDate={setNewDateCalendar}
                setNewTitle={setNewTitleCalendar}
                setNewConcept={setNewConceptCalendar}
                setNewStartTime={setNewStartTimeCalendar}
                setNewEndTime={setNewEndTimeCalendar}
                InputResetAdd={InputResetAddCalendar}

          />
        <button type ="button" onClick={cancelAdd} style={{marginLeft: "8px"}}>
        追加を取消
        </button>
        </div>
      )}
      <>
        <TaskForm
                tasks={tasks}
                AddTask={handleAddTask}
                newDate={newDate}
                newTitle={newTitle}
                newConcept={newConcept}
                newStartTime={newStartTime}
                newEndTime={newEndTime}

                setNewDate={setNewDate}
                setNewTitle={setNewTitle}
                setNewConcept={setNewConcept}
                setNewStartTime={setNewStartTime}
                setNewEndTime={setNewEndTime}

                InputResetAdd={InputResetAdd}

        />
      </>
      {showEditModal && (
        <div className="modal">
          <TaskEdit
              editDate={editDate}
              editTitle={editTitle}
              editConcept={editConcept}
              editStartTime={editStartTime}
              editEndTime={editEndTime}

              setEditDate={setEditDate}
              setEditTitle={setEditTitle}
              setEditConcept={setEditConcept}
              setEditStartTime={setEditStartTime}
              setEditEndTime={setEditEndTime}

              EditConcept={handleEditConcept}
              CancelEdit={cancelEdit}
              InputResetEdit={InputResetEdit}
          />
          <button type ="button" onClick={() => {
            if(selectedTask){
              deleteTask(selectedTask.id);
              CancelEdit();
              setShowEditModal(false);
            }
          }}
          style={{marginLeft: "8px", color: "red", fontWeight: "bold"}}>
          削除
          </button>
          </div>
      )}
        {showWarningModal && (
        <div className="warning">
          <div>タスクと日付は両方とも入力してください</div>
          <button type = "button" onClick={() => {
            {
              setShowWarningModal(false);
            }
          }}>
            OK
          </button>
        </div>
        )}
        {showWarningTimeModal && (
          <div className="warning-time">
            <div>終了時刻は開始時刻よりも後の時間にしてください</div>
          <button type = "button" onClick={() => {
            {
              setShowWarningTimeModal(false);
            }
          }}>
            OK
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
                editStartTime={editStartTime}
                editEndTime={editEndTime}
                editId={editId}
                editPosition={editPosition}

                setEditDate={setEditDate}
                setEditTitle={setEditTitle}
                setEditConcept={setEditConcept}
                setEditStartTime={setEditStartTime}
                setEditEndTime={setEditEndTime}

                EditConcept={handleEditConcept}
                reorderTasks={reorderTasks}

                ArrangeTasks={ArrangeTasks}
                InputResetEdit={InputResetEdit}
        />
        <TaskCalendar
                tasks={tasks}
                startEdit={startCalendarEdit}
                setNewDate={setNewDateCalendar}
                setShowEditModal={setShowEditModal}
                setShowAddModal={setShowAddModal}
                setSelectedTask={setSelectedTask}
                changeDateCalendar={changeDateCalendar}
        />
      </div>
    </main>
  );
}