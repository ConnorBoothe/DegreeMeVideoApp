import React, {Component} from "react";
import "../css/VideoRow.css";
import Video from "../components/Video";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

class VideoRow extends Component {
    constructor(props) {
        super(props);
        this.getVideos = this.getVideos.bind(this)
        this.state = {
            videos:[]
        }
    }
    componentDidMount(){
        this.getVideos();
    }
    getVideos(){
        const api_route = 'http://localhost:8080/API/GetVideoByTag/'+this.props.category;
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
                this.setState({videos: result})
            })
    }
    render(){
        return (
            <div className="video-row">
                <h1 className="text-light category">{this.props.category}</h1>
                <ul>
                {this.state.videos.map((video, index) => (
                    
                    <li>
                        <Link to={"/Video/"+video._id}>
                            <Video Id={video._id} Title={video.Title} Thumbnail ={video.Thumbnail}
                            Creator={video.Creator} image={video.Creator_Image} Views={video.Views}
                            date={video.Date}/>
                        </Link>
                    </li>
                ))}
                </ul>
            </div>
        );
  }
}

export default VideoRow;