import React, { useContext, useState } from 'react';
import "./index.css";
import { SidebarButtonContext } from '../../SidebarButtonContext';
import { FaFolderPlus, FaSun } from "react-icons/fa";

const Sidebar = () => {
  const toggleInputs = useContext(SidebarButtonContext);
  const [buttonNameSwitcher, setButtonNameSwitcher] = useState(false);

  const switchName = () => {
    setButtonNameSwitcher(!buttonNameSwitcher);
  }

  return (
    <div id="sidebar">
      <div className="nav-item">
        <FaFolderPlus className="icons" />
        {/* Consertar o erro de ao clicar em Create o nome do botão continua Back */}
        <span className="link-text" onClick={() => { toggleInputs(); switchName() }}>
          {buttonNameSwitcher ? "Back" : "New note"}
        </span>
      </div>
      {/* <div className="nav-item">
        <span className="link-text">Cats</span>
      </div>
      <div className="nav-item">
        <span className="link-text">Aliens</span>
      </div>
      <div className="nav-item">
        <span className="link-text">Space</span>
      </div>
      <div className="nav-item">
        <span className="link-text">Shuttle</span>
      </div> */}
      <div className="nav-item">
        <FaSun className="icons" />
        <span className="link-text">Themify</span>
      </div>
    </div>
  )
}

export default Sidebar;