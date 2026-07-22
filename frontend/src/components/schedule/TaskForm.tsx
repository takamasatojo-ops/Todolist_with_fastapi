import { Task } from "@/types/tasks";


type Props = {
  tasks: Task[];
  AddTask: (e: React.SubmitEvent<HTMLFormElement>) =>void;

  newDate: string;
  newTitle: string;
  newConcept: string;
  newStartTime: string;
  newEndTime: string;

  setNewDate: (value:string) => void;
  setNewTitle: (value:string) => void;
  setNewConcept: (value:string) => void;
  setNewStartTime: (value:string) => void;
  setNewEndTime: (value:string) => void;

  InputResetAdd: () => void;

};

export default function TaskList({

  AddTask,

  newDate,
  newTitle,
  newConcept,
  newStartTime,
  newEndTime,

  setNewDate,
  setNewTitle,
  setNewConcept,
  setNewStartTime,
  setNewEndTime,

  InputResetAdd,

}:Props){

    return (
        <>
            <form onSubmit = {AddTask} style = {{marginBottom: "8px"}} className="todo-form">
                <input
                    type = "date"
                    placeholder = "期日"
                    value = {newDate}
                    onChange = {(e) => setNewDate(e.target.value)}
                    style = {{padding: "8px", margin: "8px", width: "100px" }}
                />
                <input
                    type = "time"
                    placeholder = "開始時刻"
                    value = {newStartTime}
                    onChange = {(e) => setNewStartTime(e.target.value)}
                    style = {{padding: "8px", margin: "8px", width: "65px" }}
                />
                〜
                <input
                    type = "time"
                    placeholder = "終了時刻"
                    value = {newEndTime}
                    onChange = {(e) => setNewEndTime(e.target.value)}
                    style = {{padding: "8px", margin: "8px", width: "65px" }}
                />
                <input
                    type = "text"
                    placeholder = "新しいタスクを入力"
                    value = {newTitle}
                    onChange = {(e) => setNewTitle(e.target.value)}
                    style = {{padding: "8px", margin: "8px", width: "200px" }}
                />
                <input
                    type = "text"
                    placeholder = "タスクの内容"
                    value = {newConcept}
                    onChange = {(e) => setNewConcept(e.target.value)}
                    style = {{padding: "8px", marginRight: "8px", width: "400px" }}
                />
                <button type ="button" onClick={InputResetAdd} style={{marginLeft: "8px"}}>
                入力値リセット
                </button>
                <button type = "submit" >追加</button>
            </form>
        </>
    );
}
