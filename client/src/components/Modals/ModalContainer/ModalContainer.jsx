import { useEffect, useState } from "react";
import { useModal } from "../../../context/ModalContext";
import { modalCollection } from "../../../data/modalArray";
import styles from "./ModalContainer.module.css";

export function ModalContainer() {
   const { modalRef, closeModal } = useModal();

   const [modal, setModal] = useState();

   const handleClickClose = () => {
      closeModal();
      setModal({});
   }

   useEffect(() => {
      const modalSelected = modalCollection.find((modal) => modal.name === modalRef.modalName);
      setModal(modalSelected);

   }, [modalRef]);

   return (
      <div className={styles.modal__cover}>
         <div
            className={`${styles.modalContainer} activeModal fadeIn`}
            style={modalRef?.customStyle && modalRef.customStyle}
         >
            {modal ? (
               <>
                  <span className={styles.modalContent__header}>
                     <h1>{modal.title}</h1>
                     <IconClose className={styles.closeIcon} onClick={handleClickClose} />
                  </span>
                  <hr />
                  {modal.modalContent}
               </>
            ) : (
               <p>Modal Não encontrada</p>
            )}
         </div>
      </div>
   );

}