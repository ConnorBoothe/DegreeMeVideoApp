import React, { Component } from "react";
import '../css/ProgressBar.css';
class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.calculateProgressWidth = this.calculateProgressWidth.bind(this)
        this.renderPercentage = this.renderPercentage.bind(this)
    }
    calculateProgressWidth(progress){
        // alert("calc")
        if(progress !== undefined) {
            return 300 * progress
        }
        else{
            return 0;
        }
    }
    renderPercentage(){
        var percentage = Math.round(this.props.progress * 100);
        if(!isNaN(percentage)) {
            return (
                <p className="progress-text">{percentage}%</p>
            )
        }
        else {
            return (
                <p className="progress-text">0%</p>

            )
        }
    }
    render() {
        const computedClassName = this.props.show ? 'uploading' : 'not-uploading';
        return (

            <div id="progress-container" className={computedClassName}>
                <p className="progress-label">{this.props.type}</p>
                <div className="progressBar" style={{ width: 300 }}>
                    <div className="upload-status" style={{ width: this.calculateProgressWidth(this.props.progress) }}><span></span></div>
                </div>
                {this.renderPercentage()}
            </div>
        );




    }
}

export default ProgressBar;