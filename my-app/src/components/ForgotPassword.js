import React, {Component} from "react";
import '../css/VideoUploader.css';
import '../css/Login.css';
import '../css/ResetPassword.css';
import 'bootstrap/dist/css/bootstrap.css';
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email:""
        };
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.generateResetPWLink = this.generateResetPWLink.bind(this)
        
    }
   handleEmailChange(e){
       this.setState({email: e.target.value})
   }
   generateResetPWLink(){
    const api_route = process.env.REACT_APP_REQUEST_URL+'/API/GenerateResetPasswordLink';
   const postBody = {
     Email: this.state.email,
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
     .then((res) => {
      
       console.log(res)
       
       
     })
   }
   
    
   validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
    render(){
            return (
                <div className="reset-password">
                   <h3 className="text-light">Reset Your Password</h3>
                   <div className="login-input-container">
                        <p className="forgot-pw-label text-light">Enter your Email</p>
                        <input placeholder="example@gmail.com" type="email" name ="Email" className="forgot-pw-email" onChange={this.handleEmailChange}/>
                    </div>
                    <button className="btn btn-primary" disabled={!this.validateEmail(this.state.email)}
                    onClick={this.generateResetPWLink}>Send password reset email</button>
                </div>
            );
  }
}

export default ForgotPassword;