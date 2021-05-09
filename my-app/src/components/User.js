import React, {Component} from "react";
import "../css/User.css";
import VideoRow from "../components/VideoRow";
import 'bootstrap/dist/css/bootstrap.css';

// import bootstrap from "bootstrap";
class User extends Component {
  render(){
    return (
        <div>
            <div className="profile-header">
                <img className="user-profile-image" src="https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/userImages%2F%40cboothe?alt=media&token=32d57150-275d-4a88-8417-090498ffeada"/>
                <p className="user-profile-name">Connor Boothe</p>
                <p className="profile-bio">This is where the bio will go blah blah blah blah blah.</p>
            </div>
            
            <h2 className="text-light video-label">Videos</h2>
            <div className="profile-video-container">
                <VideoRow/>
                <VideoRow/>
                <VideoRow/>
            </div>
        </div>
    );
  }
}
export default User;