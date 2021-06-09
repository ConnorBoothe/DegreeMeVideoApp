import React, { Component } from "react";
import '../css/TagsInput.css';
import '../css/VideoUploader.css';
class TagsInput extends Component {
    constructor(props) {
        super(props);
    }
   
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
                        <div className="tag-container" >
                            <p key={index} className="tag">
                            <span className="text-light remove-tag" onClick={() => this.props.removeTag(index)}>x</span>
                                {tag}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default TagsInput;