import React, {Component} from "react";
import VideoRow from "../components/VideoRow";
import Header from "../components/Header";

import "../css/Header.css";
import "../css/Home.css";
import Video from "../components/Video";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/VideoRow.css';
import '../css/LikedVideos.css';


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
    const api_route = 'http://localhost:8080/GetLikedVideos/'+this.props.user._id;
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
    return (
        <div>
            <h1 className="text-light home-title">Liked Videos</h1>
            <div className="videos-container">
            <ul>
            {this.state.videos.map((video, index) => (
                <li>
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
export default LikedVideos;