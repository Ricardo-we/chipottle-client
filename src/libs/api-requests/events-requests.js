import axios from "axios";
import { BASE_URL } from '../../App';
import specRequest from "../../libs/spec-request";

const BASE_ENDPOINT = 'chipottle/events';

export default async function getEvents(){
    const response = await axios.get(`${BASE_URL}/${BASE_ENDPOINT}`);
    return response.data;
}

export async  function addEvent(admin_key, eventName, eventImage){
    const formData = new FormData();
    formData.append('key', admin_key);
    formData.append('event-name', eventName);
    formData.append('event-image', eventImage);

    const response = await axios.post(`${BASE_URL}/${BASE_ENDPOINT}`, formData);
    return response;
}

export async function deleteEvent(admin_key, eventId){
    const formData = new FormData();
    formData.append('key', admin_key);

    const response = await specRequest(`${BASE_URL}/${BASE_ENDPOINT}/${eventId}`, 'DELETE', formData);
    return response.data;
}

export async function updateEvent(admin_key, eventId, eventName, eventImage){
    const formData = new FormData();
    formData.append('key', admin_key);
    formData.append('event-name', eventName);
    if(eventImage) formData.append('event-image', eventImage);

    const response = await axios.put(`${BASE_URL}/${BASE_ENDPOINT}/${eventId}`, formData);
    return response.data;
}