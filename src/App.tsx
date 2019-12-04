import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SearchArea from "./components/Search"
import PickGif from "./components/PickGif"
import Liked from "./components/Liked"

const App: React.FC = () => {

  
  return (
    <div className="App">
      <Router>
        <SearchArea/>
        <PickGif />
        <Liked />
      </Router>
    </div>
  );
}

export default App;