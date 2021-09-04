import React, {Component} from "react";
import "../css/VideoRow.css";
import Video from "../components/Video";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import htmlDecode from "../GlobalFunctions/HTMLDecode";
var decode = new htmlDecode()
class VideoRow extends Component {
    constructor(props) {
        super(props);
        this.getVideos = this.getVideos.bind(this)
        this.state = {
            videos:[],
            isMounted: false
        }
    }
    componentDidMount(){
        this.setState({isMounted: true});
        this.getVideos();
    }
    componentWillUnmount(){
        this.setState({isMounted: false})
    }
    getVideos(){
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/GetVideosBySearchValue/'+this.props.category;
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
                };
        fetch(api_route, requestMetadata)
        .then(response => response.json())
            .then(result => {
                if(this.state.isMounted) {
                    this.setState({videos: result})
                }
            })
    }
    renderVideoRow(){
        return (
            <div className="video-row">
                <h1 className="text-light category">{decode.htmlDecode(this.props.category)}</h1>
                <ul>
                {this.state.videos.map((video, index) => (
                    <li key={index}>
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
    render(){
      return this.renderVideoRow()
    }

}

export default VideoRow;