import React, { Component } from "react";
import { Route, Switch, Redirect} from 'react-router-dom';
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
import CreateSellerAccount from "./CreateSellerAccount";
import UpgradeAccount from "./UpgradeAccount";
import PaymentSettings from "./PaymentSettings";
import LandingPage from "./LandingPage";
import ForgotPassword from "./ForgotPassword";
import UpdatePassword from "./UpdatePassword";
import ContactUs from "./ContactUs";
import TermsOfService from "./TermsOfService";




class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            notifications: [],
            showNotificationBadge: "none",
            notificationCount: 0,
            searchValue: "",
            keywords: []
        }
        this.setUser = this.setUser.bind(this);
        this.logout = this.logout.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
        this.getNotifications = this.getNotifications.bind(this);
        this.getNotificationCount = this.getNotificationCount.bind(this);
        this.hideUnreadCount = this.hideUnreadCount.bind(this);
        this.showUnreadCount = this.showUnreadCount.bind(this);
        this.setSearchValue = this.setSearchValue.bind(this);
        this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
        this.getKeywords = this.getKeywords.bind(this);
        this.addKeyword = this.addKeyword.bind(this);
        this.removeKeyword = this.removeKeyword.bind(this);
        this.keyword = React.createRef();
    }
    setUser(user){
        Cookies.set("user", user, {secure: true, sameSite: "strict"})
        this.setState({user: user});
    }
    updateAvatar(avatar){
        var user = this.state.user;
        user.Image = avatar;
        this.setState({user: user})
    }
    getKeywords(){
        var user = {};
        if(this.state.user._id === undefined) {
          user = JSON.parse(Cookies.get("user"));
        }
        else {
          user = this.state.user
        }
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/keywords/'+ user._id;
        const requestMetadata = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                    };
            fetch(api_route, requestMetadata)
            .then(response => response.json())
                .then(result => {
                  var keywords = [];
                  for(var i = 0; i < result.length; i++ ){
                    keywords.push(result[i].Word)
                  } 
                  this.setState({keywords: keywords})              
                })
      }
    getNotificationCount(){
        if(Cookies.get("user")!== undefined) {
        var user = JSON.parse(Cookies.get("user"));
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/GetUnreadCount/'+user._id;
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
        });
    }
    }
    getNotifications(){
        if(Cookies.get("user")!== undefined) {
        var user = JSON.parse(Cookies.get("user"));
            const api_route = process.env.REACT_APP_REQUEST_URL+'/API/GetNotifications/'+user._id;
            const requestMetadata = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            fetch(api_route, requestMetadata)
            .then(res => res.json())
            .then((result)=>{
                this.setState({notifications: result})
            })
            .catch((err)=>{
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
        if(Cookies.get("user")!== undefined) {
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
        this.setState({searchValue: e.target.value});

    }
    logout(){
        this.setState({user: {}});
    }
    addKeyword(){
        //if keyword isn't empty, add it
        if(this.keyword.current.value !== ""){
          const api_route = process.env.REACT_APP_REQUEST_URL+'/API/AddKeywords';
          const postBody = {
              userId: this.state.user._id,
              word: this.keyword.current.value
          };
          const requestMetadata = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(postBody),
          };
          fetch(api_route, requestMetadata)
          .then(res => res.json())
          .then((result)=>{
            var newArray = this.state.keywords.concat(this.keyword.current.value)
            this.setState({ keywords: newArray })
            this.keyword.current.value = "";
          })
        }
      }
       //remove keyword by index
       removeKeyword(index){
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/RemoveKeyword';
        const postBody = {
            userId: this.state.user._id,
            word: this.state.keywords[index]
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody),
        };
        fetch(api_route, requestMetadata)
        .then(res => res.json())
        .then((result)=>{
          const newArray = this.state.keywords
          newArray.splice(index,1)
          this.setState({keywords: newArray});
        })
        
      }
    isUserLoggedIn(){
        if(this.state.user !== undefined){
            
        }
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
              <Redirect to="/LandingPage" />
            </Route>
            <Route exact path="/Home" render={props => 
            (<Home {...props} user={this.state.user}
                getKeywords = {this.getKeywords} 
                addKeyword={this.addKeyword} 
                removeKeyword={this.removeKeyword}
                keyword={this.keyword}
                keywords={this.state.keywords} />)} />
           <Route exact path="/LandingPage" render={props => 
            (<LandingPage {...props} />)} />
            <Route exact path="/ContactUs" render={props => 
            (<ContactUs {...props} />)} />
             <Route exact path="/ResetPassword" render={props => 
            (<ForgotPassword {...props} />)} />
            <Route exact path="/Upload" render={props => 
            (<VideoUploader {...props} user={this.state.user} setUser={this.setUser} />)} />
            <Route exact path="/Login" render={props => 
            (<Login {...props} user={this.state.user} setUser={this.setUser} getUnreadCount={this.getNotificationCount}
            />)} />
            <Route exact path="/UpdatePassword/:id" render={props => 
            (<UpdatePassword {...props} 
            />)} />
            {/* <Route exact path="/CreateAccount" component={CreateAccount} /> */}
            <Route exact path="/CreateAccount" render={props => 
            (<CreateAccount {...props}
            getKeyWords = {this.getKeyWords} addKeyWord={this.addKeyword} removeKeyword={this.removeKeyword}
            keyword={this.keyword} keywords = {this.state.keywords}/>)} />
            <Route exact path="/Video/:id" render={props => 
            (<SingleVideo {...props} user={this.state.user} 
            showUnreadCount={this.showUnreadCount} setUser={this.setUser}/>)} />
            <Route exact path="/User/:id" render={props => 
            (<User {...props} user={this.state.user}
            setUser = {this.setUser}  />)} />
            <Route exact path="/Settings" render={props => 
            (<Settings {...props} user={this.state.user}
            setUser={this.setUser} getKeywords = {this.getKeywords} 
            addKeyword={this.addKeyword} removeKeyword={this.removeKeyword}
            keyword={this.keyword} keywords = {this.state.keywords}/>)} />
             <Route exact path="/CreateSellerAccount" render={props => 
            (<CreateSellerAccount {...props} setUser={this.setUser} />)} />
             <Route exact path="/TermsOfService" render={props => 
            (<TermsOfService {...props} setUser={this.setUser} />)} />
            <Route exact path="/Upgrade" render={props => 
            (<UpgradeAccount {...props} user={this.state.user}
                setUser={this.setUser} />)} />
         <Route exact path="/PaymentSettings/:id" render={props => 
            (<PaymentSettings {...props} user={this.state.user}
                setUser={this.setUser} />)} />
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