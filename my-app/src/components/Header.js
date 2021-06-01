import React, {Component} from "react";
import desktopLogo from "../images/degreeMeLogo.svg";
import mobileLogo from "../images/degreeMeHashTag.svg";
import "../css/Header.css";
import UserMenu from "./UserMenu"
import SearchBar from "./SearchBar"
import { Link } from 'react-router-dom';

// import bootstrap from "bootstrap";
class Header extends Component {
  constructor(props){
    super(props)
    console.log(this.props.user)
  }
 
  render(){
    return (
        <div className="header">
          <ul>
            <li className="logo-link">
            <Link to="/Home"><img className="site-logo desktop-logo" src={desktopLogo} /><img className="site-logo mobile-logo" src={mobileLogo} /></Link></li>
            <li className="search-li"></li>
            {/* <li className="coming-soon-text">DegreeMe Video Collection Tool</li> */}
          </ul>
          <SearchBar setSearchValue={this.props.setSearchValue}
          searchValue={this.props.searchValue}/>
          <UserMenu user={this.props.user} logout={this.props.logout} 
          setUser={this.props.setUser} notifications={this.props.notifications}
          getNotifications={this.props.getNotifications}
          hideUnreadCount={this.props.hideUnreadCount}
          showNotificationBadge = {this.props.showNotificationBadge}
          notificationCount = {this.props.notificationCount}
          handleAutocompleteChange={this.props.handleAutocompleteChange}/>
        </div>
        // <p>Coming soon to iOs</p>
    );


  }
}

export default Header;