import React, {Component} from "react";
import { Popover } from 'react-tiny-popover';
import 'bootstrap/dist/css/bootstrap.css';
import "../css/PaymentSettings.css"
import { Link } from 'react-router-dom';

import Visa_SVG from "../images/visa.svg"
import FormatDate from "../GlobalFunctions/FormatDate";
import PaymentCard from "../components/PaymentCard";
import AddPaymentMethod from "./AddPaymentMethod";
import Subscription_Item from "../components/Subscription_Item"
const formatDate = new FormatDate()
class PaymentSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            paymentMethods:[],
            subscriptions:[],
            payments:[],
            customer: {},
            upcomingPayments: [],
            isCardPopoverOpen: false,
            showCardInput: true,
            subscriptionLoading: false,
            cardLoading: false,
            subscriptionLoadingText: "Adding",
            containsNoPaymentMethod: false,
            hasDefault: false,
            disableSubButton: false
            
        }
        this.getStripePaymentMethods = this.getStripePaymentMethods.bind(this)
        this.getStripeSubscriptions = this.getStripeSubscriptions.bind(this)
        this.getPastTransactions = this.getPastTransactions.bind(this)
        this.renderPayments = this.renderPayments.bind(this)
        this.renderUpcomingPayments = this.renderUpcomingPayments.bind(this)
        this.getUpcomingPayments = this.getUpcomingPayments.bind(this)
        this.getStripeCustomer = this.getStripeCustomer.bind(this)
        this.toggleCardPopover = this.toggleCardPopover.bind(this);
        this.updateDefaultPaymentMethod = this.updateDefaultPaymentMethod.bind(this);
        this.removePaymentMethod = this.removePaymentMethod.bind(this);
        this.showSubscriptionLoader = this.showSubscriptionLoader.bind(this)
        this.setCardLoading = this.setCardLoading.bind(this)
        this.showRemoveSubLoader = this.showRemoveSubLoader.bind(this);
        this.hideRemoveSubLoader = this.hideRemoveSubLoader.bind(this);
        this.setContainsNoPaymentMethod = this.setContainsNoPaymentMethod.bind(this)
        this.showCards = this.showCards.bind(this)
        this.checkIfDefaultExists = this.checkIfDefaultExists.bind(this)
    }
   
    componentDidMount(){
        this.getStripeCustomer();
        this.getStripePaymentMethods();
        this.getStripeSubscriptions();
        this.getPastTransactions();
        this.getUpcomingPayments();
    }
    getStripeSubscriptions(){
        const api_route = 'http://localhost:8080/API/GetSubscriptions/'+window.location.href.split("/")[4];
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(api_route, requestMetadata)
        .then(response => response.json())
            .then(result => {
                this.setState({subscriptions: result.data})
            })
    }
