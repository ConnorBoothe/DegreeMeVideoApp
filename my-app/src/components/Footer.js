import React, {Component} from "react";
import "../css/Footer.css";
import { Link } from 'react-router-dom';


// import bootstrap from "bootstrap";
class Footer extends Component {
  render(){
    return (
        <div className="footer">
          <p className="text-light footer-text">DegreeMe {new Date().getFullYear()}</p>
          <Link to="/ContactUs" className="text-light">
            Contact Us
          </Link>
        </div>
        // <p>Coming soon to iOs</p>
    );


  }
}

export default Footer;