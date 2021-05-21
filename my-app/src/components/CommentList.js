import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Comments.css';
import CommentInput from "../components/CommentInput"
import Comment from "../components/Comment"

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
        const api_route = 'http://localhost:8080/API/AddComment';
        const postBody = {
            Video_Id: this.props.VideoId,
            Author_First_Name: this.props.user.First_Name,
            Author_Last_Name: this.props.user.Last_Name,
            Author_Id: this.props.user._id,
            Author_Img: this.props.user.Image,
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
          var newCommentsArray = new Array();
          newCommentsArray = this.state.comments;
          newCommentsArray.unshift(comment)
          this.setState({comments: newCommentsArray,
            borderBottom:"2px solid #d4d4d4",
            showButtons:"none"})
        })
        .catch((err)=>{
            console.log(err)
            alert("Error")
        })
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
        const api_route = 'http://localhost:8080/API/Comments/'+window.location.href.split("/")[4];
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(api_route, requestMetadata)
        .then(res => res.json())
        .then((result)=>{
            console.log(result)
            this.setState({comments: result})
        })
        .catch((err)=>{
            console.log(err)
        });
    }
    componentDidMount(){
        this.getComments();
    }
    htmlDecode(input){
        var e = document.createElement('textarea');
        e.innerHTML = input;
        // handle case of empty input
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      }
    render(){
        return (
            <div className="comment-list">
                <CommentInput AddComment={this.addComment}
                show={this.state.showButtons} 
                showButtons={this.showButtons}
                borderBottom={this.state.borderBottom}
                CancelComment = {this.cancelComment}
                HandleCommentChange = {this.handleCommentChange}
                Comment={this.state.comment}
                user={this.props.user}/>
                {this.state.comments.map((comment, index) => (
                    <Comment 
                    Image={this.htmlDecode(comment.Author_Img)}
                    Creator={comment.Author_First_Name + " " + comment.Author_Last_Name} 
                    Message={this.htmlDecode(comment.Message)}
                    Date={comment.Date}
                    />
                ))}
            </div>          
        );
  }
}

export default CommentList;