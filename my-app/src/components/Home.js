import React, {Component} from "react";
import VideoRow from "../components/VideoRow";
import CreatorDashboard from "../components/CreatorDashboard";
import Cookies from 'js-cookie';

import "../css/Header.css";
import "../css/Home.css";
import 'bootstrap/dist/css/bootstrap.css';

// import bootstrap from "bootstrap";
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      keywords : ["ITSC 1212", "ITSC 1213", "Calc 1","Calc 2" ]
    }
    this.getKeywords = this.getKeywords.bind(this)
  }
  getKeywords(){
    if(Cookies.get("user") !== undefined) {
      var user = {};

      if(this.props.user._id === undefined) {
        user = JSON.parse(Cookies.get("user"));
    }
    else {
      user = this.props.user
    }
    const api_route = 'http://localhost:8080/API/keywords/'+ user._id;
    const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
                };
        fetch(api_route, requestMetadata)
        .then(response => response.json())
            .then(result => {
              var keywords = [];
              for(var i = 0; i < result.length; i++ ){
                keywords.push(result[i].Word)
              } 
              this.setState({keywords: keywords})              
            })
    }
    
   }
  renderCreatorDashboard(){
    if(this.props.user._id !== undefined) {
      return (
        <CreatorDashboard />
      );
    }
  }
  componentDidMount(){
    this.getKeywords();
  }

  render(){
    return (
        <div>
        {this.renderCreatorDashboard()}       
     <div className="videos-container">
              <h2 className="text-light suggested-label">Suggested Videos</h2>
              {this.state.keywords.map((keyword, index) => (
                <li key={index}>
                  <VideoRow category={keyword} />
                </li>
            ))}
            </div>
        </div>
    );
  }
}

export default Home;