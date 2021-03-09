import React, { useState } from 'react';
import "./index.css";
import { api } from "../../services/api";
import Toast from "../toast/index";
// import { SidebarButtonContext } from '../../SidebarButtonContext';

const Content = () => {
  const [note, setNote] = useState({ id: null, title: "", content: "", createdAt: "", deleted: false });
  const [selectedId, setSelectedId] = useState(1);
  const [requestCounter, setRequestCounter] = useState(0);

  React.useEffect(() => {
    getNoteInfo();
    // If you put the function on the array it will render infinitely
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  // Statistics:
  async function statCreatedDeleted(deleted = false) {
    const response = await api.get("/stats/1");
    if (deleted) {
      await api.put("/stats/1", {
        createdNotes: response.data.createdNotes,
        deletedNotes: response.data.deletedNotes + 1,
        clicksOnStats: response.data.clicksOnStats,
        themeChanges: response.data.themeChanges,
        clicksOnSocials: response.data.clicksOnSocials
      })
        .catch((err) => console.log(err));
    } else {
      await api.put("/stats/1", {
        createdNotes: response.data.createdNotes + 1,
        deletedNotes: response.data.deletedNotes,
        clicksOnStats: response.data.clicksOnStats,
        themeChanges: response.data.themeChanges,
        clicksOnSocials: response.data.clicksOnSocials
      })
        .catch((err) => console.log(err));
    }
  };

  // CRUD:

  async function createNote(note) {
    const rawDate = new Date();
    const todaysDate = `${rawDate.getDate()}/${rawDate.getMonth() + 1}/${rawDate.getFullYear()}`;

    const response = await api.post("/notes", {
      title: note.title,
      content: note.content,
      createdAt: todaysDate,
      deleted: false
    })
      .catch((err) => console.log(err));

    getNoteInfo();

    statCreatedDeleted();
    return response;
  };

  const createNoteForm = () => {
    return (
      <section className="note-form">
        <input className="note-title" type="text" defaultValue="" placeholder="Write the title here"
          onChange={(e) => {
            setNote(
              { id: note.id, title: e.target.value, content: note.content, createdAt: note.createdAt }
            )
          }} />

        <textarea className="note-content" type="text" defaultValue="" placeholder="Type the content here"
          onChange={(e) => {
            setNote(
              { id: note.id, title: note.title, content: e.target.value, createdAt: note.createdAt }
            )
          }} />

        <div className="btn-container">
          <button className="btn-content" onClick={(e) => { createNote(note) }}>Create</button>
        </div>
      </section>
    )
  };

  function toastTimer() {
    setTimeout(() => {
      document.getElementById("toastBox").classList.add("d-none");
    }, 4000);
  }

  async function getNoteInfo() {
    try {
      const response = await api.get(`/notes/${selectedId}`);
      setNote(response.data);
    } catch (error) {
      if (error.response.status === 404) {
        if (requestCounter === 3) {
          document.getElementById("toastBox").classList.remove("d-none");
          document.getElementById("toastContent")
            .innerHTML = "No more notes, back to the beginning 👍";

          // 4 seconds until it self closes
          toastTimer();

          setSelectedId(1);
          setRequestCounter(0);
        } else {
          document.getElementById("toastBox").classList.remove("d-none");
          document.getElementById("toastContent")
            .innerHTML = "Looks like we are out of notes ☹️";

          // 4 seconds until it self closes
          toastTimer();

          setRequestCounter(requestCounter + 1);
        }
      }
      return error.response.status;
    }
  };

  const renderNoteInfo = () => {
    return (
      <section className="note-form">
        <input className="note-title" type="text" value={note.title} placeholder="Title"
          onChange={(e) => {
            setNote(
              { id: note.id, title: e.target.value, content: note.content, createdAt: note.createdAt }
            )
          }} />

        <textarea className="note-content" type="text" value={note.content} placeholder="Type the content here..."
          onChange={(e) => {
            setNote(
              { id: note.id, title: note.title, content: e.target.value, createdAt: note.createdAt }
            )
          }} />

        <div className="btn-container">
          <button className="btn-content" onClick={(e) => { saveNote(note) }}>Save</button>
          <button className="btn-content" onClick={(e) => { deleteNote(note) }}>Delete</button>
        </div>
      </section>
    )
  };

  async function saveNote(note) {
    const response = await api.put(`/notes/${note.id}`, {
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      deleted: note.deleted
    })
      .catch((err) => console.log(err));
    getNoteInfo();

    return response;
  };

  async function deleteNote(note) {
    try {
      const response = await api.delete(`/notes/${note.id}`);
      statCreatedDeleted(true);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  function nextNote() {
    setSelectedId(selectedId + 1);
  };

  function previousNote() {
    selectedId - 1 === 0 ? setSelectedId(1) : setSelectedId(selectedId - 1);
    getNoteInfo();
  };

  return (
    <div id="content">
      <div className="btn-container">
        <button className="btn-content" onClick={previousNote}>Previous</button>
        <button className="btn-content" onClick={nextNote}>Next</button>
      </div>
      <h2 id="noteInfo">{renderNoteInfo()}</h2>
      <h2 id="createNote" className="d-none">{createNoteForm()}</h2>
      <Toast content="Strange things happened 😕" />
    </div>
  )
}

export default Content;