import React from "react";
import "./Fire.css";
import fire from "./fire.png"

const Fire = (props) => {
  return (
    <div className="fire-container">
      <div>
        <img src={fire} className="fire"/>
        <p className='firetext'>HOT LIST!</p>
      </div>
    </div>
)
}

export default Fire;
