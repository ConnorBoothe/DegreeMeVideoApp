import React, {Component} from "react";
import "../css/UserMenu.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
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
        this.hideUnreadCount = this.hideUnreadCount.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({showNotifications: "none"});
        }
    }
    toggleNotifications(){
        this.hideUnreadCount();
        if(this.state.showNotifications == "none"){
            this.setState({showNotifications: "inline-block",
            menuTitle: "Notifications"
        });
        }
        else {
            if(this.state.menuTitle == "Account"){
                this.setState({menuTitle: "Notifications"});
            }
            else {
                this.setState({showNotifications: "none",
                menuTitle: "Notifications"});
            }
            
        }
    }
    hideUnreadCount(){
        this.setState({showUnreadCount: "none"})
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
        if(this.state.showNotifications == "none"){
            this.setState({showNotifications: "inline-block",
            menuTitle: "Account"
        });
        }
        else {
            if(this.state.menuTitle == "Notifications"){
                this.setState({menuTitle: "Account"});
            }
            else {
                this.setState({showNotifications: "none",
                menuTitle: "Account"});
            }
        }
    }
  render(){
    return (
        <div className="user-menu" ref={this.wrapperRef}>
            <ul>
                <li onClick={this.hideMenu}>
                <Link to="/Upload">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cloud-upload-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"/>
                    </svg>
                </Link>
                </li>
                <li onClick={this.toggleNotifications}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                    </svg>
                    <p className="notification-badge" style={{display: this.state.showUnreadCount}}>9+</p>

                </li>
                <li onClick={this.toggleAccount}>
                    <img className="user-image" src="https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/userImages%2F%40cboothe?alt=media&token=32d57150-275d-4a88-8417-090498ffeada"/>
                </li>
            </ul>
            <div className="user-dropdown-container" style={{"display": this.state.showNotifications}}>
                <h1 className="user-dropdown-title">{this.state.menuTitle}</h1>
                <NotificationList type={this.state.menuTitle}/>
            </div>
        </div>
    );


  }
}

export default UserMenu;