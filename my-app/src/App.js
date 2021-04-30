import './App.css';
import Header from './components/Header';
import VideoUploader from './components/VideoUploader';
import Home from './components/Home';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (

    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
              <Redirect to="/Home" />
            </Route>
            <Route exact path="/Home" component={Home} />
            <Route exact path="/Upload" component={VideoUploader} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/CreateAccount" component={CreateAccount} />

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
