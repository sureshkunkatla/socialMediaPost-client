import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "none",
    border: "none",
  },
};

const InfinitySpinner = ({ visible }) => {
  return (
    <div>
      <Modal isOpen={visible} style={customStyles} contentLabel="Example Modal">
        <InfinitySpin
          visible={visible}
          width="200"
          color="#282627"
          ariaLabel="infinity-spin-loading"
        />
      </Modal>
    </div>
  );
};

export default InfinitySpinner;
