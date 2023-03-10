import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Main = ({ activeNote, onUpdateNote, onSaveNote, setActiveNote }) => {
  const [activeNoteText, setActiveNoteText] = useState({
    title: "",
    body: "",
  });
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    if (activeNote) {
      setActiveNoteText({ title: activeNote.title, body: activeNote.body });
      setIsEditing(false);
    } else {
      setActiveNoteText({ title: "", body: "" });
      setIsEditing(true);
    }
  }, [activeNote]);

  function handleSaveNote() {
    const updatedNote = {
      ...activeNote,
      title: activeNoteText.title,
      body: activeNoteText.body,
      lastModified: Date.now(),
    };
    onSaveNote(updatedNote);
    setIsEditing(false);
    navigate(`/note/${activeNote.id}`);
  }

  function handleEditNote() {
    setIsEditing(true);
    navigate(`/note/${activeNote.id}/edit`); 
  }

  function handleDateChange(event) {
    setDate(event.target.value);
  }
  function deletButton({
    onDeleteNote
  })
  {}

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <div className="edit">
      {activeNote ? (
          isEditing ? (
            <button onClick={handleSaveNote}>Save</button>
          ) : (
            <button onClick={handleEditNote}>Edit</button>
          )
        ) : null}
        </div>
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNoteText.title}
          onChange={(e) =>
            setActiveNoteText({
              ...activeNoteText,
              title: e.target.value,
            })
          }
          disabled={!isEditing}
        />
         
  <div className="date-size">
    <label htmlFor="date-input"></label>
    <input
      id="date-input"
      type="datetime-local"
      style={{ border: "none", outline: "none", paddingLeft: "5px" , fontSize: "15px"}}
      value={date}
      onChange={handleDateChange}
    />
  </div>


        <ReactQuill
          value={activeNoteText.body}
          onChange={(value) =>
            setActiveNoteText({ ...activeNoteText, body: value })
          }
          readOnly={!isEditing}
        />
      
     
      </div>
    </div>
  );
};

export default Main;
