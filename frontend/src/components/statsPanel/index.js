import React from 'react';
import "./index.css";
import { AiOutlineClose } from "react-icons/ai";

const StatsPanel = () => {
  const toggleDisplay = () => {
    document.getElementById("statsPanel").classList.add("d-none");
  }

  return (
    <div id="statsPanel" className="d-none">
      <article id="infoPanel">
        <h2>Current Stats:</h2>
        <div>asd</div>
      </article>
      <AiOutlineClose id="closeIcon" onClick={toggleDisplay} />
    </div>
  )
}

export default StatsPanel;