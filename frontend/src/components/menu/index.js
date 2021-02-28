import React from 'react';
import "./index.css";
import { GoGraph } from "react-icons/go";

const Menu = () => {
    return (
        <div id="menu">
            <div id="title">Welcome to your Notepad</div>
            <div className="stats">
                <span>Stats</span>
                <GoGraph className="graph" />
            </div>
        </div>
    )
}

export default Menu;