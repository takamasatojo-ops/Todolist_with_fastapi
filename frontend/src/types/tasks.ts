
export type Task = {
  id: number;        // 一意のID
  title: string;     // タスク内容
  concept: string | null;  //タスク内容
  dueDate: string | null;
  done:boolean
  taskOrder:number
};


export type ApiTask = {
  id: number;        // 一意のID
  title: string;     // タスク内容
  concept: string | null;  //タスク内容
  due_date: string | null;
  done:boolean
  task_order:number
};