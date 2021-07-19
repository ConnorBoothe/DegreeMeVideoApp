import React, {Component} from "react";
import "../css/SubscriptionItem.css";
import 'bootstrap/dist/css/bootstrap.css';
class SubscriptionItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      subscription_level: "Free Tier",
      selected: this.props.selected
    } 
  }
 
  render(){
    return (
        <div className="sub-container">
          <label htmlFor={this.props.id} className="subscription-item" style={{border: this.props.selected}}>
            <p className="option-keywords-text text-light sub-title">{this.props.type}</p>
              <p className="text-light sub-desc">{this.props.description}</p>
              <p className="option-keywords-text text-light price">{this.props.price}</p>
          </label>
          <input className="sub-radio" type="radio" id={this.props.id} name="tier" value={this.props.id} onChange={this.props.selectSubscription} />
        </div>
    );
  }
}
export default SubscriptionItem;