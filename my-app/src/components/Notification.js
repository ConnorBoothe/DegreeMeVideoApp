import React, { Component } from "react";
import '../css/Notification.css';
import FormatDate from "../GlobalFunctions/FormatDate";
import { Link } from 'react-router-dom';

var formatDate = new FormatDate()
class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="notification-item" onClick={this.props.hideMenu} >
                <Link to={"/Video/"+this.props.VideoId}>
                <ul className="notif-sub-list">
                    <li>
                        <ul>
                            <li>
                                <p className="unread"></p>
                            </li>
                            <li>
                                <img className="notification-image" src={this.props.userImage}/>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="notification-message-container">
                            <p className="notification-name">{this.props.name}</p>
                            <p className="notification-message">{this.props.message}</p>
                            <p className="notification-date">{formatDate.displayTimeSince(this.props.date)}</p>
                        </div>
                    </li>
                </ul>
                </Link>
                
              
            </div>
        
        );
    }
}

export default Notification;