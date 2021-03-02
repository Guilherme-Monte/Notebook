import React, { useContext, useState } from 'react';
import "./index.css";
import { SidebarButtonContext } from '../../SidebarButtonContext';
import { FaFolderPlus, FaSun, FaArrowLeft } from "react-icons/fa";

const Sidebar = () => {
  const toggleInputs = useContext(SidebarButtonContext);
  const [buttonNameSwitcher, setButtonNameSwitcher] = useState(false);

  const switchName = () => {
    setButtonNameSwitcher(!buttonNameSwitcher);
  }

  return (
    <div id="sidebar">
      <div className="nav-item">
        {buttonNameSwitcher ? <FaArrowLeft className="icons" /> : <FaFolderPlus className="icons" />}
        <span className="link-text" onClick={() => { toggleInputs(); switchName() }}>
          {buttonNameSwitcher ? "Back" : "New note"}
        </span>
      </div>
      <div className="nav-item">
        <FaSun className="icons" />
        <span className="link-text">Themify</span>
      </div>
    </div>
  )
}

export default Sidebar;