import axios from "axios";
import { toast } from "react-toastify";
export const axiosInstance = axios.create({
    // baseURL: process.env.NODE_ENV=="development"? "https://si-api.sibitec.com/":"https://c.si-app.ir/",
    baseURL:"https://api.coingecko.com/api/v3/",
    headers: {
      Accept: "application/json",
    },
  });
  axiosInstance.interceptors.request.use(function (config) {   
    return config;
  });
  
  axiosInstance.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
        console.log(error)
      if (error.code === "ERR_NETWORK") {
        toast.error("you tried too much, please try after minutes")
        
        
      }
     
      return Promise.reject(error);
    }
  );