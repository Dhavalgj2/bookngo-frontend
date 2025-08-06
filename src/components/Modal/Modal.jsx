// SubmitModal.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useEffect } from "react";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

const Modal = ({ showModal, isLoading, closeModal, message }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="modal-backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={closeModal} // clicking backdrop closes modal
        >
          <motion.div className="modal-content" variants={modal}>
            {isLoading ? (
              <>
                <h2>Submitting...</h2>
                <LoadingSpinner />
              </>
            ) : (
              <>
                <h2>{message}</h2>

                <button onClick={closeModal}>Close</button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
