import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dKeeper_backend } from "../../../declarations/dKeeper_backend"

function App() {
  const [notes, setNotes] = useState([]);

  async function fetchNotes(){
    dKeeper_backend.readNotes()
    .then((notesData)=>{
      setNotes(notesData);
      console.log(notes);
    })
    .catch((err) => console.log(err))
  }
  useEffect(()=>{
    fetchNotes();
  },[]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dKeeper_backend.createNote(newNote.title,newNote.content)
      return [newNote,...prevNotes];
    });
  }

  function deleteNote(id) {
    dKeeper_backend.removeNote(notes[id].title,notes[id].content);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
