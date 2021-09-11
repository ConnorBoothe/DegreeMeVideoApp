import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/AvatarCropperModal.css";
import htmlDecode from "../GlobalFunctions/HTMLDecode";
var decode = new htmlDecode()

class DeleteVideoModal extends Component {
  constructor(props){
    super(props)
  }
 
  render(){
    return(
      <div>
      <Modal show={this.props.isOpen} onHide={this.props.hideModal} >
        <Modal.Header>
        {/* <button className="btn-danger" onClick={hideModal}>X</button> */}
          <Modal.Title>Deleting video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <p className="delete-video-title bold">{this.props.videoTitle}</p>
           <img className="delete-thumbnail" src={decode.htmlDecode(this.props.videoThumbnail)}/>
           <p className="delete-video-title bold">This action is irreversible!</p>
           <button className= "btn btn-danger" onClick={this.props.deleteVideo}>Delete Video</button>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
  }
}
export default DeleteVideoModal;