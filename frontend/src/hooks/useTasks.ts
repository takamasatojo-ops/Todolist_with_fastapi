import { useEffect, useState } from "react";


import { Task } from "@/types/tasks";

export function useTasks(){

  const [editId, setEditId] = useState<number | null>(null);
  const [editConcept, setEditConcept] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {

    const fetchTasks = async() => {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`
      );

      const data:Task[] = await res.json();

      const formattedTasks:Task[] = data.map((task) => ({
        id: task.id,
        title: task.title,
        concept: task.concept,
        dueDate: task.dueDate,
        done: task.done,
        taskOrder: task.taskOrder,
      }))

      setTasks(formattedTasks);
    };

    fetchTasks();
  },[]);


  const reorderTasks = async(
    oldIndex:number,
    newIndex:number
  )=> {

    const newTasks: Task[] = [...tasks];

    const[movedTask] = newTasks.splice(oldIndex,1);

    newTasks.splice(newIndex,0,movedTask);

    const updatedTasks: Task[] = newTasks.map((task, index) => ({
        ...task,
        taskOrder: index,
      }));
    

    setTasks(updatedTasks);


       const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/order`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            updatedTasks.map(task=>({
            id: task.id,
            taskOrder: task.taskOrder
              }))
            )
          }
        );

      if (!res.ok) {
        throw new Error("並び替えに失敗しました");
      }

  };


  const ArrangeTasks = async() => {

      const sortedTasks: Task[] = [...tasks].sort((a, b) =>
      a.dueDate.localeCompare(b.dueDate)
      );

      const updatedTasks: Task[] = sortedTasks.map((task, index) => ({
        ...task,
        taskOrder: index,
      }));


      setTasks(updatedTasks);

       const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/order`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            updatedTasks.map(task=>({
            id: task.id,
            taskOrder: task.taskOrder
            }))
          )
        }
      );

      if (!res.ok) {
        throw new Error("並び替えに失敗しました");
      }

  };

    const deleteTask = async (id:number) => {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("削除に失敗しました");
      }

        setTasks((prev) =>
            prev.filter((task) => task.id !== id)
        );
    };

  const turnCheck = async (id:number) => {

    const task =tasks.find(
      task => task.id ===id
    );

    if(!task) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dueDate: task.dueDate,
            title: task.title,
            concept: task.concept,
            done: !task.done,
            taskOrder: task.taskOrder
          }),
        }
      );

      if (!res.ok) {
        throw new Error("タスク完了処理に失敗しました");
      }

    const checkTask:Task = await res.json();

    setTasks((prev) =>
        prev.map((task) =>
            task.id === id
            ? {...task, done: checkTask.done} :task
        )
    );
  }

  const startEdit = (task:Task) => {
    setEditId(task.id)
    setNewTitle(task.title)
    setEditConcept(task.concept ?? "")
    setNewDate(task.dueDate ?? "")
  }

  const EditConcept = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitle.trim()) return;
    if (!newDate.trim()) return;
    if (editId===null) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dueDate: newDate.trim(),
            title: newTitle.trim(),
            concept: editConcept.trim(),
            done: false,
            taskOrder: 0
          }),
        }
      );

      if (!res.ok) {
        throw new Error("編集に失敗しました");
      }

    const editTask: Task = await res.json();

    setTasks((prev) =>
        prev.map((task) =>
            task.id===editId
            ? {
        id: editTask.id,
        title: editTask.title,
        dueDate: editTask.dueDate,
        concept: editTask.concept,
        done: editTask.done,
        taskOrder: editTask.taskOrder
        }: task
      )
    );

    setEditId(null);
    setEditConcept("");
    setNewDate("");
    setNewTitle("")
  };

  //フォーム送信時に呼び出される関数
  const AddTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitle.trim()) return;
    if (!newDate.trim()) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dueDate: newDate.trim(),
            title: newTitle.trim(),
            concept: editConcept.trim(),
            done: false,
            taskOrder: tasks.length
          }),
        }
      );

      if (!res.ok) {
        throw new Error("タスク追加に失敗しました");
      }

      const newTask:Task = await res.json();

      const formattedTask:Task = {
        id: newTask.id,
        title: newTask.title,
        dueDate: newTask.dueDate,
        concept: newTask.concept,
        done: newTask.done,
        taskOrder: newTask.taskOrder
      };

    setTasks((prev) => [...prev, formattedTask]);

    setNewDate("");
    setNewTitle("");
    setEditConcept("");
  };

    return {
        tasks,
        editId,
        editConcept,
        newTitle,
        newDate,
        setEditConcept,
        setNewDate,
        setNewTitle,
        deleteTask,
        turnCheck,
        startEdit,
        EditConcept,
        AddTask,
        ArrangeTasks,
        reorderTasks,
    };
}