import React, { Component } from "react";
import '../css/VideoUploader.css';
import firebase from "firebase/app";
import 'firebase/storage';
import ProgressBar from "./ProgressBar";
import TagsInput from './TagsInput';
import { v4 as uuid } from "uuid";
import { Video } from 'video-metadata-thumbnails';
import VideoUploadModal from "./VideoUploadModal";
import Cookies from 'js-cookie';
import CreateAccount from "../components/CreateAccount"
import CreateSellerAccount from "../components/CreateSellerAccount"
import 'bootstrap/dist/css/bootstrap.css';
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
    this.state = {
      uploadProgress: 0,
      show: false,
      uploading: false,
      error: "",
      tags: [],
      thumbnail: "",
      title: "",
      description: "",
      uploadType: "Uploading video",
      isModalOpen: false,
      videoId: "",
      showDescCharCount: "none",
      showTitleCharCount: "none",
      titleCharLimit: 100,
      descCharLimit: 2000,
      titleCharCount: 0,
      descCharCount: 0,
      filename: ""
    };

    this.handleChange = this.handleChange.bind(this)
    this.addTag = this.addTag.bind(this)
    this.readImage = this.readImage.bind(this)
    this.addVideo = this.addVideo.bind(this)
    this.removeTag = this.removeTag.bind(this)
    this.setFileName = this.setFileName.bind(this)
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
    this.renderUploader = this.renderUploader.bind(this)
    this.copyToClipboard = this.copyToClipboard.bind(this)
    this.Description = React.createRef();
    this.Link = React.createRef();
    this.tag = React.createRef();
    this.context = React.createRef();

  }
  componentDidMount() {

  }
  handleChange() {
    this.setState({ show: true });
  }
  validateMp4() {
    var allowedExtensions =
      /(\.mp4)$/i;
    if (!allowedExtensions.exec(this.Link.current.value)) {
      return false;
    }
    return true;

  }

  setFileName(e) {
    var filename = e.target.value.split("\\")[2]
    this.setState({ filename: filename })
  }
  addTag() {
    //if tag isn't empty, add it
    if (this.tag.current.value !== "") {
      var newArray = this.state.tags.concat(this.tag.current.value)
      this.setState({ tags: newArray })
      this.tag.current.value = "";
    }
  }
  handleTitleChange(e) {
    if (e.target.value.length <= this.state.titleCharLimit) {
      this.setState({
        title: e.target.value,
        titleCharCount: e.target.value.length
      })
    }
  }
  handleDescriptionChange(e) {
    if (e.target.value.length <= this.state.descCharLimit) {
      this.setState({
        description: e.target.value,
        descCharCount: e.target.value.length
      })
    }

  }
  handleCreatorChange(e) {
    // this.setState({creator: e.target.value})
  }
  //generate thumbnail
