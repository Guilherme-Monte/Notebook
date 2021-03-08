import React from 'react';
import "./index.css";
import { GoGraph } from "react-icons/go";
import { api } from '../../services/api';
import StatsPanel from "../statsPanel/index";

const Menu = () => {
  async function statsClicksCounter() {
    const response = await api.get("/stats/1");
    // console.log(response.data.clicksOnStats);

    await api.put("/stats/1", {
      createdNotes: response.data.createdNotes,
      deletedNotes: response.data.deletedNotes,
      clicksOnStats: response.data.clicksOnStats + 1,
      themeChanges: response.data.themeChanges,
      clicksOnSocials: response.data.clicksOnSocials
    })
      .catch((err) => console.log(err));
  };

  const showStatsPanel = () => {
    document.getElementById("statsPanel").classList.remove("d-none");
  }

  return (
    <div id="menu">
      <div id="title">Welcome to your Notepad</div>
      <div className="stats" onClick={() => { statsClicksCounter(); showStatsPanel() }}>
        <span>Stats</span>
        <GoGraph className="graph" />
      </div>
      <StatsPanel />
    </div >
  )
}

export default Menu;