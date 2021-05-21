import React, {Component} from "react";
import "../css/VideoRow.css";
import "../css/Video.css";
import 'bootstrap/dist/css/bootstrap.css';
import FormatDate from "../GlobalFunctions/FormatDate";
var formatDate = new FormatDate();
// import ReactPlayer from "react-player";

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPlayIcon: "none"
        }
        this.showPlayIcon = this.showPlayIcon.bind(this)
        this.hidePlayIcon = this.hidePlayIcon.bind(this)
    }
    showPlayIcon(){
        this.setState({showPlayIcon: "block"})
    }
    hidePlayIcon(){
        this.setState({showPlayIcon: "none"})
    }
    render(){
        return (
            <div className="video-item" onMouseOut={this.hidePlayIcon} onMouseOver={this.showPlayIcon}>
                    <div className="playIcon" style={{"display": this.state.showPlayIcon}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                        </svg>
                    </div>
                    <img className="thumbnail" src={this.props.Thumbnail}/>
                    <img className="creator-img" src={this.props.image}/>

                    <div className="video-details">

                        <p className="video-title">

                            {this.props.Title}
                            </p>
                        <div className="sub-details">
                            <p className="creator-name">
                                
                                {this.props.Creator}
                                </p>
                            <p className="view-count">{this.props.Views} views 
                                {/* <span className="view-date-separator">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8"/>
                                    </svg>
                                </span>  */}
                                <span className="video-date">
                                    {formatDate.displayTimeSince(this.props.date)}
                                </span>
                                </p>
                            
                        </div>
                    </div>
            </div>
                        
        );
  }
}

export default Video;