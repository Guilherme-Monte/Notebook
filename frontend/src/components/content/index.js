import React, { useState } from 'react';
import "./index.css";
import { api } from "../../services/api";

const Content = () => {
  const [results, setResults] = useState([]);

  React.useEffect(() => {
    getDbInfo();
  }, []);

  async function getDbInfo() {
    const response = await api.get("/users");
    // console.log(response.data);
    setResults(response.data);
  };

  const renderUserInfo = results.map((user) => {
    // Warning each list element must have a unique key prop: https://reactjs.org/docs/lists-and-keys.html#keys
    return (
      <ul>
        <li id={user.id} key={user.id}>Id: {user.id}</li>
        <li id={user.name} key={user.name}>Name: {user.name}</li>
        <li id={user.email} key={user.email}>Email: {user.email}</li>
      </ul>
    )
  });

  return (
    <div id="content">
      <h1>Content</h1>
      <h2>{renderUserInfo}</h2>
    </div>
  )
}

export default Content;