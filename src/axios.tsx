import axios from "axios";
import { getCookie } from 'typescript-cookie'

const instance = axios.create({
    baseURL: "https://backendproject-0lis.onrender.com"
});


instance.interceptors.request.use((config) => {
    config.headers.token = getCookie("token");
    return config
})

export default instance;