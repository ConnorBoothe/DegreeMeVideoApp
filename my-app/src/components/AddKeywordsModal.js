import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import KeyWordsInput from "../components/KeyWordsInput";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/AvatarCropperModal.css";


class AvatarCropperModal extends Component {
  constructor(props){
    super(props)
  }
 
  render(){
      console.log(this.props)
    return(
      <div>
      <Modal show={this.props.isOpen} onHide={this.props.hideModal} >
        <Modal.Header>
        {/* <button className="btn-danger" onClick={hideModal}>X</button> */}
          <Modal.Title>Update your keywords
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <KeyWordsInput addKeyword = {this.props.addKeyword} 
                removeKeyword = {this.props.removeKeyword} keywords = {this.props.keywords}
                keyword = {this.props.keyword} />            
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
  }
}
export default AvatarCropperModal;