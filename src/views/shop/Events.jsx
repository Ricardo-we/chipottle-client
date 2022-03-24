// UTILS
import { useState, useEffect } from "react";
import getEvents from "../../libs/api-requests/events-requests";
// COMPONENTS
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const EventCard = ({ event }) => (
    <div className="card" style={{width: '22rem'}}>
        <img src={event.event_image} className="card-img-top" alt="" style={{objectFit: 'cover'}} />
        <div className="card-body">
            <h2 className="card-title">{event.event_name}</h2>
        </div>
    </div>
)

function Events() {
    const [events, setEvents] = useState([{id:0}]);
    
    const getEventsHandler = async () => {
        const response = await getEvents();
        setEvents(response);
    }

    useEffect(() => {
        getEventsHandler();
    },[])

    return ( 
    <>
        <NavBar/>
        <div className="container d-flex flex-row flex-wrap justify-content-evenly align-items-center">
            {events.map(event => <EventCard key={event.id} event={event}/>)}
        </div>
        <a target="_blank" href="https://wa.link/wnszjw" className="btn btn-success" style={{margin: 'auto'}}>
            <FontAwesomeIcon icon={faWhatsapp}/> Cotizar evento
        </a>
        
    </>
    );
}

export default Events;