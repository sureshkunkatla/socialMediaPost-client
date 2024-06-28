import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const PopupModal = ({ isOpen, children, closeModal }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <p>Title</p>
          <button onClick={() => closeModal()}>Close</button>
        </div>
        {children}
      </Modal>
    </div>
  );
};

export default PopupModal;
