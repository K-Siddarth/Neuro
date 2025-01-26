import React from 'react'

import Typing from "./Typing.jsx";
import GraphCanvas from "./graph.jsx";
import "./Home.css"

export default function Home() {
  return (
    <div className="home-container">
        <GraphCanvas/>
        <Typing/>
    </div>
  )
}
