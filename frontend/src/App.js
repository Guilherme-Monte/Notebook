import React from 'react';
import './App.css';
import Content from './components/content';
import Footer from './components/footer';
import Menu from './components/menu';
import Sidebar from "./components/sidebar";
import { SidebarButtonContext } from './SidebarButtonContext';


function App() {
  const toggleInputs = () => {
    const forms = document.getElementsByTagName("h2");
    forms[0].classList.toggle("d-none");
    forms[1].classList.toggle("d-none");

    const buttons = document.getElementsByClassName("btn-content");
    buttons[0].classList.toggle("d-none");
    buttons[1].classList.toggle("d-none");
  };

  return (
    <div className="App">
      <Menu id="menu" />
      <SidebarButtonContext.Provider value={toggleInputs}>
        <Sidebar id="sidebar" />
        <Content id="content" />
      </SidebarButtonContext.Provider>
      <Footer id="footer" />
    </div>
  );
}

export default App;
