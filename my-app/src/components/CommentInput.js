import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/CommentInput.css';
class CommentInput extends Component {
    render(){
        
        return (
            <div className="comment-input-container" >
                <img className="user-image" src={this.props.user.Image} alt="User"/>
                <input autoComplete="off" type="text" name="comment-input" className="comment-input" placeholder="Add comment" style={{"borderBottom": this.props.borderBottom}}
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