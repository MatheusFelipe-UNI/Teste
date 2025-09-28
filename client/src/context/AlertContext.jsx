import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { ModalAlert } from "../components/Modals/ModalAlert/ModalAlert";

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
   const [alertRef, setAlertRef] = useState({
      isOpen: false,
      alertType: "",
      title: "",
      message: "",
      btnCollection: [],
   });

   const defineAlertParams = ({ isOpen, alertType, title, message, btnCollection }) => {
      setAlertRef({ isOpen, alertType, title, message, btnCollection });
   };

   const showAlert = ({ alertType = "", title = "", message = "", btnCollection = [] }) => {
      defineAlertParams({ isOpen: true, alertType, title, message, btnCollection });
   };

   const closeAlert = () => {
      setAlertRef({ isOpen: false, alertType: "", message: "", btnCollection: [] });
   };

   // Modais Personalizadas
   const showSuccessAlert = ({ title, message }) => {
      const btnCollection = [{ id: 1, type: "confirm", handleAction: null, text: "OK" }];

      showAlert({
         alertType: "success",
         title,
         message,
         btnCollection,
      });
   };

   const showConfirmAlert = ({ title, message, handleConfirm }) => {
      const btnCollection = [
         { id: 1, type: "cancel", handleAction: null, text: "Não" },
         { id: 2, type: "confirm", handleAction: handleConfirm, text: "Sim" },
      ];

      showAlert({
         alertType: "alert",
         title,
         message,
         btnCollection,
      });
   };

   const showErrorAlert = ({ title, message }) => {
      const btnCollection = [{ id: 1, type: "confirm", handleAction: null, text: "OK" }];
      showAlert({
         alertType: "error",
         title,
         message,
         btnCollection,
      });
   };

   return (
      <AlertContext.Provider
         value={{
            alertRef,
            defineAlertParams,
            showAlert,
            closeAlert,
            showSuccessAlert,
            showConfirmAlert,
            showErrorAlert,
         }}
      >
         {alertRef.isOpen && createPortal(<ModalAlert />, document.body)}
         {children}
      </AlertContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => useContext(AlertContext);

AlertProvider.propTypes = {
   children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
