// UTILS
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAdmins, addAdmin, deleteAdmin, updateAdmin } from '../../libs/api-requests/admins-requests';
import checkLoggedIn from '../../libs/sessions-utils';
// COMPONENTS
import SideBar from "./SideBar";
import Modal from '../../public-components/Modal';
import Alert from "../../public-components/Alert";
import { AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPen } from '@fortawesome/free-solid-svg-icons'

const admin_key = localStorage.getItem('admin_key');

const TableRow = ({ admin, onDelete, onUpdate }) => {
    return(
        <tr scope="row" className="text-center">
            <td style={{width: "30%"}}>{admin.id}</td>
            <td>{admin.username}</td>
            <td>{admin.email}</td>
            <td>
                <button className="btn btn-danger" onClick={() => onDelete(admin.id)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <button className="btn btn-success" onClick={() => onUpdate(admin)}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </td>
        </tr>
    )
}

const AdminForm = ({ onSubmit, admin }) => {
    const [username, setUsername] = useState(admin? admin.username: '')
    const [password, setPassword] = useState(admin? admin.password: '')
    const [email, setEmail] = useState(admin? admin.email: '')

    return (
        <form className="form" onSubmit={e => { 
            e.preventDefault();
            admin ? onSubmit(username, password, email, admin.id)
            : onSubmit(username, password, email)
        }}>
            <div className="form-group">
                <input 
                    value={username} 
                    type="text" 
                    placeholder="Username" 
                    className="form-control" 
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input 
                    value={password} 
                    type="password" 
                    placeholder="Password" 
                    className="form-control" 
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input 
                    value={email} 
                    type="email" 
                    placeholder="Email" 
                    className="form-control" 
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-success w-100">
                Submit
            </button>
        </form>
    )
}

const UpdateModal = ({ handleClose, getAdminsHandler, admin }) => {
    return (
        <Modal handleClose={handleClose} style={{borderRadius: 3}}>
            <h1>Update event</h1>
            <AdminForm
                onSubmit={(username, password, email, id) => {
                    updateAdmin(admin_key, username, password, email, id)
                    .then(getAdminsHandler)
                    .then(handleClose)
                }} 
                admin={admin}
            />
        </Modal>
    )
}

function ManageAdmins() {
    const navigate = useNavigate();

    const [admins, setAdmins] = useState([{id:0}]);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [updateAdminData, setUpdateAdminData] = useState({})
    const [adminIdForDelete, setAdminIdForDelete] = useState({})

    const getAdminsHandler = async () => {
        const response = await getAdmins(admin_key);
        setAdmins(response);        
    }

    useEffect(() => {
        if(!checkLoggedIn()) navigate('/chipottle-admin/login')
        getAdminsHandler();
    }, [])

    return ( 
    <>
        <AnimatePresence initial={false} exitBeforeEnter={true}>
            {updateModalVisible && 
                <UpdateModal 
                    admin={updateAdminData}
                    handleClose={() => setUpdateModalVisible(false)}
                    getAdminsHandler={getAdminsHandler}
                />
            }
            {alertVisible && 
                <Alert
                    actionOnConfirm={() => 
                        deleteAdmin(admin_key, adminIdForDelete)
                            .then(getAdminsHandler)
                            .then(() => setAlertVisible(false))
                    }
                    handleClose={() => setAlertVisible(false)} 
                    text={<h2>Are you sure you want to delete this admin?</h2>}
                />
            }
        </AnimatePresence>
        
        <SideBar />
        <div className="container">
            <h1>Manage admins</h1>
            <AdminForm 
                onSubmit={(username, password, email) => { 
                    addAdmin(admin_key, username, password, email).then(getAdminsHandler)
                }}
            />
        </div>

        <table className="table table-striped table-responsive container">
            <thead>
                <tr className="text-center">
                    <th>Event id</th>
                    <th>Event name</th>
                </tr>
            </thead>
            <tbody>
                {admins.map(admin => 
                    <TableRow 
                        key={admin.id}
                        admin={admin} 
                        onDelete={id => {
                            setAlertVisible(true)
                            setAdminIdForDelete(id)
                        }}
                        onUpdate={event => {
                            setUpdateModalVisible(true)
                            setUpdateAdminData(event)
                        }}
                    />
                )}
            </tbody>
        </table>
        
    </>
    );
}

export default ManageAdmins;