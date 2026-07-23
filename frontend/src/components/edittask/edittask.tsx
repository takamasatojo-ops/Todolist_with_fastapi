import React, { useState } from "react";

type Props = {
  editDueDate: string;
  editStartDate: string;
  editTitle: string;
  editConcept: string;
  editStartTime: string;
  editEndTime: string;

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

export default function EditTask({
  editDueDate,
  editStartDate,
  editTitle,
  editConcept,
  editStartTime,
  editEndTime,

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

  const [MultiDay, setMultiDay] = useState(editDueDate!==editStartDate);

  return (
    <>
    {MultiDay && (
    <form onSubmit = {EditConcept} style = {{marginBottom: "16px" }}>
        <input
            type = "date"
            placeholder = "開始日"
            value = {editStartDate}
            onChange = {(e) => setEditStartDate(e.target.value)}
            style = {{padding: "8px", marginRight: "8px", width: "100px" }}
        />
        <input
            type = "time"
            placeholder = "開始時刻"
            value = {editStartTime}
            onChange = {(e) => setEditStartTime(e.target.value)}
            style = {{padding: "8px", marginRight: "8px", width: "65px" }}
        />
        <span style={{marginRight: "8px"}}>
        〜
        </span>
        <input
            type = "date"
            placeholder = "終了日"
            value = {editDueDate}
            onChange = {(e) => setEditDueDate(e.target.value)}
            style = {{padding: "8px", marginRight: "8px", width: "100px" }}
        />
        <input
            type = "time"
            placeholder = "終了時刻"
            value = {editEndTime}
            onChange = {(e) => setEditEndTime(e.target.value)}
            style = {{padding: "8px", marginRight: "8px", width: "65px" }}
        />
        <input
            type = "text"
            placeholder = "タスク修正"
            value = {editTitle}
            onChange = {(e) => setEditTitle(e.target.value)}
            style = {{padding: "8px", margin: "8px", width: "200px" }}
        />
        <input
            type = "text"
            placeholder = "タスクの内容"
            value = {editConcept}
            onChange = {(e) => setEditConcept(e.target.value)}
            style = {{padding: "8px", marginRight: "8px", width: "400px" }}
        />
        <button type ="button" onClick={InputResetEdit} style={{marginLeft: "8px"}}>
        入力リセット
        </button>
        <button type = "submit">保存</button>
                <span style = {{marginLeft:"8px"}}>
                複数日指定➡️
                </span>
                <input
                    type = "checkbox"
                    checked = {MultiDay}
                    onChange = {() => {setMultiDay(false); setEditDueDate(editStartDate)}}
                    style = {{marginLeft: "4px"}}
                />
        <button type ="button" onClick={CancelEdit} style={{marginLeft: "4px"}}>
        戻る
        </button>
    </form>
    )}
    {!MultiDay && (
    <form onSubmit = {EditConcept} style = {{marginBottom: "16px" }}>
        <input
            type = "date"
            placeholder = "日付変更"
            value = {editStartDate}
            onChange = {(e) => {setEditStartDate(e.target.value); setEditDueDate(e.target.value)}}
            style = {{padding: "8px", marginRight: "8px", width: "100px" }}
        />
        <input
            type = "time"
            placeholder = "開始時刻"
            value = {editStartTime}
            onChange = {(e) => setEditStartTime(e.target.value)}
            style = {{padding: "8px", marginRight: "8px", width: "65px" }}
        />
        <span style={{marginRight: "8px"}}>
        〜
        </span>
        <input
            type = "time"
            placeholder = "終了時刻"
            value = {editEndTime}
            onChange = {(e) => setEditEndTime(e.target.value)}
            style = {{padding: "8px", marginRight: "8px", width: "65px" }}
        />
        <input
            type = "text"
            placeholder = "タスク修正"
            value = {editTitle}
            onChange = {(e) => setEditTitle(e.target.value)}
            style = {{padding: "8px", margin: "8px", width: "200px" }}
        />
        <input
            type = "text"
            placeholder = "タスクの内容"
            value = {editConcept}
            onChange = {(e) => setEditConcept(e.target.value)}
            style = {{padding: "8px", marginRight: "8px", width: "400px" }}
        />
        <button type ="button" onClick={InputResetEdit} style={{marginLeft: "8px"}}>
        入力リセット
        </button>
        <button type = "submit">保存</button>
                <span style = {{marginLeft:"8px"}}>
                複数日指定➡️
                </span>
                <input
                    type = "checkbox"
                    checked = {MultiDay}
                    onChange = {() => {setMultiDay(true); setEditDueDate(editDueDate)}}
                    style = {{marginLeft: "4px"}}
                />
        <button type ="button" onClick={CancelEdit} style={{marginLeft: "4px"}}>
        戻る
        </button>
    </form>
    )}
    </>
  );
}