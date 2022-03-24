import '../css/Modal.css';
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function Modal({ children, handleClose, style }) {

    const modalAnimation = {
        hidden: {
            y: '-100vh',
            opacity: 0
        },

        visible: {
            y: '0vh',
            opacity: 1,
            transition: {
                duration: 0.5,
                type: 'spring', 
                damping: 25,
                stiffness: 500 
            }
        },

        exit: {
            y: '100vh',
            opacity: 0
        }        
    }

    return ( 
        <motion.div 
            className="back-drop" 
            initial={{opacity: 0}} 
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={handleClose}
        >
            <motion.div 
                className="modal-container" 
                variants={modalAnimation}
                initial="hidden" 
                animate="visible"
                exit="exit" 
                style={style}
                onClick={e => e.stopPropagation()}
            >
                <button className="btn btn-primary" style={{position: 'absolute', right:3, top:2}} onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                {children}
            </motion.div>
        </motion.div>
    );  
}

export default Modal;