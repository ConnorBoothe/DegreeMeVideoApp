import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/CommentInput.css';
class CommentInput extends Component {
    constructor(props) {
        super(props);
    }
   
    render(){
        return (
            <div className="comment-input-container" >
                <img className="user-image" src="https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/userImages%2F%40cboothe?alt=media&token=32d57150-275d-4a88-8417-090498ffeada"/>
                <input type="text" name="comment-input" className="comment-input" placeholder="Add comment" style={{"border-bottom": this.props.borderBottom}}
                    onFocus={this.props.showButtons}  onChange={this.props.HandleCommentChange}
                    value={this.props.Comment} />
                <div className="comment-buttons" style={{"display":this.props.show}}>
                    <ul>
                        <li>
                        <button className ="btn-secondary" onClick={this.props.CancelComment}>
                            Cancel
                        </button>
                        </li>
                        <li onClick={this.props.AddComment}>
                            <button className ="btn-primary">
                                Comment
                            </button>
                        </li>
                    </ul>
                </div>
            </div>           
        );
  }
}

export default CommentInput;