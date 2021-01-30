import React, { useState } from 'react';
import "./index.css";
import { api } from "../../services/api";

const Content = () => {
  const [users, setUsers] = useState([]);
  const [note, setNote] = useState({});
  const [selectedId, setSelectedId] = useState(1);

  React.useEffect(() => {
    getUserInfo();
  }, []);

  React.useEffect(() => {
    getNoteInfo();
    // If you put the function on the array it will render infinitely
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  async function getUserInfo() {
    const response = await api.get("/users")
    setUsers(response.data);
  };

  const renderUserInfo = users.map((user) => {
    // Warning each list element must have a unique key prop: https://reactjs.org/docs/lists-and-keys.html#keys
    return (
      <ul>
        <li key={user.id}>Id: {user.id}</li>
        <li key={user.name}>Name: {user.name}</li>
        <li key={user.email}>Email: {user.email}</li>
      </ul>
    )
  });

  async function getNoteInfo() {
    const response = await api.get(`/notes/${selectedId}`);
    // .catch((err) => console.log(err)); check https://stackoverflow.com/questions/55983047/strange-behavior-of-react-hooks-delayed-data-update to learn about what is crashing the website
    setNote(response.data);
  };

  const renderNoteInfo = () => {
    return (
      <section id="note">
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

        <button onClick={(e) => { saveNote(note) }}>Salvar</button>
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
    console.log(response);

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
      <h2>{renderUserInfo}</h2>
      <h2>{renderNoteInfo()}</h2>
      <button onClick={previousNote}>Previous</button>
      <button onClick={nextNote}>Next</button>
    </div>
  )
}

export default Content;