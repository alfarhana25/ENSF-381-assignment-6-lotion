import React, { useState, useEffect } from 'react';

function SidebarHeader({ onAddNote }) {
  return (
    <div className="app-sidebar-header">
      <h1>Notes</h1>
      <button onClick={onAddNote}>+</button>
    </div>
  );
}

function SidebarNote({
  note,
  isActive,
  onClick,
  onDeleteNote,
}) {
  const truncatedBody = note.body && note.body.substr(0, 100) + '...';
  const formattedDate = new Date(note.lastModified).toLocaleDateString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div
      className={`app-sidebar-note ${isActive && 'active'}`}
      onClick={onClick}
    >
      <div className="sidebar-note-title">
        <strong>{note.title}</strong>
        <button onClick={(e) => onDeleteNote(note.id)}>Delete</button>
      </div>
      <p>{truncatedBody}</p>
      <small className="note-meta">
        Last Modified {formattedDate}
      </small>
    </div>
  );
}

function ActiveNote({
  activeNoteText,
  setActiveNoteText,
  onSaveNote,
  activeNote,
}) {
  function handleSaveNote() {
    const updatedNote = {
      ...activeNote,
      title: activeNoteText.title,
      body: activeNoteText.body,
      lastModified: Date.now(),
    };
    onSaveNote(updatedNote);
  }

  return (
    <div className="active-note">
      <input
        type="text"
        className="note-title-input"
        placeholder="Note Title..."
        value={activeNoteText.title}
        onChange={(e) =>
          setActiveNoteText({
            ...activeNoteText,
            title: e.target.value,
          })
        }
      />
      <textarea
        className="note-body-textarea"
        placeholder="Write your note here..."
        value={activeNoteText.body}
        onChange={(e) =>
          setActiveNoteText({
            ...activeNoteText,
            body: e.target.value,
          })
        }
      />
      <button className="save-note" onClick={handleSaveNote}>
        Save Note
      </button>
    </div>
  );
}

function Sidebar({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
  onSaveNote,
}) {
  const [activeNoteText, setActiveNoteText] = useState({ title: '', body: '' });

  useEffect(() => {
    if (activeNote && activeNoteText.title !== activeNote.title) {
      setActiveNoteText({ title: activeNote.title, body: activeNote.body });
    }
  }, [activeNote, activeNoteText.title]);

  function handleNoteClick(id) {
    const clickedNote = notes.find((note) => note.id === id);
    if (clickedNote.id !== activeNote) {
      setActiveNoteText({ title: clickedNote.title, body: clickedNote.body });
      setActiveNote(clickedNote.id);
    }
  }

  function handleDeleteNote(id) {
    onDeleteNote(id);
  }

  const sortedNotes = notes ? notes.sort((a, b) => b.lastModified - a.lastModified) : [];

  return (
    <div>
      <SidebarHeader onAddNote={onAddNote} />
      <div className="app-sidebar">
        <div className="app-sidebar-notes">
          {sortedNotes.map((note) => (
            <SidebarNote
              key={note.id}
              note={note}
              isActive={note.id === activeNote}
              onClick={() => handleNoteClick(note.id)}
              onDeleteNote={handleDeleteNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
          }

export default Sidebar;
