import axios from "axios";

const api = axios.create({
	baseURL: "https://brocortes-api-production.up.railway.app",
	timeout: 10000,
});

export default api;