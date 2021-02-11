import React, { useState, useContext } from 'react';
import "./index.css";
import { api } from "../../services/api";
import { SidebarButtonContext } from '../../SidebarButtonContext';

const Content = () => {
  const [note, setNote] = useState({});
  const [selectedId, setSelectedId] = useState(1);
  const toggleButton = useContext(SidebarButtonContext);

  React.useEffect(() => {
    getNoteInfo();
    // If you put the function on the array it will render infinitely
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  async function createNote(note) {
    const rawDate = new Date();
    const todaysDate = `${rawDate.getDate()}/${rawDate.getMonth() + 1}/${rawDate.getFullYear()}`;

    const response = await api.post("/notes", {
      title: note.title,
      content: note.content,
      createdAt: todaysDate,
      deleted: note.deleted
    })
      .catch((err) => console.log(err));

    // Hides the creation form:
    toggleButton();
    getNoteInfo();

    return response;
  };

  const saveNoteForm = () => {
    return (
      <section id="newNote">
        <input type="text" defaultValue="" placeholder="Write the title here"
          onChange={(e) => {
            console.log(note.title);
            setNote(
              { userId: note.userId, title: e.target.value, content: note.content, deleted: note.deleted }
            )
          }} />

        <input type="text" defaultValue="" placeholder="Type the content here"
          onChange={(e) => {
            console.log(note.content);
            setNote(
              { userId: note.userId, title: note.title, content: e.target.value, deleted: note.deleted }
            )
          }} />

        <button onClick={(e) => { createNote(note) }}>Create</button>
      </section>
    )
  };

  async function getNoteInfo() {
    try {
      const response = await api.get(`/notes/${selectedId}`);
      setNote(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderNoteInfo = () => {
    return (
      <section id="noteContent">
        <input type="text" defaultValue={note.title} placeholder="Title"
          onChange={(e) => {
            setNote(
              { id: note.id, userId: note.userId, title: e.target.value, content: note.content, createdAt: note.createdAt, deleted: note.deleted }
            )
          }} />

        <input type="text" defaultValue={note.content} placeholder="Type the content here..."
          onChange={(e) => {
            setNote(
              { id: note.id, userId: note.userId, title: note.title, content: e.target.value, createdAt: note.createdAt, deleted: note.deleted }
            )
          }} />

        <button onClick={(e) => { saveNote(note) }}>Save</button>
      </section>
    )
  };

  async function saveNote(note) {
    const response = await api.put(`/notes/${note.id}`, {
      id: note.id,
      userId: note.userId,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      deleted: note.deleted
    })
      .catch((err) => console.log(err));
    getNoteInfo();

    return response;
  };

  function nextNote() {
    setSelectedId(selectedId + 1);
    getNoteInfo();
  };

  function previousNote() {
    selectedId - 1 === 0 ? setSelectedId(1) : setSelectedId(selectedId - 1);
    getNoteInfo();
  };

  return (
    <div id="content">
      <h2 id="noteInfo">{renderNoteInfo()}</h2>
      <h2 id="createNote" className="d-none">{saveNoteForm()}</h2>
      <button onClick={previousNote}>Previous</button>
      <button onClick={nextNote}>Next</button>
    </div>
  )
}

export default Content;