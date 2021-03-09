import React, { useState } from 'react';
import "./index.css";
import { AiOutlineClose } from "react-icons/ai";
import { api } from "../../services/api";

const StatsPanel = () => {
  const [stats, setStats] = useState([]);

  React.useEffect(() => {
    getStats();

    const timer = setInterval(() => { getStats() }, 60000);

    // clearInterval invoked only once on ComponentWillUnMount
    return () => {
      clearInterval(timer);
    }
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
              <li>You created <span className="highlighted">{element.createdNotes}</span> notes.</li>
              <li>Also deleted <span className="highlighted">{element.deletedNotes}</span> notes.</li>
              <li>And then clicked <span className="highlighted">{element.clicksOnStats}</span> times on the stats buttons.</li>
              <li>Let's not forget the <span className="highlighted">{element.themeChanges}</span> times you changed the theme.</li>
              <li>And also there were <span className="highlighted">{element.clicksOnSocials}</span> visits on my socials!</li>
            </ul>
          )
        })}
        <p>Refreshed every minute!</p>
      </article>
      <AiOutlineClose id="closeIcon" onClick={toggleDisplay} />
    </div>
  )
}

export default StatsPanel;