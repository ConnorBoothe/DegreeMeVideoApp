import React, {Component} from "react";
import "../css/VideoRow.css";
import "../css/YourVideos.css";
import EditVideo from "../components/EditVideo";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import htmlDecode from "../GlobalFunctions/HTMLDecode";
var decode = new htmlDecode()
class YourVideos extends Component {
    constructor(props) {
        super(props);
        this.getUserVideos = this.getUserVideos.bind(this)
        this.state = {
            videos:[]
        }
    }
    componentDidMount(){
        this.getUserVideos();
    }
    getUserVideos(){
        var userId = this.props.user._id;
        if(userId === undefined) {
            userId = JSON.parse(Cookies.get("user"))._id
        }
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/GetUserVideos/'+userId;
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
                };
        fetch(api_route, requestMetadata)
        .then(response => response.json())
            .then(result => {
                this.setState({videos: result})
            })
    }
    renderYourVideos(){
        return (
            <div className="your-videos">
                <h1 className="text-light videos-title">Your Videos</h1>
                <table>
                    <tbody>

                    
                {this.state.videos.map((video, index) => (
                    <tr key={index}>
                       <td><img className="your-video-thumbnail" src={decode.htmlDecode(video.Thumbnail)}/></td>
                       <td>{video.Title}</td>
                       <td><Link to={"EditVideo/"+video._id}className="btn btn-primary">Edit</Link></td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
        );

    }
    render(){

      return this.renderYourVideos()
    }

}

export default YourVideos;