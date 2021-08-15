import React, {Component} from "react";
import "../css/UserMenu.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Tippy from "@tippy.js/react";

import NotificationList from "../components/NotificationList"
// import bootstrap from "bootstrap";
class UserMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            showNotifications: "none",
            menuTitle: "Notifications",
            showUnreadCount: "block"
        }
        this.toggleNotifications = this.toggleNotifications.bind(this);
        this.toggleAccount = this.toggleAccount.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.readNotifications = this.readNotifications.bind(this)
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({showNotifications: "none"});
            this.readNotifications();
        }
      
    }

    toggleNotifications(){
        this.props.hideUnreadCount()
        if(this.state.showNotifications === "none"){
            this.props.getNotifications()
            this.setState({showNotifications: "inline-block",
            menuTitle: "Notifications"
        });
        }
        else {
            this.readNotifications();
            if(this.state.menuTitle === "Account"){
                this.props.getNotifications()
                this.setState({menuTitle: "Notifications"});
            }
            else {
                this.setState({showNotifications: "none",
                menuTitle: "Notifications"});
            }
            
        }
    }
    
    hideMenu(){
        this.setState({showNotifications: "none"})
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    toggleAccount(){
        if(this.state.showNotifications === "none"){
            this.setState({showNotifications: "inline-block",
            menuTitle: "Account"
        });
        }
        else {
           
            if(this.state.menuTitle === "Notifications"){
                this.readNotifications();
                this.setState({menuTitle: "Account"});
            }
            else {
                this.setState({showNotifications: "none",
                menuTitle: "Account"});
            }
        }
    }
    testJSON(text) {
        
        try {
            JSON.parse(text);
            return true;
        } catch (error) {
            return false;
        }
    }
    isLoggedIn(){
       
        if(this.props.user._id){
            return(
                <span>
                <Tippy content="Account">
                    <li onClick={this.toggleAccount}>
                        <img className="user-image" src={this.props.user.Image} alt="User"/>
                    </li>
                </Tippy>
                <Tippy content="Notifications">
                    <li onClick={this.toggleNotifications}>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="#d4d4d4" className="bi bi-bell-fill upload-icon" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                    </svg>
                    <p className="notification-badge" style={{display: this.props.showNotificationBadge}}>
                        {this.props.notificationCount}
                    </p>

                    </li>
                </Tippy>
                </span>
                
            );
        }
        else {
            
            return (
            <li className="login-li">
                <Link to="/Login" className="btn btn-primary login-home-btn">Log In</Link>
            </li>);
        }
      }
      readNotifications(){
        const api_route = 'http://localhost:8080/API/SeenNotifications';
        const postBody = {
            user_id: this.props.user._id
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
            //hide red notif badge
        })
    }
    showUpgradeButton(){
        if( this.props.user.Subscription_Level === "Free Tier" ){
            return (
                <Link to="/Upgrade">
                        <button className="btn btn-primary subcribe-btn">Upgrade</button>
                </Link>
            )
        }
        else if(this.props.user.Subscription_Level === "Pro Tier") {
            return (
                <p className="text-light tier-text">Pro Tier</p>
            )
        }
    }
  render(){
    return (
        <div className="user-menu" ref={this.wrapperRef}>
            <ul>
                <li>
                   {this.showUpgradeButton()}
                </li>
                <Tippy content="Upload">
                    <li onClick={this.hideMenu}>
                    <Link to="/Upload">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#d4d4d4" className="bi bi-cloud-upload-fill upload-icon" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"/>
                        </svg>
                    </Link>
                    </li>
                </Tippy>
                {this.isLoggedIn()}
            </ul>
            <div className="user-dropdown-container" style={{"display": this.state.showNotifications}}>
                <h1 className="user-dropdown-title">{this.state.menuTitle}</h1>
                <NotificationList type={this.state.menuTitle} logout={this.props.logout}
                hideMenu={this.hideMenu} user={this.props.user} notifications={this.props.notifications}
                />
            </div>
        </div>
    );
  }
}
export default UserMenu;