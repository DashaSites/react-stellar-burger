import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ onClick }) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={onClick}></div>
  )
}

export default ModalOverlay;