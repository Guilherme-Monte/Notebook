import React from 'react';
import "./index.css";
import { DiGithubBadge } from "react-icons/di";
import { SiLinkedin, SiGmail } from "react-icons/si";

const Footer = () => {
    return (
        <div id="footer">
            <div>Made by <span id="my-name">Guilherme Montenegro</span></div>
            <span id="socials">
                Check out my socials here:
                <a href="https://github.com/Guilherme-Monte" target="_blank" rel="noreferrer">
                    <DiGithubBadge className="icons" />
                </a>
                <a href="https://www.linkedin.com/in/guilherme-montenegro-4a0050204/" target="_blank" rel="noreferrer">
                    <SiLinkedin className="icons" />
                </a>
                <SiGmail className="icons" />= guilhermemonte.dev@gmail.com
            </span>
        </div>
    )
}

export default Footer;