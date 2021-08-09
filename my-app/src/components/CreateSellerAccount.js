import React, {Component} from "react";
import "../css/UserMenu.css";
import 'bootstrap/dist/css/bootstrap.css';
import "../css/CreateSellerAccount.css"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link } from 'react-router-dom';
import User from "./User";
import Cookies from "js-cookie"


// import bootstrap from "bootstrap";
class CreateSellerAccount extends Component {
    constructor(props){
        super(props)
        this.state = {
           dob:"",
           street_number: "",
           postal_code: "",
           city: "",
           country:"US",
           state:"North Carolina",
           phone:"",
           ssn:"",
           routing_number: "",
           account_number:"",
           formComplete: false,
           formSubmitted: false,
           error: false,
           success: false
        }
        this.createStripeAccount = this.createStripeAccount.bind(this);
        this.createStateDropdown = this.createStateDropdown.bind(this);
        this.handleStreetNumberChange = this.handleStreetNumberChange.bind(this)
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handlePostalChange = this.handlePostalChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this)
        this.handleDOBChange = this.handleDOBChange.bind(this)
        this.handleSSNChange = this.handleSSNChange.bind(this)
        this.handleRoutingChange = this.handleRoutingChange.bind(this)
        this.handleAccountChange = this.handleAccountChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.showLoader = this.showLoader.bind(this);
    }
    validateInputFields(){
        if(this.state.routing_number.length !== 9) {
            return "Routing number length must be 9";
        }
        else if(this.state.account_number.length !== 12) {
            return "Account number length must be 12";
        }
    }
    handleDOBChange(e){
        this.setState({dob: e.target.value})
    }
    handleStreetNumberChange(e){
        this.setState({street_number: e.target.value})
    }
    handlePostalChange(e){
        this.setState({postal_code: e.target.value})
    }
    handleCityChange(e){
        this.setState({city: e.target.value})
    }
    handleStateChange(e){
        this.setState({city: e.target.value})
    }
    // handlePhoneChange(e){
    //     console.log("change")
    //     // this.setState({phone: e.target.value})
    // }
    showError(){
        if(this.state.error !== false) {
            return (
                <div className="create-payment-message">
                <p className=" badge-danger create-payment-account-error ">{this.state.error}</p>
                </div>
            );
            
        }
    }
    showSuccess(){
        if(this.state.success) {
            return (
                <div className="create-payment-message">
                <p className=" badge-success create-payment-account-error ">Payment Account Added</p>
                </div>
            );
            
        }
    }
    showLoader(){
        if(this.state.formSubmitted) {
            return (
                <div className="create-payment-message">
                    <div className="loader-create-payment-account"></div>
                    <p className="text-light">Creating Payment Account</p>
                </div>
            );
        }
    }
    handleSSNChange(e){
        if(isNaN(e.target.value)){
            e.target.value = this.state.ssn;
        }
        else if(e.target.value.length < 5) {
            this.setState({ssn: e.target.value})
        }
       
        else {
            e.target.value = this.state.ssn;
        }
    }
    handleRoutingChange(e){
        if(isNaN(e.target.value) || e.target.value.length > 9) {
            e.target.value = this.state.routing_number;
        }
        else {
            this.setState({routing_number: e.target.value})
        }
    }
    handleAccountChange(e){
        if(isNaN(e.target.value) || e.target.value.length > 12) {
            e.target.value = this.state.account_number;
        }
        else {
            this.setState({account_number: e.target.value})
        }
    }
    createStripeAccount(){
        if(Cookies.get("user") !== undefined) {
            this.setState({formSubmitted: true, error: false})
        var user = JSON.parse(Cookies.get("user"));
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
        .then((result)=>{
            if(result._id !== undefined) {
                //call setUser here with new user object
                this.setState({success: true, formSubmitted: false})
                this.props.setUser(result)
                Cookies.set("user", result, {secure: true, sameSite: "strict"})

            }
            else {
                this.setState({error: result.raw.message, formSubmitted: false})
            }
        })
        .catch((err)=>{
        })
    }
    }
    createStateDropdown(){
        return (
            <div className="state-select-container">
                <select className="state-select" name="state-select" onChange={this.handleStateChange}>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Delaware">Delaware</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="North Carolina" selected>North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                    <option value="District of Columbia">District of Columbia</option>
                </select>
            </div>
        )
    }
  render(){
    return (
        <div className="create-seller-account">
            <h4 className="text-light create-seller-title">Create seller account so you can be paid for your content</h4>
            <div className="badge badge-warning create-seller-message">
                We do not save any of the below data on our servers. 
            </div>
            <p className="text-light">Your data will be stored with our payments processor, Stripe.</p>
            <a href="https://stripe.com/legal" className="stripe-link" target="_blank">Stripe's terms and conditions</a>
            <input type="hidden" autocomplete="false"/>
            <ul className="create-seller-list">
                
       
           <li className="create-seller-li-1">
            <div className="create-seller-input-container">
                <p className="text-light create-seller-label">Street Number</p>
                <input className="create-seller-input" type="text" onChange={this.handleStreetNumberChange}
                autocomplete="off"/>
            </div>
            <div className="create-seller-input-container">
                <p className="text-light create-seller-label" >Postal Code</p>
                <input autocomplete="off" type="text" onChange={this.handlePostalChange}
                className="create-seller-input" />
            </div>
            <div className="create-seller-input-container">
                <p className="text-light create-seller-label" >City</p>
                <input autocomplete="off" type="text" onChange={this.handleCityChange}
                className="create-seller-input"  />
            </div>
            <div className="create-seller-input-container">
                <p className="text-light create-seller-label">State</p>
                {this.createStateDropdown()}
            </div>
            <div className="create-seller-input-container">
                <p className="text-light create-seller-label" >Country</p>
                <input autocomplete="off" className="create-seller-input" type="text" disabled value="US" />
            </div>
            </li>
            <li className="create-seller-li-2">
            <div className="create-seller-input-container">
                <p className="text-light create-seller-label" >Phone Number</p>
                <PhoneInput
                    country={'us'}
                    value={this.state.phone}
                    onChange={phone => this.setState({ phone })}
                    inputStyle={{
                        border: "none",
                        backgroundColor: "#282c34"
                      }}
                    />
  
                {/* <input  className="create-seller-input" type="tel" onChange={this.handlePhoneChange} /> */}
            </div>
            <div className="create-seller-input-container">
                <p className="text-light create-seller-label" >Date of Birth</p>
                <input autocomplete="off" className="create-seller-input" type="date" onChange={this.handleDOBChange} />
            </div>
            <div className="create-seller-input-container">
                <p className="text-light create-seller-label" >Last 4 Digits of Social Security Number</p>
                <input autocomplete="off" className="create-seller-input" type="text" onChange={this.handleSSNChange}/>
            </div>
            <div className="create-seller-input-container">
                <p className="text-light create-seller-label" >Routing Number</p>
                <input autocomplete="off" className="create-seller-input" type="text" onChange={this.handleRoutingChange}/>
            </div>
            <div className="create-seller-input-container">
                <p className="text-light create-seller-label"  >Account Number</p>
                <input className="create-seller-input" type="text" onChange={this.handleAccountChange}/>
            </div>
            </li>
            </ul>
            <br></br>
            <button type="submit" className="btn btn-primary" onClick={this.createStripeAccount}
            disabled={!(this.state.dob !== "" && this.state.street_number !== ""
            && this.state.postal_code !== "" && this.state.city !== "" 
            && this.state.state !== "" && this.state.ssn !== ""
            && this.state.routing_number !== "" && this.state.account_number !== ""
            && this.state.phone !== "") || this.state.formSubmitted}
            >Create Payment Account</button>
            {this.showLoader()}
            {this.showError()}
            {this.showSuccess()}
            

        </div>
    );
  }
}
export default CreateSellerAccount;