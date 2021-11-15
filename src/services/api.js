import axios from "axios";

const Api = axios.create({
    baseURL: 'https://api2.77sol.com.br'
});

export default Api;