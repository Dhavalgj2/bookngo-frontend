// SubmitModal.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";
import LoadingSpinner from "../Spinner/LoadingSpinner";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "100px",
    opacity: 1,
    transition: { delay: 0.3 },
  },
};

const Modal = ({ showModal, isLoading, closeModal, message }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="modal-backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
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
