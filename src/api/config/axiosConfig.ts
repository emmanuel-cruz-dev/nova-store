import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_API_URL ||
    "https://[tu-id-de-mockapi].mockapi.io/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
