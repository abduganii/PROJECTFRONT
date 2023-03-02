import axios from "axios";
import { getCookie } from 'typescript-cookie'

const instance = axios.create({
    baseURL: "http://localhost:9000"
});


instance.interceptors.request.use((config) => {
    config.headers.token = getCookie("token");
    return config
})

export default instance;