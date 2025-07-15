import axios from "axios";

const api = axios.create({
	baseURL: "https://23c09c2ae104.ngrok-free.app",
	timeout: 10000,
});

export default api;

// "https://brocortes-api.onrender.com"
