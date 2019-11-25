import React from 'react';
import logo from './logo.svg';
import './App.css';

import SearchArea from "./components/Search"
import Result from "./components/Result"
import Liked from "./components/Liked"

const App: React.FC = () => {
  // useDispatch()
  
  return (
    <div className="App">
      <SearchArea/>
      <Result />
      <Liked />

    </div>
  );
}

export default App;