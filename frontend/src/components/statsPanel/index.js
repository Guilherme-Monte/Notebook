import React, { useState } from 'react';
import "./index.css";
import { AiOutlineClose } from "react-icons/ai";
import { api } from "../../services/api";

const StatsPanel = () => {
  const [stats, setStats] = useState([]);

  React.useEffect(() => {
    getStats();
  }, []);

  const toggleDisplay = () => {
    document.getElementById("statsPanel").classList.add("d-none");
  }

  async function getStats() {
    const response = await api.get("/stats/1");
    setStats([response.data]);
  }

  return (
    <div id="statsPanel" className="d-none">
      <article id="infoPanel">
        <h2>Current Stats:</h2>
        {stats.map((element) => {
          return (
            <ul key={element}>
              <li>You created {element.createdNotes} notes.</li>
              <li>Also deleted {element.deletedNotes} notes.</li>
              <li>And then clicked {element.clicksOnStats} times on the stats buttons.</li>
              <li>Let's not forget the {element.themeChanges} times you changed the theme.</li>
              <li>And also there were {element.clicksOnSocials} visits on my socials!</li>
            </ul>
          )
        })}
      </article>
      <AiOutlineClose id="closeIcon" onClick={toggleDisplay} />
    </div>
  )
}

export default StatsPanel;