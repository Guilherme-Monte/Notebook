import React, { useContext, useState } from 'react';
import "./index.css";
import { SidebarButtonContext } from '../../SidebarButtonContext';

const Sidebar = () => {
  const toggleInputs = useContext(SidebarButtonContext);
  const [buttonNameSwitcher, setButtonNameSwitcher] = useState(false);

  const switchName = () => {
    setButtonNameSwitcher(!buttonNameSwitcher);
  }

  return (
    <div id="sidebar">
      <button className="btn" onClick={() => { toggleInputs(); switchName() }}>
        {buttonNameSwitcher ? "Back" : "New note"}
      </button>
    </div>
  )
}

export default Sidebar;