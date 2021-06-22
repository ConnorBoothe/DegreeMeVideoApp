import React, { Component } from "react";
import '../css/Keywords.css';
import '../css/VideoUploader.css';
class KeyWordsInput extends Component {
    renderYourKeywordsText(){
        if(this.props.keywords.length > 0){
            return(
                <p className="text-light your-keywords">Your keywords</p>
            );
        }
    }
    render() {
        console.log(this.props.keywords)
        return (
            <div className="tags-container">
                <div className="keywords-input-container">
                    <input name="tags" className="keywords-input" ref={this.props.keyword} autoComplete="off"/>
                    <span className="btn-primary add-tags-btn" onClick={this.props.addKeyword}>Add</span>
                </div>
                    {this.renderYourKeywordsText()}
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
                     <p className="keywords-helper-text">Keywords control the videos that populate your dashboard</p>
                </div>
            </div>
        );
    }
}

export default KeyWordsInput;