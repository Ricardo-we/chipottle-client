import Modal from "./Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

function Alert({ actionOnConfirm, handleClose, text='' }) {
    return ( 
        <Modal style={Styles.modal} handleClose={handleClose} >
            {text}
            <div className="container-sm d-flex flex-row align-items-center justify-content-evenly">
                <button className="btn btn-danger" style={Styles.alertButtonsWidth} onClick={handleClose}>
                    cancel
                </button>
                <button className="btn btn-success" style={Styles.alertButtonsWidth} onClick={actionOnConfirm}>
                    confirm
                </button>
            </div>
        </Modal>
    );
}

const Styles = {
    modal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 250,
        backgroundColor: '#F24121',
        color: '#fff',
    },
    alertButtonsWidth: {
        // width: 50,
        // height: 50,
        fontSize: 21,
        marginBottom: 10
    }
}

export default Alert;