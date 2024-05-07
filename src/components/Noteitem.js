import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title} </h5>
          <p className="card-text m-0">{note.description}</p>
          <span className="text-secondary form-text">{note.tag}</span>
          <div className="d-flex justify-content-between">
            <i className="bi bi-trash3" onClick={()=>{deleteNote(note._id);  props.showAlert("Delete Note successfully.", "success");}}></i>
            <i className="bi bi-pencil-square" onClick={() => {updateNote(note)}}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
