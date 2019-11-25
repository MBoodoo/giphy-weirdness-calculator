import React, { useLayoutEffect, useState } from 'react';
import { getRandomID } from "./service/api"
import logo from './logo.svg';
import './App.css';
import SearchArea from "./components/Search"
import { generateID } from "./redux/actions"
import { useDispatch } from 'react-redux';

const App: React.FC = () => {
  const [currentID, setCurrentID] = useState('') 
  // useDispatch()

  useLayoutEffect( () => {
    // add this to the store
   
  })
  
  return (
    <div className="App">
      <SearchArea />

    </div>
  );
}

export default App;