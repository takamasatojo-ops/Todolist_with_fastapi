import { Task } from "@/types/tasks";


type Props = {
  tasks: Task[];
  AddTask: (e: React.SubmitEvent<HTMLFormElement>) =>void;

  newDate: string;
  newTitle: string;
  newConcept: string;

  setNewDate: (value:string) => void;
  setNewTitle: (value:string) => void;
  setNewConcept: (value:string) => void;


};

export default function TaskList({

  AddTask,

  newDate,
  newTitle,
  newConcept,

  setNewDate,
  setNewTitle,
  setNewConcept,

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
                <button type = "submit">追加</button>
            </form>
        </>
    );
}
