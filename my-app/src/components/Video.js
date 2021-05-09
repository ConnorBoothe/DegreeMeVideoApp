import React, {Component} from "react";
import "../css/VideoRow.css";
import "../css/Video.css";
import 'bootstrap/dist/css/bootstrap.css';
import ReactPlayer from "react-player";

class Video extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="video-item">
                    <img className="thumbnail" src={this.props.Thumbnail}/>
                    <div>
                        <p className="video-title">{this.props.Title}</p>
                        <div className="sub-details">
                            <p className="creator-name">{this.props.Creator}</p>
                            <p className="view-count">{this.props.Views} views</p>
                        </div>
                    </div>
            </div>
                        
        );
  }
}

export default Video;