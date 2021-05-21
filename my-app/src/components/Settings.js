import React, {Component} from "react";
import "../css/Settings.css";
import AvatarCropper from "../components/AvatarCropper";
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';

class Settings extends Component {
  constructor(props){
    super(props)
    this.state = {
      bio:"",
      showBioSuccess: "none"
    }
    this.updateBio = this.updateBio.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this)
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
          <p className="text-light" style={{display: this.state.showBioSuccess}}>Bio successfully updated</p>
        </div>
      );
    
  }
  updateBio(){
    const api_route = 'http://localhost:8080/API/UpdateBio';
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
          alert("done")
          this.props.setUser(user)
          this.showBioSuccessMessage();
          // Cookies.set("user", user)
        })
  }
  render(){
    return (
        <div>
            <h2 className="text-light video-label">Settings</h2>
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