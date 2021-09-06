import React, { Component } from "react";
import '../css/LandingPage.css';
import person1 from "../images/person1.svg"
import person2 from "../images/person2.svg"
import person3 from "../images/person3.svg"
import person4 from "../images/person4.svg"
import person5 from "../images/person5.svg"
import TagSelector from "../components/TagSelector"
import VideoRow from "../components/VideoRow";
import AnchorLink from 'react-anchor-link-smooth-scroll'

import { Link } from 'react-router-dom';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tags: ["Java", "ITSC 1213", "Calc 1","Calc 2"],
        tagsClass: "normal-tags-selector"
    }
    this.createTagsSelector = this.createTagsSelector.bind(this)
    this.renderVideoRows = this.renderVideoRows.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
}
componentDidMount() {
  window.addEventListener('scroll', this.handleScroll);
}
componentWillUnmount() {
  window.removeEventListener('scroll', this.handleScroll);
}

handleScroll(event) {
  let scrollTop = event.srcElement.body.scrollTop;
     
      if(window.pageYOffset > 55){
        this.setState({
          tagsClass: "sticky-tags-selector"
        });
      }
      else{
        this.setState({
          tagsClass: "normal-tags-selector"
        });
      }
  
}
    renderVideoRows(){
        return (
          <div className="videos-container">
                {this.state.tags.map((keyword, index) => (
                  <li key={index}>
                    <section id={keyword}>
                      <VideoRow category={keyword}/>
                  </section>
                  </li>
              ))}
              </div>
        )
    }
    createTagsSelector(){
      return(
        <div className={"tags-selector " + this.state.tagsClass}>
          <ul>
          {this.state.tags.map((keyword, index) => (
                  <li key={index}>
                     <AnchorLink href={"#"+keyword} className="anchor-selector">
                     <TagSelector name={keyword}/>
                     </AnchorLink>
                    
                  </li>
              ))}
          </ul>
        </div>
      );
    }
    render() {
        return (
            <div className="landing-page">
              {this.createTagsSelector()}
                 <div className="landing"> 
                 
                <div className="landing--text--title landing--margin title--landing text-light">
                    How-to videos created for UNCC Comp Sci. Students <br />
                </div>
                <div className="landing--people" id="landing--animation--1">
                    <img
                      id="landing--person1--animation"
                      src={person1}
                      alt="Person 1"
                    ></img>
                    <img
                      id="landing--person2--animation"
                      src={person2}
                      alt="Person 2"
                    ></img>
                    <img
                      id="landing--person3--animation"
                      src={person3}        
                      alt="Person 3"            
                      ></img>
                    <img
                      id="landing--person4--animation"
                      src={person4}      
                      alt="Person 4"   
                      ></img>
                    <img
                      id="landing--person5--animation"
                      src={person5}
                      alt="Person 5"
                    ></img>
                </div>
                <Link to="/CreateAccount">
                   <button className="btn btn-primary landing-sign-up">Sign Up</button>
                </Link>
            </div>
            {this.renderVideoRows()}
            {/* <div className="feature1">
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
                    <Link to="/CreateAccount" className="landing--text--yellow text--link">
                      Start earning today 
                    </Link>                </div>
            </div>
            <div className="feature4">
          <div className="landing--text--big">Our Vision</div>
          <div className="landing--text--small">
            We aim to simplify college
            by connecting you with knowledgeable creators
            that have taken the courses you need help with.
          </div>
   
           <img className="students-studying" src={studentsStudying} alt="Student Studying"/>
          
    
          
        </div> */}
            </div>
            
        );
    }
}

export default LandingPage;