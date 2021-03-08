import React from 'react';
import "./index.css";
import { AiOutlineClose } from "react-icons/ai";

const Toast = (props) => {
  const toggleDisplay = () => {
    document.getElementById("toastBox").classList.toggle("d-none");
  }

  return (
    <aside id="toastBox" className="d-none">
      <span id="toastContent">{props.content}</span>
      <AiOutlineClose id="closeIcon" onClick={toggleDisplay} />
    </aside>
  )
}

export default Toast;