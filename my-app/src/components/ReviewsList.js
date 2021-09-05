import React, {Component} from "react";
import "../css/Review.css";
import Review from "../components/Review";
import 'bootstrap/dist/css/bootstrap.css';


class ReviewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        }
        this.getUserReviews= this.getUserReviews.bind(this)
        
    }
    getUserReviews(){
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/GetUserReviews/'+window.location.href.split("/")[4];
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
                };
        fetch(api_route, requestMetadata)
        .then(response => response.json())
            .then(result => {
                this.setState({reviews: result})
            })
      }
    componentDidMount(){
        this.getUserReviews();
    }
    render(){
        return (
            <div className="review-row">
                <h1 className="text-light category">{this.props.category}</h1>
                <ul className="reviews-list">
                    
                {this.state.reviews.map((review, index) => (
                   
                    <li>
                        <Review Name={review.Author_First_Name + 
                        " " + review.Author_Last_Name} 
                        Rating={review.Rating} 
                        Message={review.Message} 
                        Date={review.Date}
                        Image={review.Author_Img}/>
                    </li>
                ))}
                </ul>
            </div>
        );
  }
}

export default ReviewsList;