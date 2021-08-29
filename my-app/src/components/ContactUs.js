import React, { Component } from "react";
import '../css/ContactUs.css';
import { Link } from 'react-router-dom';

class ContactUs extends Component {

    render() {
        return (
            <div className="contact-wrapper">
            <h3 className="text-light contact-us">Contact us if you experience any issues or have any feature suggestions:</h3>
            <div className="links">
                <p className="text-light">
                    <a href="mailto:chithe@uncc.edu.com">chithe@uncc.edu</a>
                </p>
                <p className="text-light">
                <a href="mailto:connorboothe@gmail.com">connorboothe@gmail.com</a>

                </p>
            </div>
            
            </div>
            
        );
    }
}

export default ContactUs;