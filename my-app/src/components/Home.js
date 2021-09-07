import React, {Component} from "react";
import VideoRow from "../components/VideoRow";
import CreatorDashboard from "../components/CreatorDashboard";
import Cookies from 'js-cookie';
import TagSelector from "../components/TagSelector"
import AddKeywordsModal from "../components/AddKeywordsModal"

import Tippy from "@tippy.js/react";

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
      tagsClass: "normal-tags-selector",
      isOpen: false
    }
    this.createTagsSelector = this.createTagsSelector.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)

  }
  createTagsSelector(){
    return(
      <div className={"tags-selector " + this.state.tagsClass}>
        <ul>
        {this.props.keywords.map((keyword, index) => (
                <li key={index}>
                   <AnchorLink href={"#"+keyword} className="anchor-selector">
                      <TagSelector name={keyword}/>
                   </AnchorLink>
                  
                </li>
            ))}
            <li>
            <Tippy content="Edit Keywords">
              <div className="tag-selector" onClick={this.showModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
              </div>
              
              </Tippy>
            </li>
        </ul>
        <AddKeywordsModal showModal={this.showModal}
              hideModal={this.hideModal}
              getKeywords = {this.props.getKeywords} 
              addKeyword={this.props.addKeyword} 
              removeKeyword={this.props.removeKeyword}
              keywords={this.props.keywords}
              keyword={this.props.keyword}
              isOpen={this.state.isOpen}/>
      </div>
    );
  }
  showModal(){
    this.setState({isOpen: true})
  }
  hideModal(){
    this.setState({isOpen: false})
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
    this.props.getKeywords();

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
              {this.props.keywords.map((keyword, index) => (
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