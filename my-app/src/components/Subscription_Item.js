import React, {Component} from "react";
import { Popover } from 'react-tiny-popover';

class Subscription_Item extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isPopoverOpen: false
        }
        this.cancelSubscription = this.cancelSubscription.bind(this)
    }
    togglePopover(){
        this.setState({isPopoverOpen: !this.state.isPopoverOpen}); 
    }
    cancelSubscription(subscription_id){
        this.props.showRemoveSubLoader();
        const api_route = 'http://localhost:8080/API/CancelSubscription';
            const postBody = {
                UserId: this.props.user._id,
                subscription: subscription_id
            };
            const requestMetadata = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postBody),
            };
            fetch(api_route, requestMetadata)
            .then(res => res.json())
            .then((result)=>{
                this.props.setUser(result);
                this.props.getStripeSubscriptions();
                this.props.hideRemoveSubLoader();
            })
    }
    render() {
        return (
        <li className="text-light sub-li">
            <div>
                <p className="pro-tier-access">Pro Access</p>
                <p className="brand">${this.props.sub.plan.amount / 100} per {this.props.sub.plan.interval}
                <span className="three-dots" onClick={()=> this.togglePopover()}>
                <Popover
                    isOpen={this.state.isPopoverOpen}
                    
                    positions={[ 'right', 'top']} // preferred positions by priority
                    content={<div className="text-light card-popover">
                        <ul>
                            <li ><span className="badge badge-danger" onClick={()=>this.cancelSubscription(this.props.sub.id)} >End Subscription</span></li>
                            </ul></div>}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                </Popover>
                </span>
                </p>
            </div>
                <div>
                </div>
        </li>
        )
    }
}
export default Subscription_Item;