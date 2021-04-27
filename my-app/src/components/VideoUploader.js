import React, {Component} from "react";
import '../css/VideoUploader.css';
import firebase from "firebase";
import ProgressBar from "./ProgressBar";
import TagsInput from "./TagsInput";
import {v4 as uuid} from "uuid";
// import ReactPlayer from "react-player";
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
            tags:[]
        };
        this.handleChange = this.handleChange.bind(this)
        this.addTag = this.addTag.bind(this)
        this.removeTag = this.removeTag.bind(this)

        this.Creator = React.createRef();
        this.Title = React.createRef();
        this.Email = React.createRef();
        this.Description = React.createRef();
        this.Link = React.createRef();
        this.tag = React.createRef();


      }
    handleChange() {
      this.setState({show: true});
    }
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
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
  //remove tag by index
  removeTag(index){
    const newArray = this.state.tags
    newArray.splice(index,1)
    this.setState({tags: newArray});
  }
    addVideoToDatabase(url){
        const api_route = 'http://localhost:8080/API/AddVideo';
        const postBody = {
            Creator: this.Creator.current.value,
            Email: this.Email.current.value,
            Title: this.Title.current.value,
            Description: this.Description.current.value,
            Link: url,
            tags: this.state.tags
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
        .then(()=>{
          alert("Thanks! Your video has been added.")
        })
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
            // this.error = error.message;
            // this.submitting = false;
            // this.uploadingMedia = false;
            // return;
          },
          async () => {
            storageRef.snapshot.ref.getDownloadURL().then(async (url)=>{
              console.log(url)
              //POST video data to DB
                this.addVideoToDatabase(url)

              this.uploadingMedia = false;
            });
          });
        console.log(file)
      }
      const addVideo =(e)=>{
        var isEmail = this.validateEmail(this.Email.current.value);
        var validMp4 = this.validateMp4();
        if(
            this.Title.current.value == "" ||
            this.Creator.current.value == "" ||
            this.Email.current.value == "" ||
            this.Description.current.value == "" ||
            this.Link.current.value == ""
          ){
              console.log("empty field")
              this.setState({error: "Please fill out all fields"})
          }
          else if(!isEmail){
            this.setState({error: "Email is not valid"})
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
            <h1 className="video-upload-title">Upload Video</h1>
            <ul>
                <li>
                    <p>Title</p>
                    <input name ="Title" ref={this.Title}/>
                </li>
                <li>
                    <p>Creator</p>
                    <input name ="Creator"  ref={this.Creator}/>
                    </li>
                <li>
                    <p>Email</p>
                    <input name ="Email"  ref={this.Email}/>
                    </li>
                <li>
                <p>Description</p>
                    <textarea className="description" name="Description"  ref={this.Description}></textarea>
                </li>
                
                <li className="upload-link">
                    <input className="file-input" type="file" ref={this.Link}/>   
                </li>
                <li>
                  <TagsInput addTag = { this.addTag } tag = { this.tag }
                  tags = {this.state.tags} removeTag = { this.removeTag}/>
                </li>
                <li>
                    <button className="btn-primary add-video" onClick={addVideo}>Add Video</button>
                </li>
                <li>
                    { this.state.show, <ProgressBar progress={this.uploadProgress} show={this.state.show} />}
                </li>
                <li >
                  <p className="error">{this.state.error}</p>
                </li>


            </ul>
               {/* <ReactPlayer url="https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/videos%2Fd6ad48d6-3d14-44be-aa97-6920c4949b3c?alt=media&token=b3d88814-9735-4620-928b-06bb0d5a0369"/> */}
        </div>

    );


  }
}

export default VideoUploader;