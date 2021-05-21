import './App.css';
import Header from './components/Header';
import VideoUploader from './components/VideoUploader';
import Home from './components/Home';
import Login from './components/Login';
import SingleVideo from './components/SingleVideo';
import CreateAccount from './components/CreateAccount';
import User from './components/User';

import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { AppContext } from "./libs/contextLib";
import React, { useState } from "react";
import Routes from './components/Routes'
function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (

    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}> */}
      <Routes/>
          
      {/* </AppContext.Provider> */}
    </div>
  );
}

export default App;
