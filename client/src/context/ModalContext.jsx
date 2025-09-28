import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import ModalContainer from "../components/Modals/ModalContainer/ModalContainer";

const ModalContext = createContext(null);

export function ModalProvider({children}) {
    const [modalRef, setModalRef] = useState({isOpen: false, modalName: "", customStyle: {}, data: {}});

    /**
        * Define os as informações de refêrencia da modal
        * @param {Object} modalParams
        * @param {boolean} modalParams.isOpen Indica se a Modal está aberta
        * @param {string} modalParams.modalName Informa o nome da Modal que será utilizada
        * @param {object} modalParams.customStyle (OPCIONAL) define uma estilização customizada
    */
    const defineModalParams = ({isOpen, modalName, customStyle = {}, data = {}}) => {
        setModalRef({isOpen, modalName, customStyle, data})
    }


    const showModal = ({modalName = "", customStyle = {}, data = {}}) => {
        defineModalParams({isOpen: true, modalName, customStyle, data: data})
    }

    const closeModal = () => {
        defineModalParams({isOpen: false, modalName: "", customStyle: {}, data: {}})
    }

    const showDataInfo = () => {
        return modalRef.data || {}
    }

    return(
        <ModalContext.Provider value={{modalRef, defineModalParams, showModal, closeModal, showDataInfo}}>
            {modalRef.isOpen && createPortal(<ModalContainer/>, document.body)}
            {children}
        </ModalContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);

ModalProvider.propTypes = {
    children: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.arrayOf(PropTypes.element)
                ]),
}