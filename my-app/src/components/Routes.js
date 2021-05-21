import React, { Component } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';
import VideoUploader from '../components/VideoUploader';
import Home from '../components/Home';
import Login from '../components/Login';
import SingleVideo from '../components/SingleVideo';
import CreateAccount from '../components/CreateAccount';
import User from '../components/User';
import Settings from '../components/Settings';

import LikedVideos from '../components/LikedVideos';
import Cookies from 'js-cookie';

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
        this.setUser = this.setUser.bind(this);
        this.logout = this.logout.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);


    }
    setUser(user){
        this.setState({user: user});
    }
    updateAvatar(avatar){
        var user = this.state.user;
        user.Image = avatar;
        this.setState({user: user})
    
    }
    componentDidMount(){
        if(Cookies.get("user")!= undefined) {
            this.setUser(JSON.parse(Cookies.get("user")))
        }
    }
    logout(){
        this.setState({user: {}});
    }
    render() {
        return (
        <Router>
            <Header user={this.state.user} setUser={this.setUser} logout={this.logout} />
        <Switch>
          <Route exact path="/">
              <Redirect to="/Home" />
            </Route>
            <Route exact path="/Home" component={Home} />
            <Route exact path="/Upload" render={props => 
            (<VideoUploader {...props} user={this.state.user} setUser={this.setUser} />)} />
            <Route exact path="/Login" render={props => 
            (<Login {...props} user={this.state.user} setUser={this.setUser}/>)} />
            <Route exact path="/CreateAccount" component={CreateAccount} />
            {/* <Route exact path="/Video/:id" component={SingleVideo} /> */}
            <Route exact path="/Video/:id" render={props => 
            (<SingleVideo {...props} user={this.state.user} />)} />
            <Route exact path="/User/:id" render={props => 
            (<User {...props} user={this.state.user}  />)} />
            <Route exact path="/Settings" render={props => 
            (<Settings {...props} user={this.state.user}
            setUser={this.setUser}  />)} />
            <Route exact path="/LikedVideos" render={props => 
            (<LikedVideos {...props} user={this.state.user} />)} />

        </Switch>
      </Router>
        );
    }
}

export default Routes;