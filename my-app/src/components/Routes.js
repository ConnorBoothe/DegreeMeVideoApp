import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';
import VideoUploader from '../components/VideoUploader';
import Home from '../components/Home';
import Login from '../components/Login';
import SingleVideo from '../components/SingleVideo';
import CreateAccount from '../components/CreateAccount';
import User from '../components/User';
import Settings from '../components/Settings';
import Footer from "../components/Footer"
import LikedVideos from '../components/LikedVideos';
import SearchResults from '../components/SearchResults'
import Cookies from 'js-cookie';

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            notifications: [],
            showNotificationBadge: "none",
            notificationCount: 0,
            searchValue: ""
        }
        this.setUser = this.setUser.bind(this);
        this.logout = this.logout.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
        this.getNotifications = this.getNotifications.bind(this)
        this.getNotificationCount = this.getNotificationCount.bind(this)
        this.hideUnreadCount = this.hideUnreadCount.bind(this)
        this.showUnreadCount = this.showUnreadCount.bind(this)
        this.setSearchValue = this.setSearchValue.bind(this)
        this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this)

    }
    setUser(user){
        this.setState({user: user});
    }
    updateAvatar(avatar){
        var user = this.state.user;
        user.Image = avatar;
        this.setState({user: user})
    }
    getNotificationCount(){
        if(Cookies.get("user")!= undefined) {
        var user = JSON.parse(Cookies.get("user"));
        const api_route = 'http://localhost:8080/API/GetUnreadCount/'+user._id;
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(api_route, requestMetadata)
        .then(res => res.json())
        .then((result)=>{
            if(result > 0){
                if(result <= 9){
                    this.setState({showNotificationBadge: "block", notificationCount: result })
                }
                else {
                    this.setState({showNotificationBadge: "block", notificationCount: "9+" })
                }
            }
            else{
                this.setState({showNotificationBadge: "none", notificationCount: result})
            }
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    }
    getNotifications(){
        if(Cookies.get("user")!= undefined) {
        var user = JSON.parse(Cookies.get("user"));
            const api_route = 'http://localhost:8080/API/GetNotifications/'+user._id;
            const requestMetadata = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            fetch(api_route, requestMetadata)
            .then(res => res.json())
            .then((result)=>{
                console.log(result)
                this.setState({notifications: result})
            })
            .catch((err)=>{
                console.log(err)
            });
        }
    }
    showUnreadCount(){
        var unreadCount = this.state.notificationCount;
        
        unreadCount++;
        if(unreadCount <= 9){
            this.setState({showNotificationBadge: "block", notificationCount: unreadCount})

        }
        else {
            this.setState({showNotificationBadge: "block", notificationCount: "9+"})

        }
    }
    hideUnreadCount(){
        this.setState({showNotificationBadge: "none", notificationCount: 0})
    }
    componentDidMount(){
        if(Cookies.get("user")!= undefined) {
            this.setUser(JSON.parse(Cookies.get("user")))
            this.getNotificationCount();
            // this.getNotifications();
        }
        else{
            
        }
    }
    setSearchValue(value){
        this.setState({searchValue: value});
    }
    handleAutocompleteChange(e){
        console.log("hide")
        this.setState({searchValue: e.target.value});

    }
    logout(){
        this.setState({user: {}});
    }
   
    render() {
        return (
        <Router>
            <Header user={this.state.user} setUser={this.setUser} logout={this.logout} 
            notifications={this.state.notifications} getNotifications={this.getNotifications}
            showNotificationBadge={this.state.showNotificationBadge}
            hideUnreadCount={this.hideUnreadCount}
            notificationCount={this.state.notificationCount}
            searchValue={this.state.searchValue}
            setSearchValue={this.setSearchValue}
            handleAutocompleteChange={this.handleAutocompleteChange}
          />
        <Switch>
          <Route exact path="/">
              <Redirect to="/Home" />
            </Route>
            <Route exact path="/Home" render={props => 
            (<Home {...props} user={this.state.user} />)} />
            <Route exact path="/Upload" render={props => 
            (<VideoUploader {...props} user={this.state.user} setUser={this.setUser} />)} />
            <Route exact path="/Login" render={props => 
            (<Login {...props} user={this.state.user} setUser={this.setUser} getUnreadCount={this.getNotificationCount}
            />)} />
            <Route exact path="/CreateAccount" component={CreateAccount} />
            {/* <Route exact path="/Video/:id" component={SingleVideo} /> */}
            <Route exact path="/Video/:id" render={props => 
            (<SingleVideo {...props} user={this.state.user} 
            showUnreadCount={this.showUnreadCount}/>)} />
            <Route exact path="/User/:id" render={props => 
            (<User {...props} user={this.state.user}  />)} />
            <Route exact path="/Settings" render={props => 
            (<Settings {...props} user={this.state.user}
            setUser={this.setUser}  />)} />
           
            <Route exact path="/SearchResults/:id" render={props => 
            (<SearchResults {...props} searchValue={this.state.searchValue}
            setSearchValue={this.setSearchValue}/>)} />
            <Route exact path="/LikedVideos" render={props => 
            (<LikedVideos {...props} user={this.state.user} />)} />
             <Route
                exact
                path="/:id"
                render= {props => (
                    <Redirect to={`SearchResults/${this.state.searchValue}`} />
                )}/>

        </Switch>
        <Footer />
      </Router>
        );
    }
}

export default Routes;