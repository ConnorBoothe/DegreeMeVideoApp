import React, {Component} from "react";
import "../css/Settings.css";
// import AvatarCropper from "../components/AvatarCropper";
import 'bootstrap/dist/css/bootstrap.css';
// import Cookies from 'js-cookie';
import  "../css/SearchResults.css";
import Video from "../components/SearchResultVideo";
import { Link } from 'react-router-dom';
import NoResultsImage from "../images/NoResults.svg";
import HTMLDecode from "../GlobalFunctions/HTMLDecode";
var htmlDecode = new HTMLDecode();
class SearchResults extends Component {
  constructor(props){
    super(props)
    this.state = {
        videos: [],
        searchLabel: "",
        noResults: false
    }
    this.getVideosFromSearchValue = this.getVideosFromSearchValue.bind(this)
    this.renderResults = this.renderResults.bind(this)
    this.setSearchLabel = this.setSearchLabel.bind(this)
    this.showNoResults = this.showNoResults.bind(this)


}
setSearchLabel(){
    if(this.props.searchValue !== ""){
        this.setState({searchLabel: this.props.searchValue})
    }
    else {
        this.setState({searchLabel: window.location.href.split("/")[4]})

    }
}
  componentDidMount(){
      this.getVideosFromSearchValue();
      this.setSearchLabel();
      this.render();
  }
//   componentDidUpdate(){
//     this.getVideosFromSearchValue();
// }
  getVideosFromSearchValue(){
    var search = "";
      if(this.props.searchValue !== "") {
        search = this.props.searchValue;
      }
      else {
        search = this.props.match.params.id;
      }
    const api_route = 'norse-botany-324000.ue.r.appspot.com/API/GetVideosBySearchValue/'+search;
    const requestMetadata = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(api_route, requestMetadata)
    .then(response => response.json())
        .then(result => {

            this.setState({videos: result})
            if(result.length > 0){
                this.setState({noResults: false})
            }
            else {
                this.setState({noResults: true})

            }
        })
  }
  shortenVideoDescription(description){
      if(description.length > 50) {
          return description.substring(0,50) + "...";
      }
      else {
          return description;
      }
  }
  showNoResults(){
    if(this.state.noResults) {
       return (
        <img className="no-results-img" src={NoResultsImage} alt="No results"/>
       );
   }
   else {
       return (
            <div className="loader-search-results"></div>      
       );
   }
  }
  renderResults(){
      if(this.state.videos.length > 0) {
        return (
            this.state.videos.map((video, index) => (
                <li key={index}>
                   <div className="video-item-container">
                       <Link to={"/Video/"+video._id}>
                           <Video Id={video._id} Title={video.Title} Thumbnail ={video.Thumbnail}
                           Creator={video.Creator} Views={video.Views} image={video.Creator_Image}
                           date={video.Date} description={this.shortenVideoDescription(video.Description)}/>
                       </Link>
                   </div>
               </li>
           ))
        )
      }
      else{

          return (
              <div>
                  {this.showNoResults()}
              </div>
          );
      }
  }
  render(){
    return (
        <div className="search-results">
            <h2 className="text-light video-label">
                {this.state.videos.length} results matching <span className="search-value-label">{htmlDecode.convertQueryString(this.state.searchLabel)}</span>
            </h2>
            <ul className="search-results-list">
               {this.renderResults()} 
            </ul>
            
        </div>
    );
  }
}
export default SearchResults;