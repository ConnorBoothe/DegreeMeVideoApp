import React, {Component} from "react";
import Avatar from 'react-avatar-edit'
import '../css/AvatarCropper.css';
import firebase from "firebase/app";
import 'firebase/storage';
import Cookies from 'js-cookie';

class AvatarCropper extends Component {

    constructor(props) {
        super(props)
        this.state = {
          preview: null,
          src: "",
          showPreview: "none",
          showUploadingText: "none",
          uploadingText: "Updating your avatar"
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.readImage = this.readImage.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
      }
      
      onClose() {
        this.setState({preview: null,
        showPreview: "none"})
      }
      
      onCrop(preview) {
        this.setState({preview: preview, showPreview: "block"})
        if(this.setState.preview !== null){
            this.setState({showPreview: "block"})
        }
       
      }
       base64ImageToBlob(str) {
        // extract content type and base64 payload from original string
        var pos = str.indexOf(';base64,');
        var type = str.substring(5, pos);
        var b64 = str.substr(pos + 8);
      
        // decode base64
        var imageContent = atob(b64);
        // create an ArrayBuffer and a view (as unsigned 8-bit)
        var buffer = new ArrayBuffer(imageContent.length);
        var view = new Uint8Array(buffer);
      
        // fill the view, using the decoded base64
        for (var n = 0; n < imageContent.length; n++) {
          view[n] = imageContent.charCodeAt(n);
        }
      
        // convert ArrayBuffer to Blob
        var blob = new Blob([buffer], { type: type });
      
        return blob;
      }
      onBeforeFileLoad(elem) {
        if(elem.target.files[0].size > 10000000){
          alert("File is too big!");
          elem.target.value = "";
        };
      }
      postImageToDB(userId, avatar){
          return new Promise((resolve, reject)=>{
            const api_route = 'http://localhost:8080/API/UpdateAvatar';
            const postBody = {
                userId: userId,
                avatar: avatar,
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
              resolve(user)
            })
          })
        
        
      }
    readImage= ()=>{
        this.setState({
          showUploadingText: "block",
          uploadingText: "Updating your avatar"
        })
        var metadata = {
          contentType: 'image/jpeg',
        };
        if(Cookies.get("user")){
          //name user avatar after email
        var user = JSON.parse(Cookies.get("user"))
        const storageRef = firebase.storage().ref("avatars/"+user._id).put(
          this.base64ImageToBlob(this.state.preview), metadata)
        storageRef.on(`state_changed`,snapshot=>{
        }, error=>{
        },
        async () => {
          storageRef.snapshot.ref.getDownloadURL().then(async (url)=>{
            this.postImageToDB(user._id, url)
            .then((user)=>{
              this.props.setUser(user)
              Cookies.set("user", user, {secure: true, sameSite: "strict"})
              this.setState({uploadingText: "Avatar updated"})
              setTimeout(()=>{
                this.setState({showUploadingText: "none"})
              }, 1200)
            })
          });
        });
        }
        
    }
        render () {
        return (
          <div className="avatar-container">
            <Avatar
              width={200}
              height={200}
              onCrop={this.onCrop}
              onClose={this.onClose}
              onBeforeFileLoad={this.onBeforeFileLoad}
              src={this.state.src}
            />
            <div style={{display: this.state.showPreview}}>
            
                <p className="text-light avatar-preview-text">Avatar Preview</p>
                <img className="avatar-preview" src={this.state.preview} alt="Preview" />
                <br></br>
                <button className="btn btn-primary" onClick={this.readImage}>Update Avatar</button>
                  <div className="updating-avatar" style={{"display": this.state.showUploadingText}}>
                    <div className="loader"></div>
                    <p className="updating-avatar-text">{this.state.uploadingText}</p>
                  </div>
            </div>
          </div>
        )
      }
    }
export default AvatarCropper;
