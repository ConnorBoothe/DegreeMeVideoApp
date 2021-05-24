import React, {Component} from "react";
import '../css/VideoUploader.css';
import firebase from "firebase";
import ProgressBar from "./ProgressBar";
import TagsInput from './TagsInput';
import {v4 as uuid} from "uuid";
import {Video} from 'video-metadata-thumbnails';
import VideoUploadModal from "./VideoUploadModal";
import Cookies from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.css';

// import FileUploader from "react-firebase-file-uploader";
const config = {
    apiKey: "AIzaSyCdNXC20rfZy4WU_Yo0r1_jqurajcevaI0",
    authDomain: "degreeme-bd5c7.firebaseapp.com",
    databaseURL: "https://degreeme-bd5c7.firebaseio.com",
    projectId: "degreeme-bd5c7",
    storageBucket: "degreeme-bd5c7.appspot.com",
    messagingSenderId: "52205869765",
    appId: "1:52205869765:web:b577285fdc02f989616eac",
    measurementId: "G-W912PS5JG0"
};
firebase.initializeApp(config);
class VideoUploader extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
            uploadProgress: 0,
            show:false,
            error:"",
            tags:[],
            thumbnail:"",
            creator: "",
            creator_id: "",
            creator_email: "",
            creator_image: "",
            title:"",
            description: "",
            uploadType:"Uploading video",
            isModalOpen: false,
            videoId:"",
            showDescCharCount: "none",
            showTitleCharCount: "none",
            titleCharLimit: 100,
            descCharLimit: 2000,
            titleCharCount: 0,
            descCharCount: 0
        };
        this.handleChange = this.handleChange.bind(this)
        this.addTag = this.addTag.bind(this)
        this.removeTag = this.removeTag.bind(this)
        this.createThumbnail = this.createThumbnail.bind(this)
        this.postThumbnailToFirebase = this.postThumbnailToFirebase.bind(this)
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleCreatorChange = this.handleCreatorChange.bind(this)
        this.showTitleChar = this.showTitleChar.bind(this)
        this.showDescChar = this.showDescChar.bind(this)
        this.hideTitleChar = this.hideTitleChar.bind(this)
        this.hideDescChar = this.hideDescChar.bind(this)

        this.copyToClipboard = this.copyToClipboard.bind(this)
        // this.Creator = React.createRef();
        // this.Email = React.createRef();
        this.Description = React.createRef();
        this.Link = React.createRef();
        this.tag = React.createRef();


    }
    handleChange() {
      this.setState({show: true});
    }
  //   validateEmail(email) {
  //     alert(email)
  //     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     return re.test(String(email).toLowerCase());
  // }
  validateMp4(){
    var allowedExtensions = 
                    /(\.mp4)$/i;
      if (!allowedExtensions.exec(this.Link.current.value)) {
        console.log("Not mp4")
            return false;
      } 
      return true;
            
  }
  addTag(){
    //if tag isn't empty, add it
    if(this.tag.current.value != ""){
      var newArray = this.state.tags.concat(this.tag.current.value)
      this.setState({ tags: newArray })
      this.tag.current.value = "";
    }
  }
  handleTitleChange(e){
    if(e.target.value.length <= this.state.titleCharLimit) {
      this.setState({title: e.target.value,
        titleCharCount: e.target.value.length})
    }
  }
  handleDescriptionChange(e){
    if(e.target.value.length <= this.state.descCharLimit) {
      this.setState({description: e.target.value,
        descCharCount: e.target.value.length})
    }
    
  }
  handleCreatorChange(e){
    // this.setState({creator: e.target.value})
  }
  //create thumbnail from video file
  createThumbnail() {
    return new Promise((resolve, reject)=>{
      this.setState({uploadType: "Creating thumbnail"});
      const video = new Video(this.Link.current.files[0]);
      video.getThumbnails().then((thumbnails)=>{
        var reader = new FileReader();
        reader.readAsDataURL(thumbnails[0].blob);
        this.postThumbnailToFirebase(thumbnails[0].blob)
        .then((url)=>{
          resolve(url)
        })
      })
    })
    
  }
  //remove tag by index
  removeTag(index){
    const newArray = this.state.tags
    newArray.splice(index,1)
    this.setState({tags: newArray});
  }
    addVideoToDatabase(videoUrl){
      console.log(this.props.user)
        const api_route = 'http://localhost:8080/API/AddVideo';
        this.createThumbnail(this.Link.current.files[0])
        .then((url)=>{
          this.setState({uploadType: "Posting to database"});
          const postBody = {
            Creator: this.state.creator,
            Creator_Id: this.state.creator_id,
            Email: this.state.creator_email,
            Creator_Image: this.state.creator_image,
            Title: this.state.title,
            Description: this.state.description,
            Link: videoUrl,
            tags: this.state.tags,
            Thumbnail: url
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
        .then((video)=>{
          console.log(video)
          this.setState({videoId: video._id})
          this.showModal();
        })
        .catch((err)=>{
          console.log(err)
          this.setState({type: "An error occurred. Please try again"})
        })
        })
         
        .catch((err)=>{
          console.log(err)
          this.setState({type: "An error occurred. Please try again"})

        })
        
    }
    componentDidMount(){
      if(Cookies.get("user")!= undefined) {
        var user = JSON.parse(Cookies.get("user"));
        this.setState({
          creator: user.First_Name + " " +user.Last_Name,
          creator_id: user._id,
          creator_email: user.Email,
          creator_image: user.Image,
        })
        this.props.setUser(JSON.parse(Cookies.get("user")))
    }
    }
    postThumbnailToFirebase(image){
      return new Promise((resolve, reject)=>{
        const id = uuid();
        const storageRef = firebase.storage().ref("thumbnails/"+id).put(image);
        storageRef.on(`state_changed`,snapshot=>{
  
          this.uploadProgress = (snapshot.bytesTransferred/snapshot.totalBytes);
          this.setState({uploadProgress: this.uploadProgress, uploading:true})
        }, error=>{
        },
        async () => {
          storageRef.snapshot.ref.getDownloadURL().then(async (url)=>{
            this.setState({thumbnail: url, uploadType:"Complete"})
            resolve(url)
          });
        });
      })
    }
    showModal() {
      this.setState({isModalOpen: true});
    };
    hideModal = () => {
        this.setState({isModalOpen: false});
    };
    copyToClipboard(){
        navigator.clipboard.writeText(window.location.href)
    }
    showTitleChar(){
      this.setState({
        showTitleCharCount : "block"
      });
    }
    showDescChar(){
      this.setState({
        showDescCharCount : "block"
      });
    }
    hideTitleChar(){
      this.setState({
        showTitleCharCount : "none"
      });
    }
    hideDescChar(){
      this.setState({
        showDescCharCount : "none"
      });
    }
    render(){
      const readImage =(file)=>{
                // this.handleChange();
        const id = uuid();
        const storageRef = firebase.storage().ref("videos/"+id).put(file)
        this.setState({uploadProgress: this.uploadProgress, show:true})
        
        storageRef.on(`state_changed`,snapshot=>{

            this.uploadProgress = (snapshot.bytesTransferred/snapshot.totalBytes);
            this.setState({uploadProgress: this.uploadProgress, uploading:true})
          }, error=>{
          },
          async () => {
            storageRef.snapshot.ref.getDownloadURL().then(async (url)=>{
              this.addVideoToDatabase(url)
              this.uploadingMedia = false;
            });
          });
        console.log(file)
      }
      const addVideo =(e)=>{
        var validMp4 = this.validateMp4();
        if(
            this.state.title == "" ||
            this.state.description == "" ||
            this.Link.current.value == ""
          ){
              console.log("empty field")
              this.setState({error: "Please fill out all fields"})
          }
          else if(!validMp4){
            this.setState({error: "File upload must be .mp4 format"})

          }
          else{
           readImage(this.Link.current.files[0])
          }
          
      }
    return (
        <div className="video-upload-container">
          <VideoUploadModal isOpen={this.state.isModalOpen}
          showModal={this.showModal} hideModal={this.hideModal}
          Title={this.state.title} Thumbnail={this.state.thumbnail} 
          videoId={this.state.videoId} Description={this.state.description} 
          Creator={this.state.creator}/>
            <h1 className="video-upload-title">Upload Video</h1>
            <ul>
                <li>
                    <div className="input-container">
                      <p className="input-label">Title</p>
                      <input autocomplete="off" name ="Title" onChange={this.handleTitleChange}
                       onFocus={this.showTitleChar} onBlur={this.hideTitleChar} value={this.state.title}/>
                      <p className="char-count" style={{"display":this.state.showTitleCharCount}}>{this.state.titleCharCount}/{this.state.titleCharLimit}</p>
                    </div>
                    
                </li>
                <li>
                  <div className="input-container">
                    <p className="input-label">Description</p>
                        <textarea className="description" name="Description"  onChange={this.handleDescriptionChange}
                         onFocus={this.showDescChar} onBlur={this.hideDescChar} value={this.state.description}></textarea>
                    <p className="char-count" style={{"display":this.state.showDescCharCount}}>{this.state.descCharCount}/{this.state.descCharLimit}</p>
                  </div>
                </li>
                
                <li className="upload-link">
                    <input className="file-input" type="file" ref={this.Link}/>   
                </li>
                <li>
                  <TagsInput addTag = {this.addTag} tag = {this.tag}
                  tags = {this.state.tags} removeTag = { this.removeTag}/>
                </li>
                <li>
                    <button className="btn-primary add-video" onClick={addVideo}>Upload Video</button>
                </li>
                <li>
                    <ProgressBar progress={this.uploadProgress} show={this.state.show} 
                      type={this.state.uploadType}/>
                </li>
                <li >
                  <p className="error">{this.state.error}</p>
                </li>
            </ul>
        </div>

    );


  }
}

export default VideoUploader;