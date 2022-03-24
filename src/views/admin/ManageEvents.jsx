// UTILS
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import checkLoggedIn from '../../libs/sessions-utils'; 
import getEvents, { addEvent, deleteEvent, updateEvent } from '../../libs/api-requests/events-requests';
// COMPONENTS
import SideBar from "./SideBar";
import Modal from '../../public-components/Modal';
import Alert from '../../public-components/Alert';
import { AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPen } from '@fortawesome/free-solid-svg-icons'

const admin_key = localStorage.getItem('admin_key');


const TableRow = ({ event, onDelete, onUpdate }) => {
    return (
        <tr scope="row" className="text-center">
            <td style={{width: "30%"}}>{event.id}</td>
            <td>{event.event_name}</td>
            <td>
                <button className="btn btn-danger" onClick={() => onDelete(event.id)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <button className="btn btn-success" onClick={() => onUpdate(event)}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </td>
        </tr>
    )
}

const UpdateModal = ({ handleClose, getEventsHandler, event }) => {
    return (
        <Modal handleClose={handleClose} style={{borderRadius: 3}}>
            <h1>Update event</h1>
            <EventForm 
                onSubmit={(name, image, id) => {
                    updateEvent(admin_key,  id, name, image)
                    .then(getEventsHandler)
                    .then(handleClose)
                }} 
                event={event}
            />
        </Modal>
    )
}

const EventForm = ({ onSubmit, event={event_name:''} }) => {
    const [eventName, setEventName] = useState(event.event_name)
    const [eventImage, setEventImage] = useState('')

    return ( 
        <form className="form" onSubmit={e => {
            e.preventDefault();
            event.id? onSubmit(eventName, eventImage, event.id)            
            : onSubmit(eventName, eventImage)            
        }}>
            <div className="form-group">
                <input 
                    value={eventName} 
                    type="text" 
                    placeholder="Event name" 
                    className="form-control" 
                    onChange={e => setEventName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input 
                    type="file" 
                    placeholder="Event image" 
                    className="form-control"
                    onChange={e => setEventImage(e.target.files[0])}
                />
            </div>
            <button type="submit" className="btn btn-success w-100">
                Submit
            </button>
        </form>
    )
}

function ManageEvents() {
    const navigate = useNavigate();

    const [events, setEvents] = useState([{id: 0}]);
    // MODAL-CONTROLLERS
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [selectedEventForDelete, setSelectedEventForDelete] = useState(0);
    const [selectedEventForUpdate, setSelectedEventForUpdate] = useState({});

    const getEventsHandler = async () => {
        const response = await getEvents();
        setEvents(response);
    }

    useEffect(() => {
        if(!checkLoggedIn()) navigate('/chipottle-admin/login');
        getEventsHandler();
    }, [])

    return ( 
    <>
        <AnimatePresence initial={false} exitBeforeEnter={true}>
            {updateModalVisible && 
                <UpdateModal 
                    event={selectedEventForUpdate}
                    handleClose={() => setUpdateModalVisible(false)}
                    getEventsHandler={getEventsHandler}
                />
            }
            {alertVisible && 
                <Alert
                    actionOnConfirm={() => 
                        deleteEvent(admin_key, selectedEventForDelete)
                            .then(getEventsHandler)
                            .then(() => setAlertVisible(false))
                    }
                    handleClose={() => setAlertVisible(false)} 
                    text={<h2>Are you sure you want to delete this event?</h2>}
                />
            }
        </AnimatePresence>

        <SideBar/>
        <div className="container">
            <h1>Add event</h1>
            <EventForm 
                onSubmit={(eventName, eventImage) => {
                    addEvent(admin_key, eventName, eventImage)
                        .then(getEventsHandler)
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
                {events.map(event => 
                    <TableRow 
                        key={event.id}
                        event={event} 
                        onDelete={id => {
                            setAlertVisible(true)
                            setSelectedEventForDelete(id)
                        }}
                        onUpdate={event => {
                            setUpdateModalVisible(true)
                            setSelectedEventForUpdate(event)
                        }}
                    />
                )}
            </tbody>
        </table>
    </>
    );
}
export default ManageEvents;