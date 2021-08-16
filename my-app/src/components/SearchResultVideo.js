import React, {Component} from "react";
import "../css/VideoRow.css";
import "../css/Video.css";
import 'bootstrap/dist/css/bootstrap.css';
import FormatDate from "../GlobalFunctions/FormatDate";
import HtmlDecode from '../GlobalFunctions/HTMLDecode'
var formatDate = new FormatDate();
var decode = new HtmlDecode();

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
                    <div className="playIcon-search-results" style={{"display": this.state.showPlayIcon}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                        </svg>
                    </div>
                    <img className="thumbnail-search-result" src={decode.htmlDecode(this.props.Thumbnail)} alt="Thumbnail"/>

                    <div className="video-details-search-result">
                        <div className="sub-details-search-result">
                            <p className="video-title-search-result text-light">
                                {this.props.Title}
                            </p>
                            <p className="view-count-search-result">{this.props.Views} views 
                                <span className="video-date-search-result">
                                    {formatDate.displayTimeSince(this.props.date)}
                                </span>
                                </p>
                                <p className="text-light video-description-search-result">{this.props.description}</p>
                            <p className="creator-name-search-result">
                                <img className="creator-img-search-result" src={this.props.image} alt="Creator"/>
                                {this.props.Creator}
                                </p>
                        </div>
                    </div>
            </div>          
        );
  }
}

export default Video;