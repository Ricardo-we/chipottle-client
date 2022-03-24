import axios from "axios"

export default function specRequest(url, method, data){
    const config = {
        method: method,
        url: url,
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        data: data
    }
    return axios(config)
}
