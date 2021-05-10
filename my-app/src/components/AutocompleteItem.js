import React, {Component} from "react";
import "../css/User.css";
import "../css/AutocompleteItem.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

// import bootstrap from "bootstrap";
class AutocompleteItem extends Component {
    constructor(props){
        super(props)
    }
  render(){
      
    return (
     
        <div className="autocomplete-item" onClick={this.props.hideAutocomplete}>
             {console.log(this.props.text)}
            <Link to={"/Video/"+this.props.videoId}>
              <p className="text-light">{this.props.text}</p>
            </Link>
        </div>
    );
  }
}
export default AutocompleteItem;