import React from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";
import PropTypes from "prop-types";

const modalsContainer = document.querySelector("#modals");

const Modal = ({ closeModals, children }) => {
  React.useEffect(() => {
    const handleEscKeydown = (event) => {
      event.key === "Escape" && closeModals();
    };

    document.addEventListener("keydown", handleEscKeydown);

    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div className={modalStyles.theModal}>
        <button type="button" className={modalStyles.closeButton}>
          <CloseIcon type="primary" onClick={closeModals} />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={closeModals} />
    </div>,
    modalsContainer
  );
};

Modal.propTypes = {
  closeModals: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export default Modal;
