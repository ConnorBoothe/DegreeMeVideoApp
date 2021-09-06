import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import AvatarCropper from "../components/AvatarCropper"
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
      <button className="btn btn-primary leave-review" onClick={this.props.showModal}>Update Avatar</button>
      <Modal show={this.props.isOpen} onHide={this.props.hideModal} >
        <Modal.Header>
        {/* <button className="btn-danger" onClick={hideModal}>X</button> */}
          <Modal.Title>Update your avatar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AvatarCropper user={this.props.user} setUser={this.props.setUser}
            hideModal={this.props.hideModal} getUser={this.props.getUser}/>            
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
  }
}
export default AvatarCropperModal;