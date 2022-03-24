import { BASE_URL } from "../../App";
import axios from "axios";
import specRequest from '../spec-request';

const BASE_ENDPOINT = 'chipottle/sales' 

export default async function getSales(adminKey){
    const formData = new FormData();
    formData.append('key', adminKey);
    
    const response = await specRequest(`${BASE_URL}/${BASE_ENDPOINT}?sold-products=true`, 'POST', formData);
    return response.data
}

export async function getTotalSales(adminKey){
    const formData = new FormData();
    formData.append('key', adminKey);

    const response = await specRequest(`${BASE_URL}/${BASE_ENDPOINT}?totals=true`, 'POST', formData);
    return response.data.total_sales;
}

export async function addSale(adminKey, productId){ 
    const formData = new FormData();
    formData.append('key', adminKey)

    const response = await axios.post(`${BASE_URL}/${BASE_ENDPOINT}/${productId}`, formData);
    return response.data;
}

export async function addSales(products){ 
    try{

        for(let product of products){
            const response = await axios.post(`${BASE_URL}/${BASE_ENDPOINT}/${product.id}`);
        }
        return 'Compra añadida';
    }
    catch{
        return 'Compra fallida'
    }
}

export async function deleteSale(adminKey, saleId, actionOnDelete=() => console.log('Deleted')){
    const formData = new FormData();
    formData.append('key', adminKey)
    
    const response = await specRequest(`${BASE_URL}/${BASE_ENDPOINT}/${saleId}`, 'DELETE', formData);
    actionOnDelete();
    return response.data;
}