import React, {Component} from "react";
import '../css/VideoUploader.css';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Redirect, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           user: {},
           email:"",
           password:"",
           redirect:false,
           showError: "none",
           error: "Username or password incorrect"
        };

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.login = this.login.bind(this)
        this.renderLoggedIn = this.renderLoggedIn.bind(this)
        this.showError = this.showError.bind(this)
    }
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
  showError(){
      this.setState({showError: "block"})
  }
  renderLoggedIn(){
          return(
<div className="login-container">
            <h1 className="login-title">Login</h1>
            <div className="login-container-child">
            <ul>
                <li>
                <div className="login-input-container">

                    <p className="login-label">Email</p>
                    <input type="email" name ="Email" onChange={this.handleEmailChange}/>
                </div>
                </li>
                <li>
                    <div className="login-input-container">
                        <p  className="login-label">Password</p>
                        <input type="password" name ="Password" onChange={this.handlePasswordChange}/>
                    </div>
                </li>
                <li>
                    <button className="btn btn-primary login-btn" onClick={this.login}>Login</button>
                </li>
                <li>
                    <Link to="/ResetPassword">
                        <p className="forgot-pw">Forgot Password?</p>
                    </Link>
                </li>
                <li>
                        <Link to="/CreateAccount" className="create-account-link btn btn-success">
                            Create New Account
                        </Link>
                   </li>
                <li>
                  <p className="error" style={{display: this.state.showError}}>{this.state.error}</p>
                </li>
            </ul>
            </div>
        </div>
          );
  }
    login(){
        var isEmail = this.validateEmail(this.state.email)
        if(this.state.email === "" ||
        this.state.password === ""){
            this.setState({error: "Please enter email and password"})
            this.showError();
        }
        else if(!isEmail){
            this.setState({error: "Invalid email format"})
            this.showError();
        }
        else {
            const api_route = 'http://localhost:8080/API/Login';
            const postBody = {
                Email: this.state.email,
                Password: this.state.password
            };
            const requestMetadata = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postBody),
            };
            fetch(api_route, requestMetadata)
            .then(res => res.json())
            .then((user)=>{
                if(!user){
                    this.setState({error: "Incorrect email or password"})
                    this.showError();
                }
                else {
                    this.props.setUser(user);
                    this.props.getUnreadCount();
                    Cookies.set('user', JSON.stringify(user), {secure: true, sameSite: "strict"}) 
                    this.setState({redirect: true})
                    this.props.getUnreadCount()
                }
               
            })
        }
       
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value});
      }
      handlePasswordChange(e) {
        this.setState({password: e.target.value});
      }
    render(){
        if(!this.state.redirect){
            return (
                <div>
                    {this.renderLoggedIn()}
                </div>
            );
        
        }
        else{
            return (
                <Redirect to="/Home" />
            );
        }
  }
}

export default LoginForm;