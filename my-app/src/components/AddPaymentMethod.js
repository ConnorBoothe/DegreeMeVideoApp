import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../css/AddCard.css"
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


class AddPaymentMethod extends Component {
    constructor(props){
        super(props)
        this.state = {
            cardComplete: false,
            loading: false,
            loadStarted: false,
            progressText:"Adding card...",
            disableCardButton: false   
        }
        this.submitPaymentMethod = this.submitPaymentMethod.bind(this);
        this.showLoader = this.showLoader.bind(this)
        this.showProcessText = this.showProcessText.bind(this)
        this.createCard = this.createCard.bind(this)


    }
    submitPaymentMethod(user){
        return new Promise((resolve, reject)=>{
        const api_route = process.env.REACT_APP_REQUEST_URL+'/API/AddPaymentMethod';
        const postBody = {
          UserId: user._id,
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
           if(res !== "error") {
               this.props.getStripePaymentMethods();
               this.props.getStripeCustomer();
               this.props.setContainsNoPaymentMethod();
            this.setState({loading: false, progressText: "Successfully added card" })
            
            resolve(true)
            }
            else {
                resolve(false)
            }
          }) 
        })
    }
    handleSubmit = async (elements, stripe) => {

        this.setState({loading: true, loadStarted: true,
            progressText: "Adding payment method...",
        disableCardButton: true })

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
          this.setState({paymentMethod: paymentMethod,
            disableCardButton: false});
            this.submitPaymentMethod(this.props.user)
            .then(()=>{
                cardElement.clear();
            })
        }
      };
      checkIfStripeCardComplete(event) {
        if (event.complete) {
        }
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
    loadStripe(){
        return loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      }
    //controls card input display
  createCard(elements, stripe) {
      return (
        <div >
          <div className="card-input-container-1">
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
          <button className="btn btn-primary add-card-btn" 
            disabled={!stripe || !this.state.cardComplete || this.state.disableCardButton}
            onClick={()=> this.handleSubmit(elements, stripe)}>Add Card</button>
        </div>
      );
  }
  
   
      showLoader(){
          if(this.state.loading){
              return (
                  <div className="load-container">
                       {/* <div className="loader"></div>  */}
                       <p className="text-light processText">{this.state.progressText}</p>
                  </div>
              )
          }
          else{
              return (
                  <div className="placeholder"></div>
              )
          }
      }
      showProcessText(){
        // if(this.state.loadStarted){
            // return (
            //     <div>
            //         <p className="text-light processText">{this.state.progressText}</p>                          
            //     </div>
            // )
        // }
    }
    renderCard(){
        if(this.props.showCardInput) {
            return (
                <div className="add-payment">
               
                <div className="add-card-input">
                    <Elements stripe={this.loadStripe()}>
                    <ElementsConsumer>
                    {({ elements, stripe }) => (
                        this.createCard(elements, stripe)
                    )}
                    </ElementsConsumer>
                </Elements>
                </div>
                {this.showLoader()}
                {/* {this.showProcessText()} */}
           </div>
                );
        }
        else {
            return (
                <div></div>
            )
        }
           
        
        
    }
  render(){

    return (
       this.renderCard()
    );
  }
}
export default AddPaymentMethod;