getStripePaymentMethods(){
    console.log(this.props.user)
    const api_route = 'http://localhost:8080/API/GetPaymentMethods/'+window.location.href.split("/")[4];
    const requestMetadata = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(api_route, requestMetadata)
    .then(response => response.json())
        .then(result => {
            console.log("REs:",result)
            this.setState({paymentMethods: result.data})
            if(result.data.length === 0) {
                this.setState({containsNoPaymentMethod: true})
            }
        })
}
getStripeCustomer(){
    const api_route = 'http://localhost:8080/API/GetStripeCustomer/'+window.location.href.split("/")[4];
    const requestMetadata = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(api_route, requestMetadata)
    .then(response => response.json())
        .then(result => {
            console.log("cust: ",result)
            this.setState({customer: result})
        })
}
getUpcomingPayments(){
    const api_route = 'http://localhost:8080/API/GetUpcomingPayments/'+window.location.href.split("/")[4];
    const requestMetadata = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(api_route, requestMetadata)
    .then(response => response.json())
        .then(result => {
            if(result !== "err") {
                this.setState({upcomingPayments: result})
            }
        })
}
getPastTransactions(){
    const api_route = 'http://localhost:8080/API/GetPastTransactions/'+window.location.href.split("/")[4];
    const requestMetadata = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(api_route, requestMetadata)
    .then(response => response.json())
        .then(result => {
            console.log("trans: ",result)
            this.setState({payments: result.data})
        })
}
addSubscription(){
    this.setState({subscriptionLoading: true, subscriptionLoadingText: "Adding",
    disableSubButton: true});
    const api_route = 'http://localhost:8080/API/AddSubscription';
        const postBody = {
            CustomerId: window.location.href.split("/")[4],
            UserId: this.props.user._id
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
            this.getStripeSubscriptions();
            this.setState({subscriptionLoading: false})
        })
}
showRemoveSubLoader(){
    this.setState({subscriptionLoading: true, subscriptionLoadingText: "Removing"})
}
hideRemoveSubLoader(){
    this.setState({subscriptionLoading: false})
}
showSubscriptions(){
    if(this.state.subscriptions.length > 0) {
        return (
            <div className="subs">
            <h4 className="text-light">Subscriptions</h4>
    
        <ul>
        {this.state.subscriptions.map((sub, index) => (
            <Subscription_Item sub={sub} getStripeSubscriptions={this.getStripeSubscriptions}
            showRemoveSubLoader = {this.showRemoveSubLoader} user={this.props.user} setUser={this.props.setUser}
            hideRemoveSubLoader={this.hideRemoveSubLoader}/>
        ))}
    </ul>
    {this.showSubscriptionLoader()}
    </div>
        );
    }
    else {
        return(
            <div className="add-pro-sub-btn-container">
                <button className="btn btn-primary add-pro-sub" 
                onClick={()=>this.addSubscription()} disabled={this.state.containsNoPaymentMethod || !this.state.hasDefault || this.state.disableSubButton }>Add Pro Subscription</button>
                {this.showSubscriptionLoader()}
            </div>
        )
    }
}
setContainsNoPaymentMethod(){
    this.setState({containsNoPaymentMethod: false})
}

