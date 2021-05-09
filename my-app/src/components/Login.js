import React, {Component} from "react";
import '../css/VideoUploader.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           user: {},
           email:"",
           password:""
        };
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.login = this.login.bind(this)

    }
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
  
    login(){
        const api_route = 'http://localhost:8080/API/Login';
        const postBody = {
            Email: this.state.email,
            Password: this.state.password
        };
        console.log(postBody)
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };
        fetch(api_route, requestMetadata)
        .then(res => res.json())
        .then((user)=>{
          this.setState({user: user})
          console.log(this.state.user)
        })
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value});
      }
      handlePasswordChange(e) {
        this.setState({password: e.target.value});
      }
    render(){
        
    return (
        <div className="video-upload-container">
            <h1 className="video-upload-title">Login</h1>
            <ul>
                <li>
                    <p>Email</p>
                    <input type="email" name ="Email" onChange={this.handleEmailChange}/>
                </li>
                <li>
                    <p>Password</p>
                    <input type="password" name ="Password" onChange={this.handlePasswordChange}/>
                </li>
                <li>
                    <button className="btn-primary" onClick={this.login}>Login</button>
                </li>
                <li>
                    <Router>
                        <a href="/CreateAccount">
                        Create an account in seconds
                        </a>
                    </Router>
                   </li>
                <li>
                  <p className="error">{this.state.error}</p>
                </li>
            </ul>
        </div>
    );
  }
}

export default LoginForm;