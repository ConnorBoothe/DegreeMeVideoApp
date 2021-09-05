import React, {Component} from "react";
import "../css/SingleVideo.css";
import 'bootstrap/dist/css/bootstrap.css';
import CommentList from "../components/CommentList"
import VideoActions from "../components/VideoActions";
import UpgradeAccount from "../components/UpgradeAccount";
import Cookies from 'js-cookie';
import ReactPlayer from "react-player";
import HtmlDecode from "../GlobalFunctions/HTMLDecode"
import {
    Link, Redirect
  } from "react-router-dom";


var decode = new HtmlDecode();


class SingleVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: {},
            user: this.props.user,
            likeCount:0,
            duration:0,
            viewText: "views",
            showLikedMsg: "none",
            isOpen:false,
            secondsStartTime:0,
            secondsEndTime:0,
            videoLoaded: false
        }
        this.getVideo = this.getVideo.bind(this)
        this.addLike = this.addLike.bind(this)
        this.addView = this.addView.bind(this);
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.startTime = this.startTime.bind(this)
        this.endTime = this.endTime.bind(this);
        this.setUserState = this.setUserState.bind(this)
        this.renderVideo = this.renderVideo.bind(this)
    }
    showModal = () => {
        this.setState({isOpen: true});
      };
      
      hideModal = () => {
          this.setState({isOpen: false});
      };
    componentDidMount(){
        this.mounted = true
        if (this.mounted) {
            this.getVideo()
            this.setUserState()
            this.setState({VideoId: this.state.video._id})
        }
    }
    componentWillUnmount() {
        this.mounted = false
    }
    addView(){
        //do not add view if the viewer is also Creator
        setTimeout(()=>{
            const api_route = process.env.REACT_APP_REQUEST_URL+'/API/AddView';
            var userId = "none"
            if(this.props.user._id !== undefined){
                userId = this.props.user._id;
            }
            const postBody = {
                UserId: userId,
                CreatorId: this.state.video.Creator_Id,
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
                if(res === 1){
                    this.setState({ views:res,
                        viewText: "view"})
                }
                else if(res !== false) {
                    this.setState({ views:res,
                        viewText: "views"})
                }
            })
        }, 30000)
    }
    addLike(){
        if(this.props.user._id === undefined) {
            //show modal
            this.setState({isOpen: true})
        }
        else {
            const api_route = process.env.REACT_APP_REQUEST_URL+'/API/AddLike';
            const postBody = {
                Creator_Id:this.state.video.Creator_Id,
                VideoId: this.state.video._id,
                UserId: this.props.user._id
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
                if(res !== false) {
                    var likeCount = this.state.likeCount;
                    likeCount++;
                    this.setState({likeCount: likeCount});
                    //do not increment notif count every time user likes a video
                    // this.props.showUnreadCount();
                }
                else{
                    const api_route = process.env.REACT_APP_REQUEST_URL+'/API/RemoveLike';
                    const postBody = {
                        VideoId: this.state.video._id,
                        UserId: this.props.user._id
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
                        if(res.deletedCount === 1) {
                            var likeCount = this.state.likeCount;
                            likeCount--;
                            this.setState({likeCount: likeCount});                    }
                    })
                }
            })
        }
        
    }
    componentDidUpdate(prevProps) {
        //if props are updated, get the new video
        if(prevProps.match.params.id !== this.props.match.params.id){
          this.getVideo();
        }
      }
    getVideo(){
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
                if(result === "err") {
                    this.setState({video: {}, views:0,
                        viewText: "view",
                    videoLoaded: true})  
                }
                else if(result.Views === 1){
                    this.setState({video: result, views:result.Views,
                        viewText: "view",
                        videoLoaded: true})
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
    startTime() {
        this.setState({secondsStartTime: new Date()})
    };
      
      endTime() {
        this.setState({secondsEndTime: new Date()});
        var timeDiff = this.state.secondsEndTime - this.state.secondsStartTime; //in ms
        // strip the ms
        timeDiff /= 1000;
      
        // get seconds 
        var seconds = Math.round(timeDiff);
        this.updateSecondsViewed(seconds)
      }
      //function runs twice when video ends
    updateSecondsViewed(secondsToAdd){
        if(this.props.user.Subscription_Level === "Free Tier") {
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/UpdateFreeTierSeconds';
                const postBody = {
                    UserId: this.props.user._id,
                    secondsToAdd: secondsToAdd,
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
                    this.props.setUser(res);
                })
            }
    }
    setUserState(){
        if(this.props.user._id!== undefined) {
            this.setState({user: this.props.user});
        }
        else if(Cookies.get("user")!== undefined){
            this.setState({user: JSON.parse(Cookies.get("user"))});
        }
        else {
            this.setState({user: {}});

        }
    }
    renderVideo(){
        var user = this.props.user;
        if(this.props.user._id === undefined &&
            Cookies.get("user") !== undefined) {
            user = JSON.parse(Cookies.get("user"))
        }
        if(user._id === undefined) {
            return(
                <Redirect to="/CreateAccount" />           
            )
        }
        else if(this.state.video._id === undefined && this.state.videoLoaded){
            return (<h2 className="text-light oops-video">Oops! Video not found</h2>)
        }
        else if((user.Subscription_Level !== "Free Tier" ||
        this.props.user.Free_Tier_Seconds < 600 || this.props.user.Free_Tier_Seconds === undefined )
        ) {
            return (
                <div className="single-video">
                        <div className="single-video-frame">
                        <ReactPlayer 
                            url={decode.htmlDecode(this.state.video.Link)}
                            onDuration={this.duration}
                            controls
                            width="100%"
                            height="auto"
                            playing
                            onPlay={()=> this.startTime()}
                            onPause={()=>this.endTime()}
                        />
                        </div>
                        <div>
                        <p className="single-video-title">{decode.htmlDecode(this.state.video.Title)} </p>
                        <div className="video-actions-list">
                            <p className="single-view-count">{this.state.views + " " + this.state.viewText} </p>
                            <VideoActions Likes={this.state.likeCount} 
                            addLike={this.addLike} showLikedMsg={this.state.showLikedMsg}
                            />
                        </div>
                            <div className="sub-details">
                                <div className="single-creator-name">
                                    <Link to={"/User/"+this.state.video.Creator_Id}>
                                        <img className="user-image" src={this.state.video.Creator_Image} alt="Creator"/>
                                        <span className="creator-text">{this.state.video.Creator}</span>
                                    </Link>
                                </div>
                            </div>
                            <p className="creator-label">Creator</p>
                            <p className="description-label">Description</p>
                            <p className="text-light video-description">{this.state.video.Description}</p>
                        </div>
                        <CommentList VideoId={this.state.video._id} 
                        isOpen={this.state.isOpen} hideModal={this.hideModal}
                        showModal={this.showModal}
                        user={this.props.user}/>
                </div>           
            );
        }
        else {
            return(
                <div>
                    <UpgradeAccount user={this.props.user}
                    setUser={this.props.setUser} limit_message="Sorry, you reached the 10 minute
                    free tier limit." />
                </div>
            );
        }
    }
    render(){
       return this.renderVideo()   
  }
}

export default SingleVideo;