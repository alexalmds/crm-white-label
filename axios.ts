import axios from "axios"
export const makeRequest = axios.create({
    baseURL: 'https://api.finsolve.com.br/',
    withCredentials: true
})