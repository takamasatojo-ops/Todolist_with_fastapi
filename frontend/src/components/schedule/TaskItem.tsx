import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Task } from "@/types/tasks";
import EditTask from '../edittask/edittask';

type Props = {
  task: Task;
  turnCheck: (id:number) => void;
  startEdit: (task:Task) => void;
  deleteTask: (id:number) => void;

  editDate: string;
  editTitle: string;
  editConcept: string;
  editId: number|null;

  setEditDate: (value:string) => void;
  setEditTitle: (value:string) =>void;
  setEditConcept: (value:string) =>void;

  EditConcept: (e: React.SubmitEvent<HTMLFormElement>) =>void;

  CancelEdit:() => void;
};

export default function TaskItem({
    task,
    turnCheck,
    startEdit,
    deleteTask,

  editDate,
  editTitle,
  editConcept,
  editId,

  setEditDate,
  setEditTitle,
  setEditConcept,

  EditConcept,
  CancelEdit,

}:Props){

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: task.id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

  return (
            <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="task" >
                <span
                style = {{marginLeft: "12px"}}
                 {...listeners}>
                    ≡
                </span>
                <input
                    type = "checkbox"
                    checked = {task.done}
                    onChange = {() => turnCheck(task.id)}
                    style = {{marginLeft: "12px"}}
                />
                <span style={{ marginRight: "8px"}}>
                {task.done ? "完了✅" : "未完了"}
                </span>
                <span style={{ marginRight: "8px"}}>
                    {task.dueDate}
                </span>
                {task.title}
                <span style={{color:"rgba(0,0,0,0.5)", margin: "8px"}}>
                    {task.concept}
                </span>
                <button onClick={() => startEdit(task)} style={{marginRight: "6px", marginBottom: "12px", }}>
                    内容編集
                </button>
                <div className='edit-task' style = {{display: editId === task.id ? "block" : "none"}}>
                    <EditTask
                        editDate={editDate}
                        editTitle={editTitle}
                        editConcept={editConcept}

                        setEditDate={setEditDate}
                        setEditTitle={setEditTitle}
                        setEditConcept={setEditConcept}

                        EditConcept={EditConcept}
                        CancelEdit={CancelEdit}
                    />
                </div>
                <button onClick={() => deleteTask(task.id)} style={{marginBottom: "12px"}}>
                タスク削除
                </button>
            </li>
  );
}