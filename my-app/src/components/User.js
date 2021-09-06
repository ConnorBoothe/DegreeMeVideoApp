import React, {Component} from "react";
// import "../css/User.css";
import VideoList from "../components/VideoList";
import ReviewModal from "../components/ReviewModal"
import ReviewsList from "../components/ReviewsList"
import AvatarCropperModal from '../components/AvatarCropperModal'
import 'bootstrap/dist/css/bootstrap.css';
import htmlDecode from '../GlobalFunctions/HTMLDecode'
import TextareaAutosize from 'react-textarea-autosize';
var decode = new htmlDecode();
class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      user:{},
      content:"videos",
      videosBorder: "2px solid #007bff",
      reviewsBorder: "0",
      userCanEdit: false,
      isOpen: false,
      showBioSuccess: "none",
      focusedBioClass: "not-focused-bio",
      showBioIcons: "none",
      textAreaDisabled: true,
      showEditButton: "block",
      oldBio:""
    }
    this.handleContentChange = this.handleContentChange.bind(this)
    this.getUser = this.getUser.bind(this)
    this.showReviewButton = this.showReviewButton.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.updateBio = this.updateBio.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this)
    this.showBioSuccessMessage = this.showBioSuccessMessage.bind(this)
    this.focusBio = this.focusBio.bind(this)
    this.unfocusBio = this.unfocusBio.bind(this)

  }
  componentDidMount(){
    this.getUser()
    this.setState({newBio: this.state.bio})
  }
  handleBioChange(e){
    if(e.target.value.length < 101) {
      this.setState({bio: e.target.value});
    }
    else{
      this.setState({bio: e.target.value});   
     }
    
  }
  updateBio(){
    if(this.state.bio !== "") {
      const api_route = process.env.REACT_APP_REQUEST_URL+'/API/UpdateBio';
      const postBody = {
          userId: this.state.user._id,
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
        this.getUser();
        this.setState({
          focusedBioClass: "not-focused-bio", 
          showBioIcons: "none", 
          showEditButton: "block"
      })
      })
    }
   
  }

  showModal(){
    this.setState({isOpen: true})
  }
  hideModal(){
    this.setState({isOpen: false})
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
    let id = this.props.match.params.id
    const api_route = process.env.REACT_APP_REQUEST_URL+'/API/GetUser/'+id;
    const requestMetadata = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
            };
    fetch(api_route, requestMetadata)
    .then(response => response.json())
        .then(result => {
          if(this.props.user._id === this.props.match.params.id) {
            this.setState({
              userCanEdit: true,
              bio: result.Bio,
              oldBio: result.Bio
            })
          }
            this.setState({
              user: result,
              bio: result.Bio
            })
        })
  }
  showBioSuccessMessage(){
    this.setState({showBioSuccess: "block"});
  }
showReviewButton(){
  if(!this.state.userCanEdit) {
    return (
      <ReviewModal user={this.props.user}/>
    )
  }
  else{
    return (
      <div>
          <AvatarCropperModal showModal={this.showModal}
      hideModal={this.hideModal} user={this.props.user} 
      isOpen={this.state.isOpen} setUser={this.props.setUser}
      getUser = {this.getUser}/>
      </div>
      
      )
  }
}
focusBio(){
  this.setState({
    focusedBioClass: "focused-bio",
    showBioIcons: "block", 
    showEditButton:"none",
    textAreaDisabled: false
  });
}
unfocusBio(){
  this.setState({
    focusedBioClass: "not-focused-bio", 
    showBioIcons: "none", 
    showEditButton: "block",
    bio: this.state.oldBio
  });
}

renderBio(){
   var bio = "Write a bit about yourself";
    if(this.state.user.Bio !== undefined) {
      bio = this.state.bio;
    }
  if(this.props.user._id === this.props.match.params.id) {
    return(
      <div className={"profile-bio-container"}>
         <div className="bio-icons" style={{display: this.state.showEditButton}}>
        <ul>
          <li className="badge badge-warning edit-bio" onClick={this.focusBio}>
            Edit
          </li>
        </ul>
        
      </div>
          <div className="bio-icons" style={{display: this.state.showBioIcons}}>
        <ul>
          <li className="badge badge-success" onClick={this.updateBio}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-check-lg" viewBox="0 0 16 16">
              <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
            </svg>
          </li>
          <li className="badge badge-danger" onClick={this.unfocusBio}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg>
          </li>
        </ul>
        
      </div>
        <TextareaAutosize className={"profile-bio "+this.state.focusedBioClass} 
        onFocus={this.focusBio} onChange={this.handleBioChange}
        value={bio} disabled={this.state.textAreaDisabled}/>
      </div>
    )
  }
  else {
    return (
      <p className="profile-bio" >{decode.htmlDecode(bio)}</p>
    )
  }

}
  render(){
    if(this.state.user._id !== undefined){
    return (
        <div>
            <div className="profile-header">
                <img className="user-profile-image" src={decode.htmlDecode(this.state.user.Image)} alt="User"/>
                <p className="user-profile-name">{decode.htmlDecode(this.state.user.First_Name + " " + this.state.user.Last_Name)}</p>
                
                {this.showReviewButton()}
                {this.renderBio()}
                
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
  else{
    return(
      <h2 className="text-light oops-user">Oops! User not found</h2>
    )
  }
  }
}
export default User;