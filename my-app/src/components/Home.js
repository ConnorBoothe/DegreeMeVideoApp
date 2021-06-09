import React, {Component} from "react";
import VideoRow from "../components/VideoRow";
import CreatorDashboard from "../components/CreatorDashboard";

import "../css/Header.css";
import "../css/Home.css";
import 'bootstrap/dist/css/bootstrap.css';

// import bootstrap from "bootstrap";
class Home extends Component {
  renderCreatorDashboard(){
    if(this.props.user._id !== undefined) {
      return (
        <CreatorDashboard />
      );
    }
  }
  render(){
    return (
        <div>
        {this.renderCreatorDashboard()}       
     <div className="videos-container">
              <h2 className="text-light suggested-label">Suggested Videos</h2>
                <VideoRow category="ITSC 1212" />
                <VideoRow category="ITSC 1213" />
                <VideoRow category="Calc 1" />
                <VideoRow category="Calc 2" />
            </div>
        </div>
    );
  }
}

export default Home;