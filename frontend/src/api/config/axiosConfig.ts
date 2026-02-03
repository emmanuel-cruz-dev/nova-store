import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_API_URL ||
    "https://[tu-id-de-mockapi].mockapi.io/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
