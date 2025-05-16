import axios from "axios"
// import { configDotenv } from "dotenv"
export const axiosInstance = axios.create({
    baseURL :import.meta.env.VITE_BASE_URL+"/api",
    withCredentials: true
})