import React, {Component} from "react";
import "../css/User.css";
import "../css/AutocompleteItem.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

class AutocompleteItem extends Component {
  render(){
      
    return (
     
        <div className="autocomplete-item" onClick={this.props.hideAutocomplete}>
            <Link to={"/Video/"+this.props.videoId}>
              <p className="text-light">{this.props.text}</p>
            </Link>
        </div>
    );
  }
}
export default AutocompleteItem;