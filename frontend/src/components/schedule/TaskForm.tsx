import { Task } from "@/types/tasks";

import React, { useState } from "react";


type Props = {
  tasks: Task[];
  AddTask: (e: React.SubmitEvent<HTMLFormElement>) =>void;

  newStartDate: string;
  newDueDate: string;
  newTitle: string;
  newConcept: string;
  newStartTime: string;
  newEndTime: string;

  setNewDueDate: (value:string) => void;
  setNewStartDate: (value:string) => void;
  setNewTitle: (value:string) => void;
  setNewConcept: (value:string) => void;
  setNewStartTime: (value:string) => void;
  setNewEndTime: (value:string) => void;

  InputResetAdd: () => void;

};

export default function TaskList({

  AddTask,

  newDueDate,
  newStartDate,
  newTitle,
  newConcept,
  newStartTime,
  newEndTime,

  setNewDueDate,
  setNewStartDate,
  setNewTitle,
  setNewConcept,
  setNewStartTime,
  setNewEndTime,

  InputResetAdd,

}:Props){

    const [MultiDay, setMultiDay] = useState(false);

    // const TurnTaskForm()

    return (
        <>
            {MultiDay && (
            <form onSubmit = {AddTask} style = {{marginBottom: "8px"}} className="todo-form">
                <input
                    type = "date"
                    placeholder = "開始日"
                    value = {newStartDate}
                    onChange = {(e) => setNewStartDate(e.target.value)}
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
                    type = "date"
                    placeholder = "終了日"
                    value = {newDueDate}
                    onChange = {(e) => setNewDueDate(e.target.value)}
                    style = {{padding: "8px", margin: "8px", width: "100px" }}
                />
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
                <span style = {{marginLeft:"8px"}}>
                複数日指定➡️
                </span>
                <input
                    type = "checkbox"
                    checked = {MultiDay}
                    onChange = {() => setMultiDay(false)}
                    style = {{marginLeft: "4px"}}
                />
            </form>
            )}
            {!MultiDay && (
            <form onSubmit = {AddTask} style = {{marginBottom: "8px"}} className="todo-form">
                <input
                    type = "date"
                    placeholder = "期日"
                    value = {newStartDate}
                    onChange = {(e) => setNewStartDate(e.target.value)}
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
                <span style = {{marginLeft:"8px"}}>
                複数日指定➡️
                </span>
                <input
                    type = "checkbox"
                    checked = {MultiDay}
                    onChange = {() => setMultiDay(true)}
                    style = {{marginLeft: "4px"}}
                />
            </form>
            )}
        </>
    );
}
