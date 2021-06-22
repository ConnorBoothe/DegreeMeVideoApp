import React, {Component} from "react";
import '../css/CreateAccount.css';
import 'bootstrap/dist/css/bootstrap.css';
import KeyWordsInput from "../components/KeyWordsInput.js";

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            first_name:"",
            last_name: "",
            email:"",
            password:"",
            error: "Please fill out all fields",
            showError: "none",
            errorClass:"error",
            keywords:[]
        };
        this.createAccount = this.createAccount.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.showError = this.showError.bind(this);
        this.hideError = this.hideError.bind(this);
        this.setError = this.setError.bind(this);
        this.keyword = React.createRef();
        this.addKeyword = this.addKeyword.bind(this);
        this.removeKeyword = this.removeKeyword.bind(this);


    }

    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

    createAccount(){
      var isEmail = this.validateEmail(this.state.email);
      if(this.state.first_name === "" ||
      this.state.last_name === "" ||
      this.state.email === "" ||
      this.state.password === "" ) {
        this.showError();
      }
      else if (!isEmail){
        this.showError();
        this.setState({error: "Not a valid email"});
      }
      else {
        const api_route = 'http://localhost:8080/API/AddUser';
        const postBody = {
            First_Name: this.state.first_name,
            Last_Name: this.state.last_name,
            Email: this.state.email,
            Password: this.state.password,
            Keywords: this.state.keywords
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
        .then((res)=>{
            if(res === "This email is already in use"){
              this.setState({
                errorClass: "error",
                error: res,
                showError: "block"
              })
            }
            else{
              this.setState({
                errorClass: "success",
                error: "Account Successfully Created",
                showError: "block"
              })
            }
        })
      }
        
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
    showError(){
      this.setState({showError: "block"})
    }
    hideError(){
      this.setState({showError: "none"})
    }
    setError(error){
      this.setState({error: error})
    }
    addKeyword(){
      //if keyword isn't empty, add it
      if(this.keyword.current.value !== ""){
          var newArray = this.state.keywords.concat(this.keyword.current.value)
          this.setState({ keywords: newArray })
          this.keyword.current.value = "";
      }
    }
    //remove keyword by index
    removeKeyword(index){
        const newArray = this.state.keywords
        newArray.splice(index,1)
        this.setState({keywords: newArray}); 
    }
    render(){
        
    return (
        <div className="login-container">
            <h2 className="create-account-title text-light">Create Account</h2>
            <ul>
            <li>
            <div className="create-account-input-container">
                <p className="create-account-input-label">First Name</p>
                <input type="text" name ="First_Name" onChange={this.handleFirstNameChange}/>
            </div>
            </li>
            <li>
              <div className="create-account-input-container">
              <p className="create-account-input-label">Last Name</p>
                    <input type="text" name ="Last_Name" onChange={this.handleLastNameChange}/>
              </div>
                </li>
                <li>
                <div className="create-account-input-container">
                    <p className="create-account-input-label">Email</p>
                    <input type="email" name ="Email" onChange={this.handleEmailChange}/>
               </div>
                </li>
                <li>
                  <div className="create-account-input-container">
                      <p className="create-account-input-label">Password</p>
                      <input type="password" name ="Password" onChange={this.handlePasswordChange}/>
                  </div>
                </li>
                <li>
                  <div className="keywords-create-account-wrapper">
                    <p className="option-keywords-text"> Add Keywords <i className="text-light">Optional</i>
                      </p>
                    <KeyWordsInput  addKeyword={this.addKeyword} removeKeyword={this.removeKeyword}
                    keyword={this.keyword} keywords = {this.state.keywords}/>
                  </div>
                 
                </li>
                <li>
                    <div className="btn-container">
                      <button className="btn btn-primary" onClick={this.createAccount}>Create Account</button>
                    </div>
                </li>
                <li>
                  <p className={this.state.errorClass} style={{display: this.state.showError}}>{this.state.error}</p>
                </li>
            </ul>
        </div>
    );
  }
}

export default CreateAccount;