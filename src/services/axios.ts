import axios from "axios";

const api = axios.create({
	baseURL: "https://brocortesapi.shop",
	timeout: 10000,
});

export default api;

// "https://brocortes-api.onrender.com"
