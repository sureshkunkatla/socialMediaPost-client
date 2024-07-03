import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    minWidth: "300px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const PopupModal = ({
  isOpen,
  children,
  closeModal,
  title,
  contentStyles,
  overlayStyles,
}) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={(e) => {
          e.stopPropagation();
          closeModal();
        }}
        style={{
          content: { ...customStyles.content, ...contentStyles },
          overlay: { ...customStyles.overlay, ...overlayStyles },
        }}
        contentLabel="Example Modal"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "700" }}>{title}</span>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            style={{ fontSize: "20px" }}
          />
        </div>
        {children}
      </Modal>
    </div>
  );
};

export default PopupModal;
