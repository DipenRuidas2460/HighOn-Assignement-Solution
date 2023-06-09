import React, { createContext, useContext, useState, useReducer } from "react";
import reducer from "./reducer";

const noteContext = createContext();

const NoteState = (props) => {
  const host = `http://localhost:3001`;
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const [state, dispatch] = useReducer(reducer, {
    searchQuery: ""
  });

  // --------------------- fetch all notes ---------------------

  const getNotes = async () => {
    const url = `${host}/getNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // -----------------Add a Note-----------------

  const addNotes = async (title, description, tag) => {
    const url = `${host}/createNotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // -----------------Edit a Note-----------------------------

  const editNotes = async (id, title, description, tag) => {
    const url = `${host}/updateNotes/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });

    await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes)); // deep copy of notes array

    // Logic to edit client

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // -----------------Delete a Note---------------

  const deleteNotes = async (id) => {
    const url = `${host}/deleteNotes/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    await response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  

  return (
    <noteContext.Provider
      value={{ notes, addNotes, getNotes, editNotes, deleteNotes, state, dispatch}}
    >
      {props.children}
    </noteContext.Provider>
  );
};

// custom hook :--

const useGlobalContext = () => {
  return useContext(noteContext);
};

export { useGlobalContext, NoteState, noteContext };
