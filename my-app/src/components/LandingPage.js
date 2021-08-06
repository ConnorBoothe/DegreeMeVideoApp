import React, { Component } from "react";
import '../css/LandingPage.css';
import person1 from "../images/person1.svg"
import person2 from "../images/person2.svg"
import person3 from "../images/person3.svg"
import person4 from "../images/person4.svg"
import person5 from "../images/person5.svg"
import studentsStudying from "../images/students-studying.svg"
import { Link } from 'react-router-dom';

class LandingPage extends Component {

    render() {
        return (
            <div className="landing-page">
                 <div className="landing"> 
                <div className="landing--text--title landing--margin title--landing text-light">
                    How-to videos created for UNCC Comp Sci. Students <br />
                </div>
                <Link to="/CreateAccount">
                   <button className="btn btn-primary landing-sign-up">Sign Up</button>
                </Link>
                <div class="landing--people" id="landing--animation--1">
                    <img
                      id="landing--person1--animation"
                      src={person1}
                    ></img>
                    <img
                      id="landing--person2--animation"
                      src={person2}
                    ></img>
                    <img
                      id="landing--person3--animation"
                      src={person3}                    ></img>
                    <img
                      id="landing--person4--animation"
                      src={person4}                    ></img>
                    <img
                      id="landing--person5--animation"
                      src={person5}
                    ></img>
                </div>
                <svg className="landing--wave" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><path id="wave1" d=""/></svg>
            </div>
            <div className="feature1">
                <div>
                    <div className="font--curly">Monetize your knowledge</div>
                    <div className="landing--text--big">
                      Earn 
                      <span className="landing--text--yellow" id="landing--section1">
                      passive income 
                      </span>
                      with the knowledge you've gained through school.
                    </div>
                  
                    <div className="landing--text--small">
                      DegreeMe shares 20% of subscription revenue with creators. 
                      Each creator is paid based on the percentage of views 
                      they generate.
                    </div>
                    <Link to="/CreateAccount" class="landing--text--yellow text--link">
                      Start earning today 
                    </Link>                </div>
            </div>
            <div class="feature4">
          <div class="landing--text--big">Our Vision</div>
          <div class="landing--text--small">
            We aim to simplify college
            by connecting you with knowledgeable creators
            that have taken the courses you need help with.
          </div>
   
           <img className="students-studying" src={studentsStudying}/>
          
    
          
        </div>
            </div>
            
        );
    }
}

export default LandingPage;