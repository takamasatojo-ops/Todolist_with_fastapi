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

  editDueDate: string;
  editStartDate: string;
  editTitle: string;
  editConcept: string;
  editStartTime: string;
  editEndTime: string;
  editId: number|null;
  editPosition: string|null;

  setEditDueDate: (value:string) => void;
  setEditStartDate: (value:string) => void;
  setEditTitle: (value:string) =>void;
  setEditConcept: (value:string) =>void;
  setEditStartTime: (value:string) =>void;
  setEditEndTime: (value:string) =>void;

  EditConcept: (e: React.SubmitEvent<HTMLFormElement>) =>void;

  CancelEdit:() => void;
  InputResetEdit:() => void;
};

export default function TaskItem({
    task,
    turnCheck,
    startEdit,
    deleteTask,

  editDueDate,
  editStartDate,
  editTitle,
  editConcept,
  editStartTime,
  editEndTime,
  editId,
  editPosition,

  setEditDueDate,
  setEditStartDate,
  setEditTitle,
  setEditConcept,
  setEditStartTime,
  setEditEndTime,

  EditConcept,
  CancelEdit,
  InputResetEdit,

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
                <div className='task-main'>
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
                <span style={{ marginRight: "4px"}}>
                    {task.startDate}
                </span>
                {(task.starttime || task.endtime || (task.dueDate && (task.startDate !== task.dueDate))) && (
                    <>
                        <span style={{ marginRight: "4px"}}>
                            {task.starttime?.slice(0,5)}
                        </span>
                        <span style={{ marginRight: "4px"}}>
                            〜
                        </span>
                        {(task.startDate !== task.dueDate) && (
                        <span style={{ marginRight: "4px"}}>
                            {task.dueDate}
                        </span>
                        )}
                        <span style={{ marginRight: "4px"}}>
                            {task.endtime?.slice(0,5)}
                        </span>
                    </>
                )}
                <span style={{marginLeft:"8px"}}>
                {task.title}
                </span>
                <span style={{color:"rgba(0,0,0,0.5)", margin: "8px"}}>
                    {task.concept}
                </span>
                <button onClick={() => startEdit(task)} style={{marginRight: "4px"}}>
                    修正
                </button>
                <button type ="button" onClick={() => deleteTask(task.id)}
                style={{margin: "8px", color: "red"}}>
                削除
                </button>
                </div>
                <div className='edit-task' style = {{display: editId === task.id && editPosition === "list" ? "block" : "none"}}>
                    <EditTask
                        editDueDate={editDueDate}
                        editStartDate={editStartDate}
                        editTitle={editTitle}
                        editConcept={editConcept}
                        editStartTime={editStartTime}
                        editEndTime={editEndTime}

                        setEditDueDate={setEditDueDate}
                        setEditStartDate={setEditStartDate}
                        setEditTitle={setEditTitle}
                        setEditConcept={setEditConcept}
                        setEditStartTime={setEditStartTime}
                        setEditEndTime={setEditEndTime}

                        EditConcept={EditConcept}
                        CancelEdit={CancelEdit}
                        InputResetEdit={InputResetEdit}
                    />
                </div>
            </li>
  );
}