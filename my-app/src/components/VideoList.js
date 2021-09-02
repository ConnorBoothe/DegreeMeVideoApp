import React, {Component} from "react";
// import "../css/VideoRow.css";
import Video from "../components/Video";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

class UserVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        }
        this.getUserVideos = this.getUserVideos.bind(this)
        
    }
    getUserVideos(){
        const api_route = 'http://localhost:8080/API/GetUserVideos/'+window.location.href.split("/")[4];
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
    componentDidMount(){
        this.getUserVideos();
    }
    render(){
        return (
            <div className="video-row">
                <h1 className="text-light category">{this.props.category}</h1>
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
        );
  }
}

export default UserVideos;