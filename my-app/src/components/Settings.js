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
      bio:"",
      showBioSuccess: "none",
      keywords:[]
    }
    this.updateBio = this.updateBio.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this)
  }
  componentDidMount(){
    console.log(this.props.user.Subscription_Level)
    this.props.getKeywords();
  }
  handleBioChange(e){
    this.setState({bio: e.target.value});
  }
  showBioSuccessMessage(){
    this.setState({showBioSuccess: "block"});
  }
  createBioForm(){
      return(
        <div>
          <textarea onChange={this.handleBioChange} className="update-bio-input" placeholder="Write something about your academic experience"></textarea>
          <p className="text-light helper-text">This will be displayed on your profile</p>
          <button onClick={this.updateBio}className="btn btn-primary">Update Bio</button>
          <p className="text-light bio-msg" style={{display: this.state.showBioSuccess}}>Bio successfully updated</p>
        </div>
      );
    
  }
  updateBio(){
    if(this.state.bio !== "") {
      const api_route = process.env.REACT_APP_REQUEST_URL+'/API/UpdateBio';
      const postBody = {
          userId: this.props.user._id,
          bio: this.state.bio,
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
      .then((user)=>{
        this.props.setUser(user)
        this.showBioSuccessMessage();
      })
    }
   
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
            
            <h2 className="text-light update-avatar-title">Update your avatar</h2>
            <AvatarCropper user={this.props.user} setUser={this.props.setUser}/>
            <div className="update-bio">
              <h2 className="text-light update-avatar-title">Update Bio</h2>
            {this.createBioForm()}
            <p></p>
            </div>
            
        </div>
    );
  }
}
export default Settings;