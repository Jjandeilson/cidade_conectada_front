import axios from "axios";

const http = axios.create({
    baseURL: 'https://cidadeconectadateste-production.up.railway.app',
    timeout: 10000
})

export default http