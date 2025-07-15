import axios from "axios";

const api = axios.create({
	baseURL: "https://brocortes-api.onrender.com",
	timeout: 10000,
});

export default api;

// "https://brocortes-api.onrender.com"
