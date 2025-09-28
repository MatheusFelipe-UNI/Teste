import { ModalProvider } from "../../context/ModalContext";

export function MainLayout({title ="", infoStatsCollection = [], customStyle = null, children}) {
   return(
      <ModalProvider>
         <section className={customStyle ? customStyle : ""}>
            <h1 className="mainTitle">{title}</h1>
            {infoStatsCollection.length > 0 &&
               <p>Componente InfoStats</p>
            }
            {children}
         </section>
      </ModalProvider>
   )
}