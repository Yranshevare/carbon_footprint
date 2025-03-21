import { useState } from "react";
import "./App.css";
import Location from "./components/Location";
import Slider from "./components/Slider";
import Duration from "./components/Duration";
import Searchbar from "./components/Searchbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./LandingPage";
import Form from "./Form";
import Result from "./Result";


function App() {
  
  return(
    <Router >
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/form" element={<Form/>}></Route>
        <Route path="/result/:urldata" element={<Result/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
