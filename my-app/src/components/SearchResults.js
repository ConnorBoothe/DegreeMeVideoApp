import React, {Component} from "react";
import "../css/Settings.css";
import AvatarCropper from "../components/AvatarCropper";
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import  "../css/SearchResults.css";
import Video from "../components/SearchResultVideo";
import { Link } from 'react-router-dom';
import NoResultsImage from "../images/NoResults.svg";
class SearchResults extends Component {
  constructor(props){
    super(props)
    this.state = {
        videos: []
    }
    this.getVideosFromSearchValue = this.getVideosFromSearchValue.bind(this)
    this.renderResults = this.renderResults.bind(this)
}
  componentDidMount(){
      this.getVideosFromSearchValue();
  }
//   componentDidUpdate(){
//     this.getVideosFromSearchValue();
// }
  getVideosFromSearchValue(){
    const api_route = 'http://localhost:8080/API/GetVideosBySearchValue/'+this.props.searchValue;
    const requestMetadata = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(api_route, requestMetadata)
    .then(response => response.json())
        .then(result => {
            console.log(result)
            this.setState({videos: result})
        })
  }
  renderResults(){
      if(this.state.videos.length > 0) {
        return (
            this.state.videos.map((video, index) => (
                <li>
                   <div className="video-item-container">
                       <Link to={"/Video/"+video._id}>
                           <Video Id={video._id} Title={video.Title} Thumbnail ={video.Thumbnail}
                           Creator={video.Creator} Views={video.Views} image={video.Creator_Image}
                           date={video.Date} description={video.Description}/>
                       </Link>
                   </div>
               </li>
           ))
        )
      }
      else{
          return (
              <div>
                <img className="no-results-img" src={NoResultsImage}/>
              </div>
          );
      }
    
  }
  render(){
    return (
        <div>
            <h2 className="text-light video-label">
                {this.state.videos.length} results matching <span className="search-value-label">{this.props.searchValue}</span>
            </h2>
            <ul className="search-results-list">
               {this.renderResults()} 
            </ul>
            
        </div>
    );
  }
}
export default SearchResults;