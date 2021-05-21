import React, {Component} from "react";
import VideoRow from "../components/VideoRow";
import Header from "../components/Header";

import "../css/Header.css";
import "../css/Home.css";
import 'bootstrap/dist/css/bootstrap.css';

// import bootstrap from "bootstrap";
class Home extends Component {

  render(){
    return (
        <div>
            {/* <h1 className="text-light home-title">Dashboard</h1> */}
            <div className="videos-container">
                <VideoRow category="Calc 1" />
                <VideoRow category="ITSC 1212" />
                <VideoRow category="ITSC 1213" />
            </div>
        </div>
    );
  }
}

export default Home;