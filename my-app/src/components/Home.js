import React, {Component} from "react";
import VideoRow from "../components/VideoRow";
import CreatorDashboard from "../components/CreatorDashboard";
import Cookies from 'js-cookie';
import TagSelector from "../components/TagSelector"
import "../css/Header.css";
import "../css/Home.css";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Redirect
} from "react-router-dom";
import AnchorLink from 'react-anchor-link-smooth-scroll'



// import bootstrap from "bootstrap";
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      keywords : [],
      tagsClass: "normal-tags-selector"
    }
    this.getKeywords = this.getKeywords.bind(this)
    this.createTagsSelector = this.createTagsSelector.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }
  createTagsSelector(){
    return(
      <div className={"tags-selector " + this.state.tagsClass}>
        <ul>
        {this.state.keywords.map((keyword, index) => (
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
  getKeywords(){
    if(Cookies.get("user") !== undefined) {
      var user = {};
      if(this.props.user._id === undefined) {
        user = JSON.parse(Cookies.get("user"));
    }
    else {
      user = this.props.user
    }
    const api_route = process.env.REACT_APP_REQUEST_URL+'/API/keywords/'+ user._id;
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
              if(result.length > 0){
              for(var i = 0; i < result.length; i++ ){
                keywords.push(result[i].Word)
              } 
              this.setState({
                keywords: keywords
              }) 
            }  
            else{
              this.setState({
                keywords: ["ITSC 1212", "ITSC 1213", "Calc 1","Calc 2"]
              }) 
            }           
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
    window.addEventListener('scroll', this.handleScroll);
    this.getKeywords();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(event) {
    let scrollTop = event.srcElement.body.scrollTop,
        itemTranslate = Math.min(0, scrollTop/3 - 60);
        console.log(window.pageYOffset)
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
    var user = Cookies.get("user");
    if(user !== undefined){
      return (
        <div className="videos-container">
              {this.state.keywords.map((keyword, index) => (
                <li key={index}>
                  <section id={keyword}>
                    <VideoRow category={keyword}/>
                  </section>
                </li>
            ))}
            </div>
      )
    }
    else {
      return(
        <Redirect to="/LandingPage" />
      )
    }
  }
  render(){
    return (
        <div>
        {this.createTagsSelector()}
        {this.renderCreatorDashboard()}       
        {this.renderVideoRows()}
        </div>
    );
  }
}

export default Home;