generateThumbnail(){
  
}
  //create thumbnail from video file
  createThumbnail() {
    return new Promise((resolve, reject) => {
      this.setState({ uploadType: "Creating thumbnail" });
      const video = new Video(this.Link.current.files[0]);
      
      video.getThumbnails().then((thumbnails) => {
        var reader = new FileReader();
        if (thumbnails[0].blob === null) {
          resolve(false)
        }
        else {
          reader.readAsDataURL(thumbnails[0].blob);
          //get thumbnail from middle of video to ensure
          //picture isnt blank black screen
          this.postThumbnailToFirebase(thumbnails[parseInt(thumbnails.length / 2)].blob)
            .then((url) => {
              resolve(url)
            })
        }

      })
    })

  }
  //remove tag by index
  removeTag(index) {
    const newArray = this.state.tags
    newArray.splice(index, 1)
    this.setState({ tags: newArray });
  }
  addVideoToDatabase(videoUrl) {
    var user = JSON.parse(Cookies.get("user"));
    if (user._id !== undefined) {
      const api_route = 'http://localhost:8080/API/AddVideo';
      this.createThumbnail(this.Link.current.files[0])
        .then((url) => {
          if (url === false) {
            this.setState({ error: "An error occurred" })
          }
          else {

            this.setState({ uploadType: "Posting to database" });
            const postBody = {
              Creator_Id: user._id,
              Title: this.state.title,
              Description: this.state.description,
              Link: videoUrl,
              tags: this.state.tags,
              Thumbnail: url
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
              .then((video) => {
                this.setState({
                  videoId: video._id,
                  title: "",
                  description: "",
                  tags: [],
                  filename: "",
                  uploading: false,
                  show: false
                })
                this.showModal();
              })
              .catch((err) => {
                this.setState({ type: "An error occurred. Please try again" })
              })
          }
        })
    }

  }
  
  readImage(file) {
    const id = uuid();
    const storageRef = firebase.storage().ref("videos/" + id).put(file)
    this.setState({ uploadProgress: this.uploadProgress, show: true })
    storageRef.on(`state_changed`, snapshot => {

      this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes);
      this.setState({ uploadProgress: this.uploadProgress, uploading: true })
    }, error => {
    },
      async () => {
        storageRef.snapshot.ref.getDownloadURL().then(async (url) => {
          this.addVideoToDatabase(url)
          this.uploadingMedia = false;
        });
      });
  }
  addVideo(e) {
    var validMp4 = this.validateMp4();
    if (
      this.state.title === "" ||
      this.state.description === "" ||
      this.Link.current.value === ""
    ) {
      this.setState({ error: "Please fill out all fields" })
    }
    //require 5 tags
    else if (this.state.tags.length < 5) {
      this.setState({ error: "You must add at least 5 tags to the video" })
    }
    else if (!validMp4) {
      this.setState({ error: "File upload must be .mp4 format" })
    }
    else {
      this.setState({ uploading: true })
      const video = new Video(this.Link.current.files[0]);
      video.getThumbnails().then((thumbnails) => {
        if(thumbnails[0].blob === null){
          this.setState({
            error: "Please convert your video to mp4 (h.264 codec) and upload again.",
            uploading: false,

          })
        }
        else {
          //process the thumbnail, then the video
          this.readImage(this.Link.current.files[0])
        }
      
    })

  }
}
  renderUploader() {
    //need to fix
    console.log(this.props.user)
    if (this.props.user.hasBankAccount &&
      this.props.user._id !== undefined) {

      return (
        <div className="video-upload-container">
          <VideoUploadModal isOpen={this.state.isModalOpen}
            showModal={this.showModal} hideModal={this.hideModal}
            Title={this.state.title} Thumbnail={this.state.thumbnail}
            videoId={this.state.videoId} Description={this.state.description}
            Creator={this.state.creator} />
          <h1 className="video-upload-title">Upload Video</h1>
          <ul>
            <li>
              <div className="input-container">
                <p className="input-label">Title</p>
                <input autoComplete="off" name="Title" onChange={this.handleTitleChange}
                  onFocus={this.showTitleChar} onBlur={this.hideTitleChar} value={this.state.title} />
                <p className="char-count" style={{ "display": this.state.showTitleCharCount }}>{this.state.titleCharCount}/{this.state.titleCharLimit}</p>
              </div>

            </li>
            <li>
              <div className="input-container">
                <p className="input-label">Description</p>
                <textarea className="description" name="Description" onChange={this.handleDescriptionChange}
                  onFocus={this.showDescChar} onBlur={this.hideDescChar} value={this.state.description}></textarea>
                <p className="char-count" style={{ "display": this.state.showDescCharCount }}>{this.state.descCharCount}/{this.state.descCharLimit}</p>
              </div>
            </li>

            <li className="upload-link">
              <label htmlFor="file-input">
                <div className="btn btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z" />
                  </svg>
                  <span className="select-file-txt">
                    Select MP4 File
             </span>

                </div>
              </label>
              <span className="text-light filename">{this.state.filename}</span>
              <input id="file-input" className="file-input" type="file" onChange={this.setFileName} ref={this.Link} />
            </li>
            <li>
              <TagsInput addTag={this.addTag} tag={this.tag}
                tags={this.state.tags} removeTag={this.removeTag} />
            </li>
            <li>
              <button className="btn-primary add-video" onClick={this.addVideo}
                disabled={this.state.uploading}>Upload Video</button>
            </li>
            <li>
              <ProgressBar progress={this.uploadProgress} show={this.state.show}
                type={this.state.uploadType} />
            </li>
            <li>
              <p className="error">{this.state.error}</p>
            </li>
          </ul>
        </div>

      );
    }
    else if (this.props.user.hasBankAccount === false &&
      this.props.user._id !== undefined) {
      return (
        <CreateSellerAccount setUser={this.props.setUser} />
      );
    }
    else {
      return (
        <div>
          <h2 className="text-light create-account-label">You must create an account to upload a video</h2>
          <CreateAccount />
        </div>
      )
    }
  }
  postThumbnailToFirebase(image) {
    return new Promise((resolve, reject) => {
      const id = uuid();
      const storageRef = firebase.storage().ref("thumbnails/" + id).put(image);
      storageRef.on(`state_changed`, snapshot => {

        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes);
        this.setState({ uploadProgress: this.uploadProgress, uploading: true })
      }, error => {
      },
        async () => {
          storageRef.snapshot.ref.getDownloadURL().then(async (url) => {
            this.setState({ thumbnail: url, uploadType: "Complete" })
            resolve(url)
          });
        });
    })
  }
  showModal() {
    this.setState({ isModalOpen: true });
  };
  hideModal = () => {
    this.setState({ isModalOpen: false });
  };
  copyToClipboard() {
    navigator.clipboard.writeText(window.location.href)
  }
  showTitleChar() {
    this.setState({
      showTitleCharCount: "block"
    });
  }
  showDescChar() {
    this.setState({
      showDescCharCount: "block"
    });
  }
  hideTitleChar() {
    this.setState({
      showTitleCharCount: "none"
    });
  }
  hideDescChar() {
    this.setState({
      showDescCharCount: "none"
    });
  }
  render() {
    return this.renderUploader();
  }
}

export default VideoUploader;