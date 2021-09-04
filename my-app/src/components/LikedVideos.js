import React, {Component} from "react";
import "../css/Header.css";
import "../css/Home.css";
import Video from "../components/Video";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/VideoRow.css';
import '../css/LikedVideos.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
// import bootstrap from "bootstrap";
class LikedVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        }
    }
componentDidMount(){

    this.getLikedVideos();
}
getLikedVideos(){
    var user = JSON.parse(Cookies.get("user"));
    const api_route = process.env.REACT_APP_REQUEST_URL+'/GetLikedVideos/'+user._id;
    const requestMetadata = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
            };
    fetch(api_route, requestMetadata)
    .then(response => response.json())
        .then(result => {
            this.setState({videos: result})
        })
}
  render(){
    if(this.state.videos.length < 1) {
        return(
            <h2 className="text-light no-liked-videos">Your liked videos will appear here</h2>
        )
    }
    else {

    
    return (
        <div>
            <h1 className="text-light home-title">Liked Videos</h1>
            <div className="videos-container">
            <ul>
            {this.state.videos.map((video, index) => (
                <li key={index}>
                <Link to={"/Video/"+video._id}>
                    <Video Id={video._id} Title={video.Title} Thumbnail ={video.Thumbnail}
                    Creator={video.Creator} Views={video.Views} image={video.Creator_Image}
                    date={video.Date}/>
                </Link>
                </li>
            ))}
            </ul>
            </div>
        </div>
    );
}
  }
}
export default LikedVideos;