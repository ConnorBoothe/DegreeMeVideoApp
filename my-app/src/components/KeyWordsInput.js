import React, { Component } from "react";
import '../css/Keywords.css';
import '../css/VideoUploader.css';
class KeyWordsInput extends Component {
    
    render() {
        return (
            <div className="tags-container">
                <div className="keywords-input-container">
                    <input name="tags" className="keywords-input" ref={this.props.keyword} autoComplete="off"/>
                    <span className="btn-primary add-tags-btn" onClick={this.props.addKeyword}>Add</span>
                </div>
                <p className="text-light your-keywords">Your keywords</p>
                <div className="append-tags">
                    <ul className="keywords-list">
                        {this.props.keywords.map((keyword, index) => (
                            <li key={index}>
                                <div className="tag-container" >
                                    <p key={index} className="tag text-light">
                                    <span className="text-light remove-tag" onClick={() => this.props.removeKeyword(index)}>x</span>
                                        {keyword}
                                    </p>
                                </div>
                            </li>
                            
                        ))}
                    </ul>
                     <p className="keywords-helper-text">Your keywords control the videos that populate your dashboard</p>
                </div>
            </div>
        );
    }
}

export default KeyWordsInput;