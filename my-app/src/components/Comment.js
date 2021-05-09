import React, {Component} from "react";
import "../css/VideoRow.css";
import "../css/Comments.css";
import 'bootstrap/dist/css/bootstrap.css';
import FormatDate from "../GlobalFunctions/FormatDate";
var formatDate = new FormatDate()
class Video extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="comment-item">
                <p className="comment-date">{formatDate.displayDate(new Date(this.props.Date))}</p>

                <div class="comment-user">
                    <img className="user-image" src={this.props.Image}/>
                    <span className="comment-username">{this.props.Creator}</span>
                </div>
                <p className="comment-msg">{this.props.Message}</p>
            </div>
                        
        );
  }
}

export default Video;