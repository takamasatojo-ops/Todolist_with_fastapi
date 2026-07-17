type Props = {

  editDate: string;
  editTitle: string;
  editConcept: string;

  setEditDate: (value:string) => void;
  setEditTitle: (value:string) =>void;
  setEditConcept: (value:string) =>void;

  EditConcept: (e: React.SubmitEvent<HTMLFormElement>) =>void;
  CancelEdit:() => void;
};

export default function EditTask({

  editDate,
  editTitle,
  editConcept,

  setEditDate,
  setEditTitle,
  setEditConcept,

  EditConcept,
  CancelEdit,

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
            type = "text"
            placeholder = "タスク修正"
            value = {editTitle}
            onChange = {(e) => setEditTitle(e.target.value)}
            style = {{padding: "8px", margin: "8px", width: "200px" }}
        />
        <input
            type = "text"
            placeholder = "内容の編集"
            value = {editConcept}
            onChange = {(e) => setEditConcept(e.target.value)}
            style = {{padding: "8px", marginRight: "8px", width: "400px" }}
        />
        <button type = "submit">編集保存</button>
        <button type ="button" onClick={CancelEdit} style={{marginLeft: "8px"}}>
        編集取消
        </button>
    </form>
  );
}