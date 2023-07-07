import React from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";

const modalsContainer = document.querySelector("#modals");

const Modal = ({ onCloseClick, onEscClick, children }) => {

  React.useEffect(() => {
    document.addEventListener("click", onEscClick);

    return () => {
      document.removeEventListener("click", onEscClick);
    };
  }, []); // Как это активировать?

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.theModal}>
        <button type="button" className={modalStyles.closeButton}>
          <CloseIcon type="primary" onClick={onCloseClick} />
        </button>
        {children}
      </div>   
      <ModalOverlay onClick={onCloseClick} />
    </>,
    modalsContainer
  ) 
}


export default Modal;