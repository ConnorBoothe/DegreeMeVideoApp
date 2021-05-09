import React, {Component} from "react";
import logo from "../images/degreeMeLogo.svg";
import "../css/Header.css";
import UserMenu from "./UserMenu"
import SearchBar from "./SearchBar"
import { Link } from 'react-router-dom';

// import bootstrap from "bootstrap";
class Header extends Component {
  render(){
    return (
      
        <div className="header">
          <ul>
            <li className="logo-link">
            <Link to="/Home"><img className="site-logo" src={logo}/></Link></li>
            <li classNAme="search-li"></li>
            {/* <li className="coming-soon-text">DegreeMe Video Collection Tool</li> */}
          </ul>
          <SearchBar />
          <UserMenu />
        </div>
        // <p>Coming soon to iOs</p>
    );


  }
}

export default Header;