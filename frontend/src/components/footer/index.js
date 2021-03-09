import React from 'react';
import "./index.css";
import { DiGithubBadge } from "react-icons/di";
import { SiLinkedin, SiGmail } from "react-icons/si";
import { api } from '../../services/api';

const Footer = () => {
  async function socialsClicksCounter() {
    const response = await api.get("/stats/1");

    await api.put("/stats/1", {
      createdNotes: response.data.createdNotes,
      deletedNotes: response.data.deletedNotes,
      clicksOnStats: response.data.clicksOnStats,
      themeChanges: response.data.themeChanges,
      clicksOnSocials: response.data.clicksOnSocials + 1
    })
      .catch((err) => console.log(err));
  };

  return (
    <div id="footer">
      <div>Made by <span id="my-name">Guilherme Montenegro</span></div>
      <span id="socials">
        Check out my socials:
                <a href="https://github.com/Guilherme-Monte" target="_blank" rel="noreferrer" onClick={socialsClicksCounter}>
          <DiGithubBadge className="icons" />
        </a>
        <a href="https://www.linkedin.com/in/guilherme-montenegro-4a0050204/" target="_blank" rel="noreferrer" onClick={socialsClicksCounter}>
          <SiLinkedin className="icons" />
        </a>
        <span id="mailTooltip">
          <p id="tooltipText">guilhermemonte.dev@gmail.com</p>
          <SiGmail className="icons" />
        </span>
      </span>
    </div>
  )
}

export default Footer;