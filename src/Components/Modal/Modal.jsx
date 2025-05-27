import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ title, children, containerClassName }) => {
  return (
    <div className={styles.modalBackDrop}>
      <div className={`${styles.modalContainer} ${containerClassName}`}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
