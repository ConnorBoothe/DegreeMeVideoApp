import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ReviewModal.css";
class ReviewModal extends Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      isOpen: false,
      message: "", 
      rating: 0,
      reviewMsgColor: "text-success",
      showReviewMsg: "none",
      reviewMsg: "Review submitted successfully"
    }
    this.addReview = this.addReview.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)

  }
  showModal(){
    this.setState({isOpen: true})
  }
  hideModal(){
    this.setState({isOpen: false})
  }
  handleMessageChange(e){
    this.setState({message: e.target.value})
  }
  handleRatingChange(e){
    this.setState({rating: e.target.value})
  }
  addReview(){
    console.log(this.props)
    const api_route = 'http://localhost:8080/API/AddReview';
          const postBody = {
              Creator_Id: window.location.href.split("/")[4],
              Author_Id: this.props.user._id,
              Author_Img: this.props.user.Image,
              Author_First_Name: this.props.user.First_Name,
              Author_Last_Name: this.props.user.Last_Name,
              Message:this.state.message,
              Rating: this.state.rating
          };
          const requestMetadata = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(postBody),
          };
          fetch(api_route, requestMetadata)
          .then(res => res.json())
          .then((res)=>{
            console.log(res)
            if(!res){
              this.setState(
                {reviewMsg: "You can only leave a creator one review per month",
                reviewMsgColor: "text-danger"});
            }
            else {
              this.setState(
                {reviewMsg: "Review submitted succesffully",
                reviewMsgColor: "text-success"});
            }
            this.setState({showReviewMsg: "block"})
            setTimeout(()=>{
              this.hideModal();
            }, 2000)
           
          });
  }
  render(){
    return(
      <>
      <button className="btn btn-primary leave-review" onClick={this.showModal}>Leave Review</button>
      <Modal show={this.state.isOpen} onHide={this.hideModal}>
        <Modal.Header>
        {/* <button className="btn-danger" onClick={hideModal}>X</button> */}

          <Modal.Title>Leave a Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
            <textarea onChange={this.handleMessageChange}placeholder="Write your review" className="review-message"></textarea>
            <p className="rating-label">Rating</p>
              <div id="ratingContainer">
                <div class="rating">
                  <input type="radio" className="starVal" name="star" id="star1" value="5" onChange={this.handleRatingChange} /><label for="star1"></label>
                  <input type="radio" className="starVal" name="star" id="star2" value="4" onChange={this.handleRatingChange}/><label for="star2"></label>
                  <input type="radio" className="starVal" name="star" id="star3" value="3" onChange={this.handleRatingChange}/><label for="star3"></label>
                  <input type="radio" className="starVal" name="star" id="star4" value="2" onChange={this.handleRatingChange}/><label for="star4"></label>
                  <input type="radio" className="starVal" name="star" id="star5" value="1" onChange={this.handleRatingChange}/><label for="star5"></label>
                </div>
              </div>
              <button class="btn btn-primary rating-btn" onClick={this.addReview}>Submit Review</button>
              <p className={this.state.reviewMsgColor + " reviewMsg"} style={{display: this.state.showReviewMsg}} >{this.state.reviewMsg}</p>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
  }
}
export default ReviewModal;