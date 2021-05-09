import React, {Component} from "react";
import "../css/SingleVideo.css";
import 'bootstrap/dist/css/bootstrap.css';
import CommentList from "../components/CommentList"
import VideoActions from "../components/VideoActions";
import ReactPlayer from "react-player";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

class SingleVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: {},
            likeCount:0,
            duration:0,
            viewText: "views"
        }
        this.getVideo = this.getVideo.bind(this)
        this.addLike = this.addLike.bind(this)
        this.addView = this.addView.bind(this)

    }
    componentDidMount(){
        this.getVideo()
    }
    addView(){
        //do not add view if the viewer is also Creator
        setTimeout(()=>{
            const api_route = 'http://localhost:8080/API/AddView';
            const postBody = {
                VideoId: this.state.video._id,
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
            .then((res)=>{
                if(res._id){
                    if(res.Views == 1){
                        this.setState({ views:res.Views,
                            viewText: "view"})
                    }
                    else {
                        this.setState({ views:res.Views,
                            viewText: "views"})
                    }
                    this.setState({views: res.Views});

                }
            })
        }, 30000)
    }
    addLike(){
        const api_route = 'http://localhost:8080/API/AddLike';
        const postBody = {
            VideoId: this.state.video._id,
            UserId: "Fake id",
            First_Name: "Connor",
            Last_Name: "Boothe",
            Image: "https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/userImages%2F%40cboothe?alt=media&token=32d57150-275d-4a88-8417-090498ffeada"
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
        .then((res)=>{
            console.log(res)
            var likeCount = this.state.likeCount;
            likeCount++;
            this.setState({likeCount: likeCount});
        })
        
    }
    getVideo(){
        let id = this.props.match.params.id
        const api_route = 'http://localhost:8080/API/Video/'+ id;
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
                };
        fetch(api_route, requestMetadata)
        .then(response => response.json())
            .then(result => {
                if(result.Views == 1){
                    this.setState({video: result, views:result.Views,
                        viewText: "view"})
                }
                else {
                    this.setState({video: result, views:result.Views,
                    viewText: "views"})
                }
                this.addView()
                if(this.state.video.Likes){
                    this.setState({likeCount: this.state.video.Likes.length})
                }
            })
    }
    render(){
        return (
            <div className="single-video">
                    <div className="single-video-frame">
                    <ReactPlayer 
                    url={this.state.video.Link}
                    onDuration={this.duration}
                    controls
                    width="640px"
                    hieght="auto"
                    />
                    </div>
                    <div>
                    <p className="video-title">{this.state.video.Title} </p>
                    <div className="video-actions-list">
                        <p className="single-view-count">{this.state.views + " " + this.state.viewText} </p>
                        <VideoActions Likes={this.state.likeCount} 
                        addLike={this.addLike} />
                    </div>
                        <div className="sub-details">
                            <div className="creator-name">
                                <Link to="/User/fjeio">
                                    <img className="user-image" src={"https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/userImages%2F%40cboothe?alt=media&token=32d57150-275d-4a88-8417-090498ffeada"}/>
                                    <span className="creator-text">{this.state.video.Creator}</span>
                                </Link>
                            </div>
                        </div>
                        <p className="creator-label">Creator</p>

                    </div>
                    <CommentList VideoId={this.state.video._id}/>
            </div>
                        
        );
  }
}

export default SingleVideo;