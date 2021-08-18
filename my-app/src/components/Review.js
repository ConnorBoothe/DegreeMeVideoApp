import React, {Component} from "react";

import 'bootstrap/dist/css/bootstrap.css';
import FormatDate from "../GlobalFunctions/FormatDate";
import "../css/Review.css";
import HTMLDecode from "../GlobalFunctions/HTMLDecode";
var htmlDecoder = new HTMLDecode();
var formatDate = new FormatDate();
// import ReactPlayer from "react-player";

class Review extends Component {
    render(){
        var stars = [];
        for (var x = 0; x < this.props.Rating; x++) {
            stars.push(<li><span className='star'></span></li>)
        }
        return (
            <div className="review-item" >
                    <p className ="review-name">
                        <img className="review-avatar" src={htmlDecoder.htmlDecode(this.props.Image)} alt="Review avatar"/>
                        {this.props.Name}
                        </p>
                        <ul className="starsList">
                            {stars.map((star, index) => (
                                star
                            ))}
                        </ul>
                       

    
                    <p>{htmlDecoder.htmlDecode(this.props.Message)}</p>
                    <p className="date">{formatDate.displayTimeSince(this.props.Date)}</p>
            </div>        
        );
  }
}

export default Review;