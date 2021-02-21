import React, { useContext } from 'react';
import "./index.css";
import { SidebarButtonContext } from '../../SidebarButtonContext';

const Sidebar = () => {
    const toggleInputs = useContext(SidebarButtonContext);
    // const toggleInputs = () => {
    //     const forms = document.getElementsByTagName("h2");
    //     forms[0].classList.toggle("d-none");
    //     forms[1].classList.toggle("d-none");
    //     console.log("its me");
    // }

    return (
        <div id="sidebar">
            <button className="btn" onClick={toggleInputs}>New note</button>
        </div>
    )
}

export default Sidebar;