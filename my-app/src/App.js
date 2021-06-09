import './App.css';
// import { AppContext } from "./libs/contextLib";
import React from "react";
import Routes from './components/Routes'
function App() {

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
