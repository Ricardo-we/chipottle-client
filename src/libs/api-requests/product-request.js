import axios from "axios";
import { BASE_URL } from "../../App";
import specRequest from "../spec-request";

const BASE_ENDPOINT = 'chipottle/products'

export default async function getProducts(page=''){
    if(page){
        const response = await axios.get(`${BASE_URL}/${BASE_ENDPOINT}?limit=15&page=${page}`); 
        return response.data;
    }
    const response = await axios.get(`${BASE_URL}/${BASE_ENDPOINT}`);
    return response.data
}

export async function getProduct(productId){
    if(!productId) throw new Error('Not product id');
    const response = await axios.get(`${BASE_URL}/${BASE_ENDPOINT}?product-id=${productId}`);
    return response.data
}

export async function addProduct(admin_key, name, price, description, image){ 
    const formData = new FormData();
    formData.append('product-name', name);
    formData.append('product-description', description);
    formData.append('product-price', price);
    formData.append('product-image', image, image.name);
    formData.append('key', admin_key);

    const response = await axios.post(`${BASE_URL}/${BASE_ENDPOINT}`, formData);
    return response.data;
}

export async function deleteProduct(admin_key,productId){
    const formData = new FormData();
    formData.append('key', admin_key);

    const response = await specRequest(`${BASE_URL}/${BASE_ENDPOINT}/${productId}`, 'DELETE', formData);
    return response.data;
}

export async function updateProduct(admin_key, name, price, description, image='', productId){
    const formData = new FormData();
    formData.append('product-name', name);
    formData.append('product-description', description);
    formData.append('product-price', price);
    if(image) formData.append('product-image', image, image.name);
    formData.append('key', admin_key);

    const response = await axios.put(`${BASE_URL}/${BASE_ENDPOINT}/${productId}`, formData);
    return response.data;
}