import './App.css';
import HttpsRedirect from 'react-https-redirect';
// import { AppContext } from "./libs/contextLib";
import React from "react";
import Routes from './components/Routes'
// import dotenv from "./dotenv"
require('dotenv').config();
function App() {

  return (

    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}> */}
      {/* <HttpsRedirect> */}
        <Routes/>
      {/* </HttpsRedirect> */}
          
      {/* </AppContext.Provider> */}
    </div>
  );
}

export default App;
