import axios from "axios"
import { configDotenv } from "dotenv"
export const axiosInstance = axios.create({
    baseURL :"/api",
    withCredentials: true
})
// export const axiosInstance = axios.create({
//     baseURL :"http://localhost:8005/api",
//     withCredentials: true
// })