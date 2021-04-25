import React, {Component} from "react";
import logo from "./images/degreeMeLogo.svg";
import "./css/Header.css";
// import bootstrap from "bootstrap";
class Header extends Component {
  render(){
    return (
      
        <div className="header">
          <ul>
            <li className="logo-link"><img className="site-logo" src={logo}/></li>
            <li className="coming-soon-text">DegreeMe Video Collection Tool</li>
          </ul>
        </div>
        // <p>Coming soon to iOs</p>
    );


  }
}

export default Header;