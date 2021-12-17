import React from 'react'
import { Routes, Route } from "react-router-dom";
import HomeComponent from './components/home-component'
import NavComponent from './components/nav-component'
function App(){
  return (
    <div>
      <NavComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
      </Routes>
    </div>
  )
}

export default App;
