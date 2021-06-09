import React, {Component} from "react";
import "../css/Header.css";
import "../css/SearchBar.css";
import 'bootstrap/dist/css/bootstrap.css';
import AutocompleteItem from "../components/AutocompleteItem"
import { BrowserRouter as Router, Redirect, useHistory } from 'react-router-dom';
import SearchResults from '../components/SearchResults'
import { Link } from 'react-router-dom';

// import bootstrap from "bootstrap";
class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            showAutocomplete: "none",
            autocomplete: [],
            searchText: "", 
            redirect: false
          }
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.showAutocomplete = this.showAutocomplete.bind(this)
        this.hideAutocomplete = this.hideAutocomplete.bind(this)
        this.autocomplete = this.autocomplete.bind(this)
        this.search = this.search.bind(this)
        this.handleSearchOnEnter = this.handleSearchOnEnter.bind(this)
        this.redirectToResults = this.redirectToResults.bind(this)

    }
    showAutocomplete(){
        this.setState({showAutocomplete: "none"})
    }
    hideAutocomplete(){
        alert("hide")
        this.setState({
            searchValue: ""
        })
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({showAutocomplete: "none"});
        }
    }
    handleAutocompleteChange(e){
        console.log("hide")
        this.setState({autocompleteText: e.target.value});

    }
    autocomplete(e){
        this.setState({searchText: e.target.value})
        this.props.setSearchValue(e.target.value)
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    search(){
         this.setState({searchText: ""})
        return (
            <Redirect to="/SearchResults/"/>
        );
    }
    handleSearchOnEnter(e){
        if(e.key == "Enter") {
            this.props.redirectToResults();
            this.setState({searchText: ""});
        }
        
    }
    redirectToResults(){
        if(this.state.redirect) {
            return (
                
                <Redirect push to="/SearchResults"/>

            )
        }
    }
  render(){
    return (
        <div className="search-bar" ref={this.wrapperRef}>
            <div className="search-container">
                
                    <input autoComplete="off" value={this.state.searchText} type="text" placeholder="Search Videos" 
                    onChange={this.autocomplete} onKeyPress={this.handleSearchOnEnter}/>
                
                <Link to="/SearchResults">
                    <span className="search-icon" onClick={this.search}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#d4d4d4" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </span>
                </Link>
              
            </div>
            <div className="search-autocomplete" 
            style={{"display": this.state.showAutocomplete}}>
                  {this.state.autocomplete.map((video, index) => (
                      <AutocompleteItem text={video.Title} videoId={video._id}
                      hideAutocomplete={this.hideAutocomplete}
                      emptyText={this.emptyText}/>
                  ))}
            </div>
        </div>
    );
  }
}

export default SearchBar;