showCustomerInfo(){
    console.log("customer info", this.state.customer
    )
    return (
        <div>
            <p className="text-light">{this.state.customer.name}</p>
            <p className="text-light">{this.state.customer.email}</p>

        </div>
    )
}
showCardLogo(brand){
    if(brand === "visa"){
        return(
            <img className="brand-img" src={Visa_SVG} />
        )
    }
    else{
        return (
            <div>
            <p className="brand">{brand}</p>
            </div>
        )
    }
}
toggleCardPopover(){
    this.setState({isCardPopoverOpen: !this.state.isCardPopoverOpen});
    
}
updateDefaultPaymentMethod(paymentMethodId){
    const api_route = 'http://localhost:8080/API/UpdateDefaultPaymentMethod';
        const postBody = {
            CustomerId: window.location.href.split("/")[4],
            PaymentMethodId: paymentMethodId
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
            console.log("updated payment default", result)
            this.getStripeCustomer();
            this.showCards();
        })
    }
    removePaymentMethod(paymentMethodId){
        this.setCardLoading(true);
        const api_route = 'http://localhost:8080/API/RemovePaymentMethod';
            const postBody = {
                CustomerId: window.location.href.split("/")[4],
                PaymentMethodId: paymentMethodId
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
                this.setCardLoading(false);
                this.getStripePaymentMethods();
            })
        }
    showUpgradeButton(){
        if( this.props.user.Subscription_Level === "Free Tier" ){
            return (
                <Link to="/Upgrade">
                        <button className="btn btn-primary subcribe-btn">Upgrade</button>
                </Link>
            )
        }
        else if(this.props.user.Subscription_Level === "Pro Tier") {
            return (
                <p className="text-light tier-text">Pro Tier</p>
            )
        }
}
formatCards(paymentMethod, customer){
    if(customer.invoice_settings){
        return(
        
                <PaymentCard customer={customer} paymentMethod={paymentMethod} 
                            updateDefaultPaymentMethod= {this.updateDefaultPaymentMethod}
                            removePaymentMethod={this.removePaymentMethod}
                            setCardLoading={this.setCardLoading}/>
            

        );
    }
    
}
setCardLoading(status){
    this.setState({cardLoading: status})
}
showCardError(hasDefault){
    this.state.hasDefault = hasDefault
    if(this.state.containsNoPaymentMethod) {
        return(
            <p className="text-danger">
                You must add a card before you can
                subscribe
                {/* You are not using any of your cards. Select
                a card to avoid service disruption. */}
            </p>
        )
    }
    else if (!hasDefault) {
        return(
            <p className="text-danger">
                You are not using any of your cards. Select 
                use card to avoid service disruption
                {/* You are not using any of your cards. Select
                a card to avoid service disruption. */}
            </p>
        )
    }
}
checkIfDefaultExists(){
//check if default payment method exists
for(var i in this.state.paymentMethods){
    if(this.state.customer.invoice_settings){
        if(this.state.paymentMethods[i].id === this.state.customer.invoice_settings.default_payment_method) {
            return true;
        }
}
}
    return false;
}
showCards(){
    var defaultExists = this.checkIfDefaultExists();
    return(
        <div className="cards-container">
        <h4 className="text-light">Cards on file</h4>
        {this.showCardError(defaultExists)}


    <ul>
    {this.state.paymentMethods.map((paymentMethod, index) => (
        this.formatCards(paymentMethod, this.state.customer, index)
    ))}
    <li>
        <AddPaymentMethod showCardInput={this.state.showCardInput}
        user={this.props.user} getStripePaymentMethods={this.getStripePaymentMethods}
        setContainsNoPaymentMethod={this.setContainsNoPaymentMethod
        } getStripeCustomer={this.getStripeCustomer}
       />
    </li>
</ul>
</div>
    );
}
renderPayments(){
    return (
        <div className="payment-container">
            <h4 className="text-light ">Payments</h4>
        <div className="table-container">
        <table>
             <tr className="text-light header-row">
                <td>Amount</td>
                <td>Description</td>
                <td>Date</td>
                <td></td>
            </tr>
            {this.state.payments.map((payment, index) => (
            <tr className="text-light">
                <td>${payment.amount / 100}.00
                <span className="badge badge-success status-badge">{payment.status}</span>
                </td>
                <td>{payment.description}</td>
                <td>{formatDate.displayDate(new Date(payment.created *1000))}</td>
                <td></td>
            </tr>
             ))}
        </table>
        </div>
        </div>
  
    )
}
renderUpcomingPayments(){
    if(this.state.upcomingPayments.length > 0) {
        return (
            <div className="upcoming-payment-container">
                <h4 className="text-light ">Upcoming Payments</h4>
                <div className="table-container">
    
            <table>
                 <tr className="text-light header-row">
                    <td>Amount</td>
                    <td>Description</td>
                    <td>Date</td>
                    <td></td>
                </tr>
                {this.state.upcomingPayments.map((payment, index) => (
    
                <tr className="text-light">
                    <td>${payment.amount / 100}.00
                    </td>
                    <td>{payment.description}</td>
                    <td>{formatDate.displayDate(new Date(payment.period.start *1000))}</td>
                   <td></td>
                </tr>
                ))}
            </table>
            </div>
            </div>
        )
    }
    else {
        return(
            <div></div>
        )
    }

}
showSubscriptionLoader(){
    if(this.state.subscriptionLoading){
        return (
            <div className="">
                 <div className="sub-loader"></div> 
                 <p className="subscription-loader-text">
                     {this.state.subscriptionLoadingText} Subscription
                </p>
            </div>
        )
    }
    else{
        return (
            <div className=""></div>
        )
    }
}
  render(){
    return (
        <div className="payment-settings">
            {/* <h3 className="text-light">Payment Settings</h3> */}
            <ul className="main-list">
                <li className="payments-li">
                    {this.renderPayments()}
                    {this.renderUpcomingPayments()}
                </li>
                <li className="payment-details-li">
                <div className="payment-details">
                    {this.showCards()}
                    {this.showSubscriptions()}
            </div>
                </li>
            </ul>
        </div>
    );
  }
}
export default PaymentSettings;