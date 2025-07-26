import axios from "axios"
// import { configDotenv } from "dotenv"
export const axiosInstance = axios.create({
    baseURL :"/api",
    withCredentials: true
})