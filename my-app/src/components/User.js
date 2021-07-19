import React, {Component} from "react";
// import "../css/User.css";
import VideoList from "../components/VideoList";
import ReviewModal from "../components/ReviewModal"
import ReviewsList from "../components/ReviewsList"
// import "../css/VideoRow.css"
import 'bootstrap/dist/css/bootstrap.css';

class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      user:{},
      content:"videos",
      videosBorder: "2px solid #007bff",
      reviewsBorder: "0"
    }
    this.handleContentChange = this.handleContentChange.bind(this)
    this.getUser = this.getUser.bind(this)
  }
  componentDidMount(){
    this.getUser()
  }
  handleContentChange(){

    if(this.state.content === "videos"){
      this.setState({content: "reviews", 
      videosBorder:"none", reviewsBorder: "2px solid #007bff"})
    }
    else{
      this.setState({content: "videos", 
      videosBorder:"2px solid #007bff", reviewsBorder: "none"})
    }
  }
  renderContent(){
    if(this.state.content === "videos") {
      return(
        <div className="user-content-container">
          <VideoList videos={this.state.user.Videos}/>
        </div>
      )
    }
    else {
      return(
        <div className="user-content-container">
          <ReviewsList />
        </div>
      )
    }
  }
  getUser(){
    const api_route = 'http://localhost:8080/API/GetUser/'+window.location.href.split("/")[4];
    const requestMetadata = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
            };
    fetch(api_route, requestMetadata)
    .then(response => response.json())
        .then(result => {
            this.setState({user: result})
        })
  }
  render(){
    return (
        <div>
            <div className="profile-header">
                <img className="user-profile-image" src={this.state.user.Image} alt="User"/>
                <p className="user-profile-name">{this.state.user.First_Name + " " + this.state.user.Last_Name}</p>
                <p className="profile-bio">{this.state.user.Bio}</p>
                <ReviewModal user={this.props.user}/>
            </div>
            <ul className="actions-list" >
              <li onClick={this.handleContentChange} style={{borderBottom: this.state.videosBorder}}>            
                <h2 className="text-light video-label" >Videos</h2>
            </li>
            <li onClick={this.handleContentChange} style={{borderBottom: this.state.reviewsBorder}}>
              <h2 className="text-light video-label" >Reviews</h2>
            </li>
            </ul>
            <div className="profile-video-container">
              {this.renderContent()}  
            </div>
        </div>
    );
  }
}
export default User;