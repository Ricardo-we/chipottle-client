import axios from "axios";
import { BASE_URL } from "../../App"
import specRequest from "../spec-request";

const BASE_ENDPOINT = 'chipottle/manage-admins';

export default async function adminLogin(username, password, email){
    const formData = new FormData()
    formData.append('username', username)    
    formData.append('password', password)    
    formData.append('email', email)    
    
    const response = await axios.post(`${BASE_URL}/chipottle-admin-login`, formData)
    return await response.data
}

export async function getAdmins(admin_key){
    const formData = new FormData();
    formData.append('key', admin_key);

    const response = await axios.post(`${BASE_URL}/${BASE_ENDPOINT}?get-admins=true`, formData);
    return response.data;
}

export async function addAdmin(admin_key, username, password, email){
    const formData = new FormData();
    formData.append('key', admin_key);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);

    const response = await axios.post(`${BASE_URL}/${BASE_ENDPOINT}`, formData);
    return response.data;
}

export async function updateAdmin(admin_key, username, password, email, adminId){
    const formData = new FormData();
    formData.append('key', admin_key);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);

    const response = await axios.put(`${BASE_URL}/${BASE_ENDPOINT}/${adminId}`, formData);
    return response.data;
}

export async function deleteAdmin(admin_key, adminId){
    const formData = new FormData();
    formData.append('key', admin_key);
    
    const response = await specRequest(`${BASE_URL}/${BASE_ENDPOINT}/${adminId}`, 'DELETE', formData);
    return response.data;
}