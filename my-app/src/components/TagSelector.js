import React, { Component } from "react";
import '../css/TagSelector.css';
import htmlDecode from "../GlobalFunctions/HTMLDecode";
var decode = new htmlDecode()
class TagsInput extends Component {
    
    render() {
        return (
            <div className="tag-selector">
               <p>{this.props.name}</p>
            </div>
        );
    }
}

export default TagsInput;