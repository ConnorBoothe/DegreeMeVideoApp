import React, {Component} from "react";
import "../css/Settings.css";
import AvatarCropper from "../components/AvatarCropper";
import KeyWordsInput from "../components/KeyWordsInput";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

class Settings extends Component {
  constructor(props){
    super(props)
    this.state = {
      keywords:[]
    }
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
    return (
        <div className="settings-wrapper">
            <h2 className="text-light settings-label">Settings</h2>
            {this.renderUpgradeBtn()}
            <h2 className="text-light update-avatar-title">Add keywords to your profile</h2>
           <div className="keywords-settings-wrapper">
              <KeyWordsInput addKeyword = {this.props.addKeyword} 
                removeKeyword = {this.props.removeKeyword} keywords = {this.props.keywords}
                keyword = {this.props.keyword} />
           </div> 
        </div>
    );
  }
}
export default Settings;