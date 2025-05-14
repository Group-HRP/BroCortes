import axios from "axios";

const api = axios.create({
	baseURL: "https://brocortes-api-production.up.railway.app",
	timeout: 10000,
});

export default api;

// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
