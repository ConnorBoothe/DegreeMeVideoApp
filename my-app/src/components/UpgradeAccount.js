import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../css/Upgrade.css"
import Video_Sub from "../images/Video_Sub.svg"
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

class UpgradeAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCardInput: true,
      cardComplete: false,
      loading: false,
      loadStarted: false,
      progressText: "Adding payment method",
      paymentSubmitted: false,
      containsInUsePaymentMethod: false,
      customer: {}
    }
    this.showCardInput = this.showCardInput.bind(this);
    this.hideCardInput = this.hideCardInput.bind(this);
    this.submitPaymentMethod = this.submitPaymentMethod.bind(this);
    this.showLoader = this.showLoader.bind(this)
    this.showProcessText = this.showProcessText.bind(this)
    this.renderUpgradeContent = this.renderUpgradeContent.bind(this)
    this.getStripeCustomer = this.getStripeCustomer.bind(this);

  }
  componentDidMount(){
    this.getStripeCustomer()
  }
  submitPaymentMethod(user) {
    this.setState({ progressText: "Adding subscription" })
    const api_route = 'http://localhost:8080/API/AttachPaymentMethod';
    const postBody = {
      UserId: user._id,
      CustomerId: user.Stripe_Customer_Id,
      PaymentMethodId: this.state.paymentMethod.id
    };
    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    };
    fetch(api_route, requestMetadata)
      .then(res => res.json())
      .then((res) => {
        console.log(res)
        if (res != "error") {
          this.props.setUser(res)
          this.setState({
            loading: false, progressText: "Successfully subscribed",
            paymentSubmitted: false
          })
        }
      })
  }
  handleSubmit = async (elements, stripe, hasDefault) => {
    if(hasDefault) {
      this.addSubscription();
    }
    else {
    this.setState({
      loading: true, loadStarted: true,
      progressText: "Adding payment method",
      paymentSubmitted: true
    })

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      this.setState({ paymentMethod: paymentMethod, progressText: "Payment method added" });
      this.submitPaymentMethod(this.props.user);
    }
  }
  };
  validateStripeCard = (elements) => {
    const cardElement = elements.getElement(CardElement);
    cardElement.on('change', (event) => {
      if (event.complete) {
        this.setState({ cardComplete: true })
      } else {
        this.setState({ cardComplete: false })
      }

    });
  }
  loadStripe() {
    return loadStripe('pk_test_89vfyOdmTWo09jkpoyAnRy1l00ll36NLGn');
  }
  addSubscription(){
    this.setState({
      loading: true, 
      loadStarted: true,
      progressText: "Adding Subscription",
      paymentSubmitted: true
    })
    var user = JSON.parse(Cookies.get("user"));
    const api_route = 'http://localhost:8080/API/AddSubscription';
        const postBody = {
            CustomerId: user.Stripe_Customer_Id,
            UserId: user._id
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
          this.props.setUser(result)
          this.setState({
            loading: false, 
            loadStarted: false ,
            progressText: "Subscription Added",
            paymentSubmitted: true
          })
        })
}
  //controls card input display
  renderCard(elements, stripe, hasDefault) {
    if(hasDefault){
      return (
        <div>
          <button className="btn btn-primary upgrade-btn"
          disabled={!stripe || this.state.paymentSubmitted}
          onClick={() => this.handleSubmit(elements, stripe, hasDefault)}>Upgrade</button>
      </div>
      )
     
    }
    else {
    return (
      <div >
        <div className="card-input-container">
          <CardElement
            onChange={() => this.validateStripeCard(elements)}
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: 'white',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <button className="btn btn-primary upgrade-btn"
            disabled={!stripe || !this.state.cardComplete || this.state.paymentSubmitted}
            onClick={() => this.handleSubmit(elements, stripe, hasDefault)}>Upgrade</button>
        </div>

      </div>
    );
          }
  }

  showCardInput() {
    this.setState({ showCardInput: true })
  }
  hideCardInput() {
    this.setState({ showCardInput: false })
  }
  showLoader() {
    if (this.state.loading) {
      return (
        <div>
          <div className="loader"></div>
        </div>
      )
    }
    else {
      return (
        <div className="placeholder"></div>
      )
    }
  }
  showProcessText() {
    if (this.state.loadStarted) {
      return (
        <div>
          <p className="text-light processText">{this.state.progressText}</p>
        </div>
      )
    }
  }
  getStripeCustomer() {
    return new Promise((resolve, reject) => {
      var user = JSON.parse(Cookies.get("user"));
      const api_route = 'http://localhost:8080/API/GetStripeCustomer/' + user.Stripe_Customer_Id;
      const requestMetadata = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      };
      fetch(api_route, requestMetadata)
        .then(response => response.json())
        .then(result => {
          if (result.invoice_settings.default_payment_method === null) {
            this.setState({ containsInUsePaymentMethod: false })
            resolve(false)
          }
          else {
            this.setState({ containsInUsePaymentMethod: true })
            resolve(true)
          }
         
        })
    })
  }

  renderCardInput() {
        if (this.state.containsInUsePaymentMethod) {
          return (
            <div className="upgrade-card-input">
            <Elements stripe={this.loadStripe()}>
              <ElementsConsumer>
                {({ elements, stripe }) => (
                  this.renderCard(elements, stripe,
                    this.state.containsInUsePaymentMethod)
                )}
              </ElementsConsumer>
            </Elements>
          </div>
          );
        }
        else {
          return (
            <div className="upgrade-card-input">
              <Elements stripe={this.loadStripe()}>
                <ElementsConsumer>
                  {({ elements, stripe }) => (
                    this.renderCard(elements, stripe,
                      this.state.containsInUsePaymentMethod)
                  )}
                </ElementsConsumer>
              </Elements>
            </div>
          )
        }
  }
  renderUpgradeContent() {
    if(Cookies.get("user") !== undefined) {

    
    var user = JSON.parse(Cookies.get("user"));
    if (user.Subscription_Level === "Free Tier") {
      return (
        <div className="upgrade-acct">
          <p className="limit-reached badge badge-warning">{this.props.limit_message}</p>
          <h1 className="text-light upgrade-title">Go Pro</h1>
          <p className="text-light upgrade-text">Get unlimited access to DegreeMe content
            for $8/month</p>
          <div>
            <img className="upgrade-img" src={Video_Sub} />
          </div>
          {this.renderCardInput()}
          {this.showLoader()}
          {this.showProcessText()}
        </div>
      );
    }
    else {
      return (
        <Redirect to="/Home" />
      )
    }
  }
  else {
    return (
      <Redirect to="/Home" />
    )
  }
  }
  render() {
    return (
      this.renderUpgradeContent()
    );
  }
}
export default UpgradeAccount;