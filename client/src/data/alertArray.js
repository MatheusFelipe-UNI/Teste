//Icones
import { FaCheck as IconCheck} from "react-icons/fa";
import { IoAlert as IconAlert} from "react-icons/io5";
import { FaXmark as IconImportant} from "react-icons/fa6";

export const alertArray = [
   { id: 1, type: "success", icon: <IconCheck />, modalClass: "modalSuccess" },
   { id: 2, type: "alert", icon: <IconAlert />, modalClass: "modalAlert" },
   { id: 3, type: "error", icon: <IconImportant />, modalClass: "modalImportant" },
];
