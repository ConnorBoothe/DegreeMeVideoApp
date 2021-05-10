import React, { Component } from "react";
import '../css/Notification.css';
import FormatDate from "../GlobalFunctions/FormatDate";
var formatDate = new FormatDate()
class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="notification-item" >
                <ul className="notif-sub-list">
                    <li>
                        <ul>
                            <li>
                                <p className="unread"></p>
                            </li>
                            <li>
                                <img className="notification-image" src="https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/userImages%2F%40cboothe?alt=media&token=32d57150-275d-4a88-8417-090498ffeada"/>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="notification-message-container">
                            <p className="notification-name">Connor Boothe</p>
                            <p className="notification-message">This is the notification</p>
                            <p className="notification-date">{formatDate.displayDate(new Date())}</p>
                        </div>
                    </li>
                </ul>
                 
                
              
            </div>
        );
    }
}

export default Notification;