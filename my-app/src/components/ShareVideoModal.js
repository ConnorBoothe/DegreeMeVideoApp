import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const ShareModal = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
      setIsOpen(true);
    };
    const hideModal = () => {
      setIsOpen(false);
    };
  return (
    <>
      <button onClick={showModal}>Display Modal</button>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
        {/* <button className="btn-danger" onClick={hideModal}>X</button> */}

          <Modal.Title>Share Video


          </Modal.Title>
        </Modal.Header>
        <Modal.Body>The body</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ShareModal;