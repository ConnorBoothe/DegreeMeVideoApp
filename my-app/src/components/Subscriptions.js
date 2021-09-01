import React, {Component} from "react";
import "../css/Settings.css";
import 'bootstrap/dist/css/bootstrap.css';
import SubscriptionItem from "./Select-SubscriptionItem";
class Subscriptions extends Component {
  constructor(props){
    super(props)
    this.state = {
      subscription_level: "Free Tier",
      freeTierSelected: "none",
      proTierSelected:"2px solid #007bff"
    }
    this.selectSubscription = this.selectSubscription.bind(this)

  }
  selectSubscription(e){
    if(e.target.value === "free_tier") {
      this.props.selectSubscription("Free Tier")
      this.props.hideCardInput();
      this.setState({
        freeTierSelected: "2px solid #007bff",
        proTierSelected: "none"
      })
     
    }
    else {
      this.props.showCardInput();
      this.props.selectSubscription("Pro Tier")

      this.setState({
        freeTierSelected: "none",
        proTierSelected: "2px solid #007bff"
      })
    }
   
  }
  render(){
    return (
        <div>
            <p className="option-keywords-text text-light">Subscription Level</p>
            <SubscriptionItem type="Free Tier" id="free_tier" description="10 minutes of streaming access per month"  
            selectSubscription = {this.selectSubscription.bind("Free Tier")} price={"Free"} selected={this.state.freeTierSelected}
            />
            <SubscriptionItem type="Pro Tier" id="pro_tier" description="Unlimited streaming access" details="Then $8/month"
             selectSubscription = {this.selectSubscription.bind("Pro Tier")} price="Free first month" selected={this.state.proTierSelected} 
             />
        </div> 
    );
  }
}
export default Subscriptions;