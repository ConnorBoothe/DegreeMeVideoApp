import React, {Component} from "react";
import "../css/Settings.css";
import AvatarCropper from "../components/AvatarCropper";
import KeyWordsInput from "../components/KeyWordsInput";
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
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
    this.addKeyword = this.addKeyword.bind(this)
    this.removeKeyword = this.removeKeyword.bind(this)
    this.keyword = React.createRef();
    this.getKeywords = this.getKeywords.bind(this)
  }
  getKeywords(){
    var user = {};
    if(this.props.user._id === undefined) {
      user = JSON.parse(Cookies.get("user"));
    }
    else {
      user = this.props.user
    }
    const api_route = 'http://localhost:8080/API/keywords/'+ user._id;
    const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
                };
        fetch(api_route, requestMetadata)
        .then(response => response.json())
            .then(result => {
              var keywords = [];
              for(var i = 0; i < result.length; i++ ){
                keywords.push(result[i].Word)
              } 
              this.setState({keywords: keywords})              
            })
  }
  componentDidMount(){
    this.getKeywords();
  }
  addKeyword(){
    //if keyword isn't empty, add it
    if(this.keyword.current.value !== ""){
      const api_route = 'http://localhost:8080/API/AddKeywords';
      const postBody = {
          userId: this.props.user._id,
          word: this.keyword.current.value
      };
      const requestMetadata = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(postBody),
      };
      fetch(api_route, requestMetadata)
      .then(res => res.json())
      .then((result)=>{
        var newArray = this.state.keywords.concat(this.keyword.current.value)
        this.setState({ keywords: newArray })
        this.keyword.current.value = "";
      })
    }
  }
   //remove keyword by index
   removeKeyword(index){
    const api_route = 'http://localhost:8080/API/RemoveKeyword';
    const postBody = {
        userId: this.props.user._id,
        word: this.state.keywords[index]
    };
    const requestMetadata = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody),
    };
    fetch(api_route, requestMetadata)
    .then(res => res.json())
    .then((result)=>{
      const newArray = this.state.keywords
      newArray.splice(index,1)
      this.setState({keywords: newArray});
    })
    
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
        this.props.setUser(user)
        this.showBioSuccessMessage();
      })
    }
   
  }
  render(){
    return (
        <div>
            <h2 className="text-light video-label">Settings</h2>
            <h2 className="text-light update-avatar-title">Add keywords to your profile</h2>
            <KeyWordsInput addKeyword = {this.addKeyword} 
            removeKeyword = {this.removeKeyword} keywords = {this.state.keywords}
            keyword = {this.keyword} />
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