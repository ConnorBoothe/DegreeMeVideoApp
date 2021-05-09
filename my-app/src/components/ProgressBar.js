import React, { Component } from "react";
import '../css/ProgressBar.css';
class ProgressBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const computedClassName = this.props.show ? 'uploading' : 'not-uploading';
        return (

            <div id="progress-container" className={computedClassName}>
                <p className="progress-label">{this.props.type}</p>
                <div className="progressBar" style={{ width: 300 }}>
                    <div className="upload-status" style={{ width: 300 * this.props.progress }}><span></span></div>
                </div>
                <p className="progress-text">{Math.round(this.props.progress * 100)}%</p>
            </div>
        );




    }
}

export default ProgressBar;