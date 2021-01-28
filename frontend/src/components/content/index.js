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
        console.log(response.data);
        setResults(response.data);
    }

    return (
        <div>
            <h1>Content</h1>
            <h2>{results[0].id}</h2>
        </div>
    )
}

export default Content;