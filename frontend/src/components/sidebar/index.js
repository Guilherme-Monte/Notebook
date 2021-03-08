import React, { useContext, useState } from 'react';
import "./index.css";
import { SidebarButtonContext } from '../../SidebarButtonContext';
import { FaFolderPlus, FaSun, FaArrowLeft, FaMoon } from "react-icons/fa";
import { api } from "../../services/api";

const Sidebar = () => {
  const toggleInputs = useContext(SidebarButtonContext);
  const [buttonNameSwitcher, setButtonNameSwitcher] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const switchName = () => {
    setButtonNameSwitcher(!buttonNameSwitcher);
  }

  const brightModeSwitcher = () => {
    document.documentElement.style.setProperty('--text-primary', '#a1dfff');
    document.documentElement.style.setProperty('--text-secondary', '#fff');
    document.documentElement.style.setProperty('--hover-color', '#c4b781');
    document.documentElement.style.setProperty('--bg-primary', '#227093');
    document.documentElement.style.setProperty('--bg-secondary', '#002639');
    document.documentElement.style.setProperty('--bg-main', '#009dec');

    setDarkMode(false);
  }

  const darkModeSwitcher = () => {
    document.documentElement.style.setProperty('--text-primary', '#b6b6b6');
    document.documentElement.style.setProperty('--text-secondary', '#ececec');
    document.documentElement.style.setProperty('--hover-color', '#a55eea');
    document.documentElement.style.setProperty('--bg-primary', '#23232e');
    document.documentElement.style.setProperty('--bg-secondary', '#141418');
    document.documentElement.style.setProperty('--bg-main', '#2f3542');

    setDarkMode(true);
  }

  // Statistics
  async function themeChangeCounter() {
    const response = await api.get("/stats/1");
    // console.log(response.data.themeChanges);

    await api.put("/stats/1", {
      createdNotes: response.data.createdNotes,
      deletedNotes: response.data.deletedNotes,
      clicksOnStats: response.data.clicksOnStats,
      themeChanges: response.data.themeChanges + 1,
      clicksOnSocials: response.data.clicksOnSocials
    })
      .catch((err) => console.log(err));
  };

  return (
    <div id="sidebar">
      <div className="nav-item">
        {buttonNameSwitcher ? <FaArrowLeft className="icons" onClick={() => { toggleInputs(); switchName() }} />
          : <FaFolderPlus className="icons" onClick={() => { toggleInputs(); switchName() }} />}
        <span className="link-text" onClick={() => { toggleInputs(); switchName() }}>
          {buttonNameSwitcher ? "Back" : "New note"}
        </span>
      </div>
      { darkMode ?
        <div className="nav-item">
          <FaSun className="icons" onClick={() => { brightModeSwitcher(); themeChangeCounter() }} />
          <span className="link-text" onClick={() => { brightModeSwitcher(); themeChangeCounter() }}>Bright</span>
        </div>
        :
        <div className="nav-item">
          <FaMoon className="icons" onClick={() => { darkModeSwitcher(); themeChangeCounter() }} />
          <span className="link-text" onClick={() => { darkModeSwitcher(); themeChangeCounter() }}>Dark</span>
        </div>
      }
    </div>
  )
}

export default Sidebar;