import React, {Component} from "react";
import "../css/UserMenu.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import User from "./User";
import Cookies from "js-cookie"


// import bootstrap from "bootstrap";
class Subscriptions extends Component {
    constructor(props){
        super(props)
        this.state = {
           dob:"12/17/1996",
           street_number: "5626 Landale Ct",
           postal_code: "28027",
           city: "Concord",
           country:"US",
           state:"NC",
           phone:"980-248-3708",
           ssn:"2724",
           routing_number: "110000000",
           account_number:"000123456789"
        }
        this.createStripeAccount = this.createStripeAccount.bind(this);
    }
    createStripeAccount(){

        if(Cookies.get("user") !== undefined) {
            var user = JSON.parse(Cookies.get("user"));
            console.log(user)
        const api_route = 'http://localhost:8080/API/CreateStripeAccount';
          const postBody = {
            user_id: user._id,
            first_name: user.First_Name,
            last_name: user.Last_Name,
            email: user.Email,
            dob: this.state.dob,
            street_number: this.state.street_number,
            postal_code: this.state.postal_code,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            phone: this.state.phone,
            ssn: this.state.ssn,
            routing_number: this.state.routing_number,
            account: this.state.account_number,
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };
        fetch(api_route, requestMetadata)
        .then(res => res.json())
        .then((video)=>{
          this.setState({videoId: video._id})
          this.showModal();
        })
        .catch((err)=>{
          this.setState({type: "An error occurred. Please try again"})
        })
    }
    }
  render(){
    return (
        <div className="subscriptions">
            <h1 className="text-light">Subscribe for unlimited access to content</h1>
            {/* line1: req.body.street_number,
                line2: req.body.route,
            postal_code: req.body.postal_code,
            city: req.body.locality,
            state: req.body.administrative_area_level_1,
            country: req.body.country, //need to convert to ISO 3166-1 alpha-2 code (Hardcoded to stay 'US' for now on views page) */
  }
            <p className="text-light">Street Number</p>
            <input type="text" />
            <p className="text-light">Route</p>
            <input type="text" />
            <p className="text-light">Postal Code</p>
            <input type="text" />
            <p className="text-light">City</p>
            <input type="text" />
            <p className="text-light">State</p>
            <input type="text" />
            <p className="text-light">Country</p>
            <input type="text" />
            <button type="submit" className="btn btn-primary" onClick={this.createStripeAccount}
            >Create Payment Account</button>

        </div>
    );
  }
}
export default Subscriptions;