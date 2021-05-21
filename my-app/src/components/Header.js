import React, {Component} from "react";
import logo from "../images/degreeMeLogo.svg";
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
            <Link to="/Home"><img className="site-logo" src={logo}/></Link></li>
            <li className="search-li"></li>
            {/* <li className="coming-soon-text">DegreeMe Video Collection Tool</li> */}
          </ul>
          <SearchBar />
          <UserMenu user={this.props.user} logout={this.props.logout} 
          setUser={this.props.setUser}/>
        </div>
        // <p>Coming soon to iOs</p>
    );


  }
}

export default Header;