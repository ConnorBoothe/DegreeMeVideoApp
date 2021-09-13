import React, {Component} from "react";
import "../css/EditVideo.css";
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import TextareaAutosize from 'react-textarea-autosize';
import htmlDecode from "../GlobalFunctions/HTMLDecode";
import firebase from "firebase/app";

import '../config/firebase-config';
import DeleteVideoModal from '../components/DeleteVideoModal';
import {Redirect} from 'react-router-dom';

// firebase.initializeApp(config);
var decode = new htmlDecode()
class EditVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "", 
            description: "",
            tags: [],
            titleClass:"",
            descriptionClass:"",
            titleEditingText: "none",
            descriptionEditingText: "none",
            editingState: "Editing...",
            editingTitleTextClass: "text-warning",
            editingDescriptionTextClass: "text-warning",
            currTagInput: "",
            isOpen: false,
            redirect: false

        }
        this.getVideo = this.getVideo.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.renderTags = this.renderTags.bind(this)
        this.updateVideoTitle = this.updateVideoTitle.bind(this)
        this.updateVideoDesc = this.updateVideoDesc.bind(this)
        this.focusTitle = this.focusTitle.bind(this)
        this.focusDescription = this.focusDescription.bind(this)
        this.setCurrTagState = this.setCurrTagState.bind(this)
        this.addTag = this.addTag.bind(this)
        this.removeTag = this.removeTag.bind(this)
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.deleteVideo = this.deleteVideo.bind(this)
    }
    componentDidMount(){
        this.getVideo();
    }
    renderTags(){
        return(
            <ul className="keywords-list">
                {this.state.tags.map((tag, index) => (
                    <li key={index}>
                        <div className="tag-container" >
                            <p key={index} className="tag text-light">
                            <span className="text-light remove-tag" onClick={()=>this.removeTag(tag[0])}>x</span>
                                {tag[1]}
                            </p>
                        </div>
                    </li>
                    
                ))}
            </ul>
        )
        
    }
    handleTitleChange(e){
        if(e.target.value.length < 101) {
          this.setState({title: e.target.value});
        }
        else{
          this.setState({title: e.target.value});   
         }
      }
    getVideo(){
        var userId = this.props.user._id;
        if(userId === undefined) {
            userId = JSON.parse(Cookies.get("user"))._id
        }
        if(userId !== undefined) {

       
        let id = this.props.match.params.id
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/Video/'+ id;
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
                };
        fetch(api_route, requestMetadata)
        .then(response => response.json())
            .then(result => {
                console.log(result.Creator_Id)
                console.log(userId)
                if(userId === undefined) {
                    this.setState({
                        redirect: true
                     })
                }
                else if(result._id !== undefined
                    && result.Creator_Id === userId) {
                    this.setState({
                        title: result.Title,
                        description: result.Description,
                        tags: result.Tags,
                        thumbnail: result.Thumbnail,
                        redirect: false
         
                     })
                }
                else {
                    this.setState({
                        redirect: true
                     })
                }
               
            })
        }
    }

    updateVideoTitle(){
        var userId = this.props.user._id;
        if(userId === undefined) {
            userId = JSON.parse(Cookies.get("user"))._id
        }
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/UpdateVideoTitle';
        const postBody = {
            videoId: this.props.match.params.id,
            title: this.state.title,
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody),
        };
        fetch(api_route, requestMetadata)
        .then(response => response.json())
            this.setState({
                titleClass: "success-border",
                editingState: "Saved",
                editingTitleTextClass: "text-success"
            })
            setTimeout(() =>{
                this.setState({
                    titleEditingText: "none",
                    titleClass: "",
                })       
            }, 1000);
    }
    focusTitle(){
        this.setState({
            titleClass: "editing-border",
            titleEditingText: "block",
            editingState: "Editing...",
            editingTitleTextClass: "text-warning"
        })
    }
    focusDescription(){
        this.setState({
            descriptionClass: "editing-border",
            descriptionEditingText: "block",
            editingState: "Editing...",
            descriptionTextClass: "text-warning"
        })
    }
    addTag(){
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/AddVideoTag';
        const postBody = {
            videoId: this.props.match.params.id,
            name: this.state.currTagInput,
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
            this.setState({tags: result})
            console.log(result)
      })
    }
    removeTag(tagId){
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/RemoveVideoTag';
        const postBody = {
            videoId: this.props.match.params.id,
            tagId: tagId
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
            console.log(result)
            this.setState({tags: result})
      })
    }
    updateVideoDesc(){
        var userId = this.props.user._id;
        if(userId === undefined) {
            userId = JSON.parse(Cookies.get("user"))._id
        }
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/UpdateVideoDescription';
        const postBody = {
            videoId: this.props.match.params.id,
            description: this.state.description,
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody),
        };
        fetch(api_route, requestMetadata)
        .then(response => response.json())
            this.setState({
                descriptionClass: "success-border",
                editingState: "Saved",
                editingDescriptionTextClass: "text-success"
            })
            setTimeout(() =>{
                this.setState({
                    descriptionEditingText: "none",
                    descriptionClass: "",
                    editingDescriptionTextClass: "text-warning"
                })       
            }, 1000);
    }
    handleDescriptionChange(e){
        if(e.target.value.length < 2001) {
          this.setState({description: e.target.value});
        }
        else{
          this.setState({description: this.state.description});   
         }
        
      }
      setCurrTagState(e){
          console.log(e.target.value)
          this.setState({currTagInput: e.target.value})
      }
    renderEditVideo(){
        var userId = this.props.user._id;
        if(userId === undefined) {
            userId = JSON.parse(Cookies.get("user"))._id
        }
        if(userId === undefined) {
            return (
                <Redirect to="/LandingPage"></Redirect>
            )
        }
        else if(!this.state.redirect) {

        return (
            <div className="edit-video">

            <div className="edit-video-container">
                <div className="edit-video-sub-container">
                <h1 className="edit-video-title">Edit Video</h1>
                <p className="label">Title</p>
                <input type="text" className={"title-input "+ this.state.titleClass}
                value={decode.htmlDecode(this.state.title)} onChange={this.handleTitleChange}
                onBlur={this.updateVideoTitle} onFocus={this.focusTitle}/>
                <p className={"editing-text "+this.state.editingTitleTextClass} style={{display: this.state.titleEditingText}}>{this.state.editingState}</p>

                <p className={"label "} >Description</p>
                <TextareaAutosize className={"title-input "+ this.state.descriptionClass}
                     onChange={this.handleDescriptionChange}
                    value={decode.htmlDecode(this.state.description)} 
                    onBlur={this.updateVideoDesc} onFocus={this.focusDescription}/>
                     <p className={"editing-text "+this.state.editingDescriptionTextClass} style={{display: this.state.descriptionEditingText}}>{this.state.editingState}</p>
                 <p className="label">Edit Tags</p>
                
                <div className=" tags-container">
                    <input type="text" className="title-input " 
                    placeholder="Add new tag" onChange={this.setCurrTagState}/>
                    <button className="btn btn-primary add-tag-btn" onClick={this.addTag}>Add</button>
                    
                </div>
                {this.renderTags()}
                <h4 className="text-light danger-zone"> Danger Zone!</h4>
                <p className="text-light">Beware, this action is irreversible.</p>
                <button className = "btn btn-danger" onClick={this.showModal}>Delete Video</button>
                <DeleteVideoModal isOpen={this.state.isOpen}
                showModal={this.showModal} hideModal = {this.hideModal}
                videoTitle={this.state.title} videoThumbnail={this.state.thumbnail}
                deleteVideo={this.deleteVideo} />
            </div>
            </div>
            </div>
        );
        }
        else {
            return (
                <Redirect to="/YourVideos"></Redirect>
            )
        }

    }
    showModal(){
        this.setState({isOpen: true})
      }
      hideModal(){
        this.setState({isOpen: false})
      }
    deleteVideo(){
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/DeleteVideo';
        const postBody = {
            videoId: this.props.match.params.id,
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody),
        };
        fetch(api_route, requestMetadata)
        fetch(api_route, requestMetadata)
        .then(res => res.json())
        .then((videoLink)=>{
            console.log(videoLink)
            var videoTitle = videoLink.split("%2F")[1].split("?")[0];
            // Create a reference to the file to delete
            firebase.storage().ref("videos/" + videoTitle).delete()
            .then(()=> {
                // File deleted successfully
                console.log("success")
                this.hideModal()
                this.setState({
                    redirect: true
                })
                }).catch(function(error) {
                    console.log(error)
                // Uh-oh, an error occurred!
                });
            
        })

    }
    render(){
        return (
            this.renderEditVideo()
        )
    }

}

export default EditVideo;