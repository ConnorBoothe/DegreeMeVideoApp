import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Comments.css';
import CommentInput from "../components/CommentInput"
import Comment from "../components/Comment"
import CreateAccountModal from "../components/CreateAccountModal";
import htmlDecode from "../GlobalFunctions/HTMLDecode";
var decode = new htmlDecode();
class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments : [],
            comment:"",
            showButtons:"none",
            borderBottom: "2px solid #d4d4d4",
        }
        this.addComment = this.addComment.bind(this)
        this.handleCommentChange = this.handleCommentChange.bind(this)
        this.cancelComment = this.cancelComment.bind(this)
        this.showButtons = this.showButtons.bind(this)
        this.getComments = this.getComments.bind(this)
    }
    //show cancel/add comment buttons
    showButtons(){
        this.setState({borderBottom: "2px solid #007bff",
        showButtons: "block"})
    }
    addComment() {
        if(this.props.user._id === undefined) {
            //show modal
            this.props.showModal();
        }
        else {
            if(this.state.comment !== ""){
                const api_route = 'norse-botany-324000.ue.r.appspot.com/API/AddComment';
                const postBody = {
                    Video_Id: this.props.VideoId,
                    User_Id: this.props.user._id,
                    Message: this.state.comment
                };
                const requestMetadata = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postBody)
                };
                fetch(api_route, requestMetadata)
                .then(res => res.json())
                .then((comment)=>{
                  var newCommentsArray = [];
                  newCommentsArray = this.state.comments;
                  console.log(newCommentsArray)
                  newCommentsArray.unshift(comment)
                  this.setState({comments: newCommentsArray,
                    borderBottom:"2px solid #d4d4d4",
                    showButtons:"none",
                    comment: ""
                })
                })
                .catch((err)=>{
                })
            }
        }
        
        
    }
    handleCommentChange(e){
        this.setState({comment: e.target.value});
    }
    cancelComment(){
        this.setState({comment: "", borderBottom:"2px solid #d4d4d4",
            showButtons:"none"});
    }
    componentDidUpdate(prevProps) {
        if(prevProps.VideoId !== this.props.VideoId){
            this.getComments();
          }
    }
    getComments(){
        // alert(window.location.href.split("/")[4])
        const api_route = 'norse-botany-324000.ue.r.appspot.com/API/Comments/'+this.props.VideoId;
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(api_route, requestMetadata)
        .then(res => res.json())
        .then((result)=>{
            this.setState({comments: result})
        })
        .catch((err)=>{
        });
    }
    componentDidMount(){
        this.getComments();
    }
    render(){
        return (
            <div className="comment-list">
                <CreateAccountModal isOpen={this.props.isOpen}
                hideModal={this.props.hideModal}/>
                <CommentInput AddComment={this.addComment}
                show={this.state.showButtons} 
                showButtons={this.showButtons}
                borderBottom={this.state.borderBottom}
                CancelComment = {this.cancelComment}
                HandleCommentChange = {this.handleCommentChange}
                Comment={this.state.comment}
                user={this.props.user}/>
                {this.state.comments.map((comment, index) => (
                    <li key={index}>
                        <Comment 
                            Image={decode.htmlDecode(comment.Author_Img)}
                            Creator={comment.Author_First_Name + " " + comment.Author_Last_Name} 
                            Message={decode.htmlDecode(comment.Message)}
                            Date={comment.Date}
                        />
                    </li>
                    
                ))}
            </div>          
        );
  }
}

export default CommentList;