import React, {Component} from "react";
import "../css/VideoActions.css";
import "../css/VideoModal.css";
import 'bootstrap/dist/css/bootstrap.css';
import Modal from "react-bootstrap/Modal";
import CreateAccount from "../components/CreateAccount"
import "tippy.js/dist/tippy.css"

class CreateAccountModal extends Component {
    constructor(props){
        super(props);
    }
    
  render(){
    return (
    <div className="video-actions">
      <Modal centered show={this.props.isOpen} onHide={this.props.hideModal}
      className="share-modal">
        <Modal.Header>
          <Modal.Title>
              <p className="close-modal" onClick={this.props.hideModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
              </p>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <CreateAccount />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      
        </div>
    );
  }
}

export default CreateAccountModal;