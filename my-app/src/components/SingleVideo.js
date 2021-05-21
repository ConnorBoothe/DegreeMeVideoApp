import React, {Component} from "react";
import "../css/SingleVideo.css";
import 'bootstrap/dist/css/bootstrap.css';
import CommentList from "../components/CommentList"
import VideoActions from "../components/VideoActions";
import ReactPlayer from "react-player";
import Cookies from 'js-cookie';

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
            viewText: "views",
            showLikedMsg: "none"
        }
        this.getVideo = this.getVideo.bind(this)
        this.addLike = this.addLike.bind(this)
        this.addView = this.addView.bind(this);
    }
    componentDidMount(){
        this.getVideo()
        this.setState({VideoId: this.state.video._id})
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
                body: JSON.stringify(postBody),
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
        console.log(this.state.video)
        const api_route = 'http://localhost:8080/API/AddLike';
        const postBody = {
            Creator_Id:this.state.video.Creator_Id,
            VideoId: this.state.video._id,
            UserId: this.props.user._id,
            First_Name: this.props.user.First_Name,
            Last_Name: this.props.user.Last_Name,
            Image: this.props.user.Image
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
        .then((res)=>{
            console.log("Res: " ,res)
            if(res != false) {
                var likeCount = this.state.likeCount;
                likeCount++;
                this.setState({likeCount: likeCount});
            }
            else{
                const api_route = 'http://localhost:8080/API/RemoveLike';
                const postBody = {
                    VideoId: this.state.video._id,
                    UserId: this.props.user._id
                };
                // console.log("cookie user", JSON.parse(Cookies.get("user"))._id)
                const requestMetadata = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postBody),
                };
                fetch(api_route, requestMetadata)
                .then(res => res.json())
                .then((res)=>{
                    if(res.deletedCount == 1) {
                        var likeCount = this.state.likeCount;
                        likeCount--;
                        this.setState({likeCount: likeCount});                    }
                })
            }
        })
    }
    componentDidUpdate(prevProps) {
        //if props are updated, get the new video
        console.log("Video update", this.props.match.params.id )
        if(prevProps.match.params.id !== this.props.match.params.id){
          this.getVideo();
        }
      }
    getVideo(){
        let id = this.props.match.params.id
        const api_route = 'http://localhost:8080/API/Video/'+ id;
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
                };
        fetch(api_route, requestMetadata)
        .then(response => response.json())
            .then(result => {
                console.log(result)
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
                    <p className="single-video-title">{this.state.video.Title} </p>
                    <div className="video-actions-list">
                        <p className="single-view-count">{this.state.views + " " + this.state.viewText} </p>
                        <VideoActions Likes={this.state.likeCount} 
                        addLike={this.addLike} showLikedMsg={this.state.showLikedMsg}
                        />
                    </div>
                        <div className="sub-details">
                            <div className="single-creator-name">
                                <Link to={"/User/"+this.state.video.Creator_Id}>
                                    <img className="user-image" src={this.state.video.Creator_Image}/>
                                    <span className="creator-text">{this.state.video.Creator}</span>
                                </Link>
                            </div>
                        </div>
                        <p className="creator-label">Creator</p>

                    </div>
                    <CommentList VideoId={this.state.video._id}
                    user={this.props.user}/>
            </div>
                        
        );
  }
}

export default SingleVideo;