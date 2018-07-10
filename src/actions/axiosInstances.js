import axios from "axios";
import baseURL from  '../baseUrl';


const axioInstance = axios.create({
  baseURL: baseURL
});

export default axioInstance;
