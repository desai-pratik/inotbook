import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNotes = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const hendelClick = (e) => {
    e.preventDefault();
    addNote(note);
    props.showAlert("Add Note successfully.", "success");
    setNote({ title: "", description: "", tag: "" })
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form className="col-md-5 mx-auto">
        <h4>Add Notes</h4>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            id="title"
            name="title"
            minLength={6} required
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="Description"
            placeholder="Description"
            name="description"
            minLength={6} required
            value={note.description}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            placeholder="Teg"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button type="" disabled={note.title.length < 6 || note.description.length < 6} onClick={hendelClick} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
