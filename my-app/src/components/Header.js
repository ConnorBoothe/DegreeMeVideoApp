import React, {Component} from "react";
import desktopLogo from "../images/degreeMeLogo.svg";
import mobileLogo from "../images/degreeMeHashTag.svg";
import "../css/Header.css";
import UserMenu from "./UserMenu"
import SearchBar from "./SearchBar"
import { Link } from 'react-router-dom';
import { withRouter} from 'react-router-dom';

// import bootstrap from "bootstrap";
class Header extends Component {
  constructor(props){
    super(props)
    this.redirectToResults = this.redirectToResults.bind(this)
  }
  redirectToResults(){
      this.props.history.push("/SearchResults")
}
renderLogo(){
  if(this.props.user._id !== undefined){
    console.log("user is ")
    return(
      <Link to="/Home"><img className="site-logo desktop-logo" src={desktopLogo} alt="Logo" /><img className="site-logo mobile-logo" src={mobileLogo} alt="Logo" /></Link>
    )
  }
  else {
    return (
      <Link to="/"><img className="site-logo desktop-logo" src={desktopLogo} alt="Logo" /><img className="site-logo mobile-logo" src={mobileLogo} alt="Logo" /></Link>
    );
  }
}
  render(){
    return (
        <div className="header">
          <ul>
            <li className="logo-link">
              {this.renderLogo()}
            </li>
            <li className="search-li"></li>
            {/* <li className="coming-soon-text">DegreeMe Video Collection Tool</li> */}
          </ul>
          <SearchBar setSearchValue={this.props.setSearchValue}
          searchValue={this.props.searchValue}
          redirectToResults={this.redirectToResults}/>
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

export default withRouter(Header);