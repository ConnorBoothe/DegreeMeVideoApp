import React, { Component } from "react";
import '../css/TagsInput.css';
import '../css/VideoUploader.css';
import htmlDecode from "../GlobalFunctions/HTMLDecode";
var decode = new htmlDecode()
class TagsInput extends Component {
    
    render() {
        return (
            <div className="tags-container">
                <div className="tags-input-container">
                <p className="input-label">Add tags</p>
                    <input name="tags" className="tags-input" ref={this.props.tag} autoComplete="off"/>
                    <span className="btn-primary add-tags-btn" onClick={this.props.addTag}>Add</span>
                </div>

                <div className="append-tags">
                    {this.props.tags.map((tag, index) => (
                        <div key={index} className="tag-container" >
                            <p className="tag">
                            <span className="text-light remove-tag" onClick={() => this.props.removeTag(index)}>x</span>
                                {decode.htmlDecode(tag)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default TagsInput;