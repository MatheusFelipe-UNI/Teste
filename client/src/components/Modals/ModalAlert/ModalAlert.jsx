import { useEffect, useRef, useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import { alertArray } from "../../../data/alertArray";
import styles from "./ModalAlert.module.css";

export function ModalAlert() {
   const { alertRef, closeAlert } = useAlert();

   const [alert, setAlert] = useState({});
   const elementRef = useRef(null);

   const handleClickCloseAlert = () => {
      closeAlert();
      setAlert({});
   };

   const executeAnimation = () => {
      const element = elementRef.current;
      if (element.classList.contains("fadeIn")) {
         setTimeout(() => {
            element.classList.remove("fadeIn");
         }, 300);
      }
   };

   useEffect(() => {
      const modalSelected = alertArray.find((alertInfo) => alertInfo.type === alertRef.alertType);
      setAlert(modalSelected);
      executeAnimation();
   }, [alertRef]);

   return (
      <div className={styles.modalMessage__cover}>
         <div
            className={`${styles.modalMessageContainer} ${styles[alert.modalClass]} fadeIn`}
            ref={elementRef}
         >
            <div className={styles.modalMessageContent__header}>{alert.icon}</div>
            <div className={styles.modalMessageContent__info}>
               <h1 className={styles.info__title}>{alertRef.title}</h1>
               <p className={styles.info__text}>{alertRef.message}</p>
               <hr />
               <div className={styles.info__btnCollection}>
                  {alertRef.btnCollection.map((btnInfo) => (
                     <button
                        key={btnInfo.id}
                        className={
                           btnInfo.type === "cancel"
                              ? styles.btnCollection__btnCancel
                              : styles.btnCollection__btnConfirm
                        }
                        onClick={
                           btnInfo.handleAction ? btnInfo.handleAction : handleClickCloseAlert
                        }
                     >
                        {btnInfo.text}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
