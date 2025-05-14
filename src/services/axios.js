import axios from "axios";

const api = axios.create({
    // baseURL: 'localhost:3333',
    baseURL: 'brocortes-api-production.up.railway.app',
    timeout: 1000,
})

export default api;