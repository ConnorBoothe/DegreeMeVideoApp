import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Comments.css';
import CommentInput from "../components/CommentInput"
import Comment from "../components/Comment"

class Video extends Component {
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
            Author_First_Name: "Connor",
            Author_Last_Name: "Boothe",
            Author_Id: "Fake id",
            Author_Img: "https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/userImages%2F%40cboothe?alt=media&token=32d57150-275d-4a88-8417-090498ffeada",
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
    componentDidMount(){
        console.log(this.props)
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
            alert("Error")
        });
    }
    render(){
        return (
            <div class="comment-list">
                <CommentInput AddComment={this.addComment}
                show={this.state.showButtons} 
                showButtons={this.showButtons}
                borderBottom={this.state.borderBottom}
                CancelComment = {this.cancelComment}
                HandleCommentChange = {this.handleCommentChange}
                Comment={this.state.comment}/>
                {this.state.comments.map((comment, index) => (
                    <Comment 
                    Image="https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/userImages%2F%40cboothe?alt=media&token=32d57150-275d-4a88-8417-090498ffeada"
                    Creator={comment.Author_First_Name + " " + comment.Author_Last_Name} 
                    Message={comment.Message}
                    Date={comment.Date}
                    />
                ))}
            </div>          
        );
  }
}

export default Video;