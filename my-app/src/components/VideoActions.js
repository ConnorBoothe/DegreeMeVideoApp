import React, {Component} from "react";
import "../css/VideoActions.css";
import 'bootstrap/dist/css/bootstrap.css';
import Modal from "react-bootstrap/Modal";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css"

class VideoActions extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            showLikedMsg: "none"
        }
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }
    showModal = () => {
      this.setState({isOpen: true});
    };
    
    hideModal = () => {
        this.setState({isOpen: false});
    };
    copyToClipboard(){
        navigator.clipboard.writeText(window.location.href)
    }
  render(){
      
    return (
    <div className="video-actions">
      <Modal centered show={this.state.isOpen} onHide={this.hideModal}
      className="share-modal">
        <Modal.Header>
          <Modal.Title>
              Share Video
              <p className="close-modal" onClick={this.hideModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
              </p>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span className="copy-link">{ window.location.href }</span>
            <Tippy content="Copy To Clipboard">
                <span className="copy-btn" onClick={this.copyToClipboard}>COPY</span>
            </Tippy>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      
            <ul>
                <li onClick={this.props.addLike}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                    </svg>
                    {this.props.Likes}
                    <p className="already-liked" style={{display: this.props.showLikedMsg}}>Already Liked</p>
                </li>
                <li onClick={this.showModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-share-fill" viewBox="0 0 16 16">
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                    </svg>
                    Share
                </li>
                
            </ul>
        </div>
    );
  }
}

export default VideoActions;