import { useEffect, useState } from "react";
import "./App.css";
import Main from "./Main";

import Sidebar from "./Sidebar";

import { useNavigate } from 'react-router-dom';
import React from "react";
function Layout() {
  const [notes, setNotes] = useState(
    localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : []
  );
  const [activeNote, setActiveNote] = useState(false);
  const [isListVisible, setIsListVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function handleAddNote() {
    const newNote = {
      id: notes.length + 1, 
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    navigate(`/note/${newNote.id}/edit`);
 
  }
  
  
  function handleDeleteNote (noteId) {
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    setNotes(filteredNotes);
    setActiveNote(false);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
    navigate(`/`);
  }
  
  function onUpdateNote (updatedNote, notes, setNotes) {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
  
      return note;
    });
  
    setNotes(updatedNotesArr);
    localStorage.setItem("notes", JSON.stringify(updatedNotesArr));
  }
  
  function onSaveNote  (note){
    const updatedNotesArr = notes.map((n) => {
      if (n.id === note.id) {
        return note;
      }
      return n;
    });
    setNotes(updatedNotesArr);
    localStorage.setItem("notes", JSON.stringify(updatedNotesArr));
    navigate(`/note/${note.id}/edit`);
  };

  function getActiveNote() {
    return notes.find(({ id }) => id === activeNote);
  }

  return (
    <div>
      <div className="top-bar">
        <div className="top-bar-buttons">
          <button
            id="list"
            onClick={() => setIsListVisible(!isListVisible)}
          >
            ≡
          </button>
        </div>
        <div className="top-title">
          <h1>Lotion</h1>
          <p>like notion but worse</p>
        </div>
      </div>

      <div className="App">
        {isListVisible && (
          <Sidebar
            notes={notes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            onSaveNote={onSaveNote}
          />
        )}
        <Main
          activeNote={getActiveNote()}
          onUpdateNote={onUpdateNote}
          onSaveNote={onSaveNote}
          setActiveNote={setActiveNote}
        />
      </div>
    </div>
  );
}


export default Layout;
