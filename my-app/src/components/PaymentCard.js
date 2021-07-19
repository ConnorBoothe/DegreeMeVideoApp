import React, {Component} from "react";
import { Popover } from 'react-tiny-popover';
import 'bootstrap/dist/css/bootstrap.css';
import "../css/PaymentSettings.css"

import Visa_SVG from "../images/visa.svg"
class PaymentCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            isCardPopoverOpen: false
        }
       this.renderCard = this.renderCard.bind(this)
    //    this.toggleCardPopover = this.toggleCardPopover.bind(this)
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
    renderCard() {
        var hasDefault = false;
        if(this.props.customer.invoice_settings.default_payment_method === this.props.paymentMethod.id){
            hasDefault = true;
            return(
                <li className="text-light">
                <div className="card-group">
               {this.showCardLogo(this.props.paymentMethod.card.brand)}
                    <span>****</span>
                    <span>****</span>
                    <span>****</span>
                    <span>{this.props.paymentMethod.card.last4}</span>
                    
                    <br></br>
                    
                    <div>
                    <p className="expiration">Expires: {this.props.paymentMethod.card.exp_month}/{this.props.paymentMethod.card.exp_year}
                    <span className="three-dots" onClick={()=> this.toggleCardPopover()}>
                    <Popover
                    isOpen={this.state.isCardPopoverOpen}
                    
                    positions={[ 'right', 'top']} // preferred positions by priority
                    content={<div className="text-light card-popover">
                        <ul>
                            <li ><span className="badge badge-success" onClick={()=>this.props.updateDefaultPaymentMethod(this.props.paymentMethod.id)}>Use Card</span ></li>
                            <li ><span className="badge badge-danger" onClick={()=>this.props.removePaymentMethod(this.props.paymentMethod.id)}>Remove Card</span></li>
                            </ul></div>}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                </Popover>
                    </span>
                    <span className="badge badge-success">In use</span>
                   
                    </p>
                    
                    </div>
                </div>
                
    
            </li>
            )
        }
        else{
            return(
                <li className="text-light">
                <div className="card-group">
               {this.showCardLogo(this.props.paymentMethod.card.brand)}
                    <span>****</span>
                    <span>****</span>
                    <span>****</span>
                    <span>{this.props.paymentMethod.card.last4}</span>
                    <br></br>
                    
                    <div>
                    <p className="expiration">Expires: {this.props.paymentMethod.card.exp_month}/{this.props.paymentMethod.card.exp_year}
                    <span className="three-dots" onClick={()=> this.toggleCardPopover()}>
                    <Popover
                    isOpen={this.state.isCardPopoverOpen}
                    
                    positions={[ 'right']} // preferred positions by priority
                    content={<div className="text-light card-popover"><ul><li ><span className="badge badge-success" onClick={()=>this.props.updateDefaultPaymentMethod(this.props.paymentMethod.id)}>Use Card</span ></li>
                    <li ><span className="badge badge-danger" onClick={()=>this.props.removePaymentMethod(this.props.paymentMethod.id)}>Remove Card</span></li>
                    </ul></div>}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                     <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                </Popover>
                    </span>
                   
                    </p>
                    
                    </div>
                </div>
                
    
            </li>
            )
        }
    }
    render() {
        return(
            <div>
                {this.renderCard()}
            </div>
        )
    }
}
export default PaymentCard;