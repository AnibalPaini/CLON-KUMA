import axios from "axios";

const URL = "http://localhost:8080/api/devicesHistory";

export const getHistorial=async(id)=>{
    try {
        console.log("API");
        return await axios.get(`${URL}/${id}`)
    } catch (error) {
        console.log(error);
    }
}