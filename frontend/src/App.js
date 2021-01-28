import React from 'react';
import './App.css';
import Content from './components/content';
import Footer from './components/footer';
import Menu from './components/menu';
import Sidebar from "./components/sidebar";


function App() {
  return (
    <div className="App">
      <Menu id="menu" />
      <Sidebar id="sidebar" />
      <Content id="content" />
      <Footer id="footer" />
    </div>
  );
}

export default App;
