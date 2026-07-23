
export type Task = {
  id: number;        // 一意のID
  title: string;
  concept: string | null;
  startDate: string | null;
  dueDate: string | null;
  done: boolean
  taskOrder: number
  starttime: string | null;
  endtime: string | null;
};

