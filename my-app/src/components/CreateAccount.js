import React, {Component} from "react";
import '../css/VideoUploader.css';
import 'bootstrap/dist/css/bootstrap.css';


class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            first_name:"",
            last_name: "",
            email:"",
            password:""
        };
        this.createAccount = this.createAccount.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);


    }
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

    createAccount(){
        const api_route = 'http://localhost:8080/API/AddUser';
        const postBody = {
            First_Name: this.state.first_name,
            Last_Name: this.state.last_name,
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
        .then((res)=>{
            console.log(res)
          alert("Request complete")
        })
    }
    handleFirstNameChange(e) {
        this.setState({first_name: e.target.value});
      }
      handleLastNameChange(e) {
        this.setState({last_name: e.target.value});
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
            <h1 className="video-upload-title">Create Account</h1>
            <ul>
            <li>
                <p>First Name</p>
                <input type="text" name ="First_Name" onChange={this.handleFirstNameChange}/>
            </li>
            <li>
                    <p>Last Name</p>
                    <input type="text" name ="Last_Name" onChange={this.handleLastNameChange}/>

                </li>
                <li>
                    <p>Email</p>
                    <input type="email" name ="Email" onChange={this.handleEmailChange}/>
                </li>
                <li>
                    <p>Password</p>
                    <input type="password" name ="Password" onChange={this.handlePasswordChange}/>
                </li>
                <li>
                    <button className="btn-primary" onClick={this.createAccount}>Login</button>
                </li>
                <li>
                  <p className="error">{this.state.error}</p>
                </li>
            </ul>
        </div>
    );
  }
}

export default CreateAccount;