type Props = {
  editDate: string;
  editTitle: string;
  editConcept: string;
  editStartTime: string;
  editEndTime: string;

  setEditDate: (value:string) => void;
  setEditTitle: (value:string) =>void;
  setEditConcept: (value:string) =>void;
  setEditStartTime: (value:string) =>void;
  setEditEndTime: (value:string) =>void;

  EditConcept: (e: React.SubmitEvent<HTMLFormElement>) =>void;
  CancelEdit:() => void;
  InputResetEdit:() => void;
};

export default function EditTask({
  editDate,
  editTitle,
  editConcept,
  editStartTime,
  editEndTime,

  setEditDate,
  setEditTitle,
  setEditConcept,
  setEditStartTime,
  setEditEndTime,

  EditConcept,
  CancelEdit,
  InputResetEdit,

}:Props){


  return (
    <form onSubmit = {EditConcept} style = {{marginBottom: "16px" }}>
        <input
            type = "date"
            placeholder = "日付変更"
            value = {editDate}
            onChange = {(e) => setEditDate(e.target.value)}
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
        <button type ="button" onClick={CancelEdit}>
        戻る
        </button>
    </form>
  );
}