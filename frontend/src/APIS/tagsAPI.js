import axios from "axios"

const URL="http://localhost:8080/api/tags"

export const getTags= async()=>{
    return await axios.get(`${URL}/`)
}

export const postTag= async(datos)=>{
    console.log("API tag");
    
    return await axios.post(`${URL}/`, (datos))
}
