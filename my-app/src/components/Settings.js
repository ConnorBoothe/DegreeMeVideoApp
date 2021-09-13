import React, {Component} from "react";
import "../css/Settings.css";
import DeleteAccountModal from "../components/DeleteAccountModal";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
class Settings extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false
    }
    this.hideModal = this.hideModal.bind(this)
    this.showModal = this.showModal.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
  }
  showModal(){
    this.setState({isOpen: true})
  }
  hideModal(){
    this.setState({isOpen: false})
  }
  deleteAccount(){
    var userId = this.props.user._id;
    if(userId === undefined) {
      userId = JSON.parse(Cookies.get("user"))._id
    }
    const api_route = process.env.REACT_APP_REQUEST_URL+'/API/DeleteAccount';
        const postBody = {
            userId: userId,
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody),
        };
        fetch(api_route, requestMetadata)
        fetch(api_route, requestMetadata)
        .then(res => res.json())
        .then((result)=>{
          this.props.logout();
          this.hideModal();
        })
  }
  componentDidMount(){
    console.log(this.props.user.Subscription_Level)
    this.props.getKeywords();
  }
  renderUpgradeBtn(){
    if(this.props.user.Subscription_Level === "Free Tier") {
      return(
        <Link to="/Upgrade" className="btn btn-primary settings-upgrade-acct">Upgrade your account</Link>
      )
    }
  }
  render(){
    var userId = this.props.user._id;
    if(userId === undefined) {
      userId = JSON.parse(Cookies.get("user"))._id
    }    
    if(userId !== undefined){
      return (
        <div className="settings-wrapper">
            <h2 className="text-light settings-label">Settings</h2>
            {this.renderUpgradeBtn()}
            <h4 className="text-light delete-account-title">Danger Zone</h4>
            <p className="text-light">This action is not reversible</p>
            <button className="btn btn-danger" onClick={this.showModal}>Delete Account</button>
            <DeleteAccountModal isOpen={this.state.isOpen} showModal={this.showModal}
            hideModal={this.hideModal} deleteAccount={this.deleteAccount}/>
        </div>
    );
    }
    else {
      return (
        <Redirect to="/LandingPage"></Redirect>
      );
    }
   
  }
}
export default Settings;