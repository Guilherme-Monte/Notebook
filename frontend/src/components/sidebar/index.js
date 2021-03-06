import React, { useContext, useState } from 'react';
import "./index.css";
import { SidebarButtonContext } from '../../SidebarButtonContext';
import { FaFolderPlus, FaSun, FaArrowLeft, FaMoon } from "react-icons/fa";

const Sidebar = () => {
  const toggleInputs = useContext(SidebarButtonContext);
  const [buttonNameSwitcher, setButtonNameSwitcher] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const switchName = () => {
    setButtonNameSwitcher(!buttonNameSwitcher);
  }

  const brightModeSwitcher = () => {
    document.documentElement.style.setProperty('--text-primary', '#009dec');
    document.documentElement.style.setProperty('--text-secondary', '#003b59');
    document.documentElement.style.setProperty('--hover-color', '#2e86de');
    document.documentElement.style.setProperty('--bg-primary', '#daf2fe');
    document.documentElement.style.setProperty('--bg-secondary', '#002639');
    document.documentElement.style.setProperty('--bg-main', '#a1dfff');

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

  return (
    <div id="sidebar">
      <div className="nav-item">
        {buttonNameSwitcher ? <FaArrowLeft className="icons" /> : <FaFolderPlus className="icons" />}
        <span className="link-text" onClick={() => { toggleInputs(); switchName() }}>
          {buttonNameSwitcher ? "Back" : "New note"}
        </span>
      </div>
      { darkMode ?
        <div className="nav-item">
          <FaSun className="icons" />
          <span className="link-text" onClick={brightModeSwitcher}>Bright</span>
        </div>
        :
        <div className="nav-item">
          <FaMoon className="icons" />
          <span className="link-text" onClick={darkModeSwitcher}>Dark</span>
        </div>
      }
    </div>
  )
}

export default Sidebar;