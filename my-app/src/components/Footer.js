import React, {Component} from "react";
import "../css/Footer.css";


// import bootstrap from "bootstrap";
class Footer extends Component {
  constructor(props){
    super(props)
    console.log(this.props.user)
  }
 
  render(){
    return (
        <div className="footer">
          <p className="text-light footer-text">DegreeMe {new Date().getFullYear()}</p>
        </div>
        // <p>Coming soon to iOs</p>
    );


  }
}

export default Footer;