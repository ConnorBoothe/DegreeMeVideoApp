import React, { Component } from "react";
import '../css/CreateAccount.css';
import 'bootstrap/dist/css/bootstrap.css';
import KeyWordsInput from "../components/KeyWordsInput.js";
import Subscriptions from "../components/Subscriptions"
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';

const TRACKING_ID = "247336033";
ReactGA.initialize(TRACKING_ID);
class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      error: "Please fill out all fields",
      showError: "none",
      errorClass: "error",
      keywords: [],
      showCardInput: true,
      subscription: "Pro Tier",
      stripePromise: loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY),
      paymentMethod: "none",
      cardComplete: false,
      paymentSubmitted: false,
      agreedToTerms: false
    };
    this.createAccount = this.createAccount.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.showError = this.showError.bind(this);
    this.hideError = this.hideError.bind(this);
    this.setError = this.setError.bind(this);
    this.keyword = React.createRef();
    this.addKeyword = this.addKeyword.bind(this);
    this.removeKeyword = this.removeKeyword.bind(this);
    this.showCardInput = this.showCardInput.bind(this);
    this.hideCardInput = this.hideCardInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderCard = this.renderCard.bind(this)
    this.setSubscription = this.setSubscription.bind(this)
    this.validateStripeCard = this.validateStripeCard.bind(this)
    this.checkAllFieldsComplete = this.checkAllFieldsComplete.bind(this)
    this.setAgreedToTerms = this.setAgreedToTerms.bind(this)

  }
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
  setAgreedToTerms(e){
    this.setState({agreedToTerms: e.target.checked})
  }
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  handleSubmit = async (elements, stripe) => {
    this.setState({paymentSubmitted: true})
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
      this.state.paymentMethod = paymentMethod;
      this.createAccount();
      this.setState({paymentSubmitted: false})

    }
  };
  checkIfStripeCardComplete(event) {
    if (event.complete) {
      alert("done")
    }
  }
  checkAllFieldsComplete(){
    if(this.state.first_name === "" ||
    this.state.last_name === "" ||
    this.state.email === "" ||
    this.state.password === ""
    ) {
      return false;
    }
    else{
      return true
    }
  }
  //controls card input display
  renderCard(elements, stripe) {
    if (this.state.showCardInput) {
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
          </div>
          <li>
            <div className="keywords-create-account-wrapper">
              <p className="option-keywords-text"> Add Keywords <i className="text-light">Optional</i>
              </p>
              <KeyWordsInput addKeyword={this.addKeyword} removeKeyword={this.removeKeyword}
                keyword={this.keyword} keywords={this.state.keywords} />
            </div>

          </li>
          
          <li className="text-light terms-li">
          <input onChange={this.setAgreedToTerms} type="checkbox" className="terms-checkbox"/>
             
            <span className="agree-text">I agree to DegreeMe's terms of service</span>
          </li>
          <li className="terms-link">
              <Link to="/TermsOfService">
                Terms of Service
              </Link>
          </li>
          <li>
            <div className="btn-container">
              <button className="btn btn-primary" onClick={() => this.handleSubmit(elements, stripe)}
                disabled={(!stripe || !this.state.cardComplete || !this.checkAllFieldsComplete() || !this.state.agreedToTerms)
                  && (this.state.subscription !== "Free Tier" || this.state.paymentSubmitted)
                }>Create Account</button>
            </div>
          </li>
          <li>
            <p className={this.state.errorClass} style={{ display: this.state.showError }}>{this.state.error}</p>
          </li>
        </div>
      );
    }
    else {
      return (
        <div >
          <li>
            <div className="keywords-create-account-wrapper">
              <p className="option-keywords-text"> Add Keywords <i className="text-light">Optional</i>
              </p>
              <KeyWordsInput addKeyword={this.addKeyword} removeKeyword={this.removeKeyword}
                keyword={this.keyword} keywords={this.state.keywords} />
            </div>

          </li>
          
          <li className="text-light terms-li">
          
          <input onChange={this.setAgreedToTerms} type="checkbox" className="terms-checkbox"/>
             
            <span className="agree-text">I agree to DegreeMe's terms of service</span>
          </li>
          <li className="terms-link">
              <Link to="/TermsOfService">
                Terms of Service
              </Link>
          </li>
          <li>
            <div className="btn-container">
              <button className="btn btn-primary" onClick={() => this.createAccount()}
                disabled={!this.checkAllFieldsComplete() || !this.state.agreedToTerms}>Create Account</button>
            </div>
          </li>
          <li>
            <p className={this.state.errorClass} style={{ display: this.state.showError }}>{this.state.error}</p>
          </li>
        </div>
      );
    }

  }
  //create account once payment info is stored
  createAccount() {
    var isEmail = this.validateEmail(this.state.email);
    if (this.state.first_name === "" ||
      this.state.last_name === "" ||
      this.state.email === "" ||
      this.state.password === "") {
      this.showError();
    }
    else if (!isEmail) {
      this.showError();
      this.setState({ error: "Not a valid email" });
    }
    else {
      const api_route = process.env.REACT_APP_REQUEST_URL+'/API/AddUser';
      const postBody = {
        First_Name: this.state.first_name,
        Last_Name: this.state.last_name,
        Email: this.state.email,
        Password: this.state.password,
        Keywords: this.state.keywords,
        Subscription: this.state.subscription,
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
          if (res === "This email is already in use") {
            this.setState({
              errorClass: "error",
              error: res,
              showError: "block"
            })
          }
          else {
            this.setState({
              errorClass: "success",
              error: "Account Successfully Created",
              showError: "block"
            })
            ReactGA.event({
              category: 'User',
              action: 'Created an Account'
            });
          }
        })
    }

  }
  handleFirstNameChange(e) {
    this.setState({ first_name: e.target.value });
  }
  handleLastNameChange(e) {
    this.setState({ last_name: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  showCardInput() {
    this.setState({ showCardInput: true })
  }
  hideCardInput() {
    this.setState({ showCardInput: false })
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  showError() {
    this.setState({ showError: "block" })
  }
  hideError() {
    this.setState({ showError: "none" })
  }
  setError(error) {
    this.setState({ error: error })
  }
  addKeyword() {
    //if keyword isn't empty, add it
    if (this.keyword.current.value !== "") {
      var newArray = this.state.keywords.concat(this.keyword.current.value)
      this.setState({ keywords: newArray })
      this.keyword.current.value = "";
    }
  }
  //remove keyword by index
  removeKeyword(index) {
    const newArray = this.state.keywords
    newArray.splice(index, 1)
    this.setState({ keywords: newArray });
  }
  setSubscription(sub) {
    this.setState({ subscription: sub })
  }
  loadStripe(){
    return loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  }
  render() {

    return (
      <div className="login-container">
        <h2 className="create-account-title text-light">Create Account</h2>
        <ul>
          <li>
            <div className="create-account-input-container">
              <p className="create-account-input-label">First Name</p>
              <input type="text" name="First_Name" onChange={this.handleFirstNameChange} />
            </div>
          </li>
          <li>
            <div className="create-account-input-container">
              <p className="create-account-input-label">Last Name</p>
              <input type="text" name="Last_Name" onChange={this.handleLastNameChange} />
            </div>
          </li>
          <li>
            <div className="create-account-input-container">
              <p className="create-account-input-label">Email</p>
              <input type="email" name="Email" onChange={this.handleEmailChange} />
            </div>
          </li>
          <li>
            <div className="create-account-input-container">
              <p className="create-account-input-label">Password</p>
              <input type="password" name="Password" onChange={this.handlePasswordChange} />
            </div>
          </li>
          <Subscriptions showCardInput={this.showCardInput}
            hideCardInput={this.hideCardInput} selectSubscription={this.setSubscription} />
          <Elements stripe={this.loadStripe()}>
            <ElementsConsumer>
              {({ elements, stripe }) => (
                this.renderCard(elements, stripe)
              )}
            </ElementsConsumer>
          </Elements>
        </ul>
      </div>
    );
  }
}

export default CreateAccount;