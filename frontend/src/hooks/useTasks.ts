import { useEffect, useState } from "react";


import { Task } from "@/types/tasks";


export function useTasks(){

  const [editId, setEditId] = useState<number | null>(null);
  const [editConcept, setEditConcept] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [editPosition, setEditPosition] = useState("");
  const [newConcept, setNewConcept] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [newConceptCalendar, setNewConceptCalendar] = useState("");
  const [newTitleCalendar, setNewTitleCalendar] = useState("");
  const [newDateCalendar, setNewDateCalendar] = useState("");
  const [newStartTimeCalendar, setNewStartTimeCalendar] = useState("");
  const [newEndTimeCalendar, setNewEndTimeCalendar] = useState("");

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
        starttime: task.starttime,
        endtime: task.endtime,
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
            starttime: task.starttime,
            endtime: task.endtime,
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
    setEditTitle(task.title)
    setEditConcept(task.concept ?? "")
    setEditDate(task.dueDate ?? "")
    setEditStartTime(task.starttime ?? "")
    setEditEndTime(task.endtime ?? "")
    setEditPosition("list")
  }

  const startCalendarEdit = (task:Task) => {
    setEditId(task.id)
    setEditTitle(task.title)
    setEditConcept(task.concept ?? "")
    setEditDate(task.dueDate ?? "")
    setEditStartTime(task.starttime ?? "")
    setEditEndTime(task.endtime ?? "")
    setEditPosition("calender")
  }

  const CancelEdit = () => {
    setEditId(null)
    setEditConcept("")
    setEditDate("")
    setEditTitle("")
    setEditStartTime("")
    setEditEndTime("")
  }

  const InputResetEdit = () => {
    setEditConcept("")
    setEditDate("")
    setEditTitle("")
    setEditStartTime("")
    setEditEndTime("")
  }

  const InputResetAdd = () => {
    setNewDate("");
    setNewTitle("");
    setNewConcept("");
    setNewStartTime("");
    setNewEndTime("");
  }

  const InputResetAddCalendar = () => {
    setNewDateCalendar("");
    setNewTitleCalendar("");
    setNewConceptCalendar("");
    setNewStartTimeCalendar("");
    setNewEndTimeCalendar("");
  }

  const EditConcept = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editTitle.trim()) {
      return "task";
    };

    if (!editDate.trim()) {
      return "task";
    };

    if ((editStartTime.trim() && editEndTime.trim()) && (editStartTime>editEndTime)) {
      return "time";
    }
    
    if (editId===null) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dueDate: editDate.trim(),
            title: editTitle.trim(),
            concept: editConcept.trim(),
            starttime: editStartTime.trim() || null,
            endtime: editEndTime.trim() || null,
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
        starttime: editTask.starttime,
        endtime: editTask.endtime,
        done: editTask.done,
        taskOrder: editTask.taskOrder
        }: task
      )
    );

    setEditId(null);
    setEditConcept("");
    setEditDate("");
    setEditTitle("")
    setEditStartTime("")
    setEditEndTime("")
  };

  //フォーム送信時に呼び出される関数
  const AddTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      return "task";
    }
    if (!newDate.trim()) {
      return "task";
    }

    if ((newStartTime.trim() && newEndTime.trim()) && (newStartTime>newEndTime)) {
      return "time";
    }

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
            concept: newConcept.trim(),
            starttime: newStartTime.trim() || null,
            endtime: newEndTime.trim() || null,
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
        starttime: newTask.starttime,
        endtime: newTask.endtime,
        done: newTask.done,
        taskOrder: newTask.taskOrder
      };

    setTasks((prev) => [...prev, formattedTask]);

    setNewDate("");
    setNewTitle("");
    setNewConcept("");
    setNewStartTime("");
    setNewEndTime("");
  };

  const AddTaskCalendar = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitleCalendar.trim()) {
      return "task";
    }
    if (!newDateCalendar.trim()) {
      return "task";
    }


    if ((newStartTimeCalendar.trim() && newEndTimeCalendar.trim()) && (newStartTimeCalendar>newEndTimeCalendar)) {
      return "time";
    }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dueDate: newDateCalendar.trim(),
            title: newTitleCalendar.trim(),
            concept: newConceptCalendar.trim(),
            starttime: newStartTimeCalendar.trim() || null,
            endtime: newEndTimeCalendar.trim() || null,
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
        starttime: newTask.starttime,
        endtime: newTask. endtime,
        done: newTask.done,
        taskOrder: newTask.taskOrder
      };

    setTasks((prev) => [...prev, formattedTask]);

    setNewDateCalendar("");
    setNewTitleCalendar("");
    setNewConceptCalendar("");
    setNewStartTimeCalendar("");
    setNewEndTimeCalendar("");
  };

  const changeDateCalendar = async (
    id:number,
    date:string
  ) => {

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
            dueDate: date,
            title: task.title,
            concept: task.concept,
            starttime: task.starttime,
            endtime: task.endtime,
            done: task.done,
            taskOrder: task.taskOrder
          }),
        }
      );

      if (!res.ok) {
        throw new Error("日付変更処理に失敗しました");
      }

    setTasks((prev) =>
        prev.map((task) =>
            task.id === id
            ? {...task, dueDate:date} :task
        )
    );
  };

    return {
        tasks,
        editId,
        editConcept,
        editTitle,
        editDate,
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
    };
}