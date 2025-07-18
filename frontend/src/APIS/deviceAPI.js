import axios from "axios"

const URL="http://localhost:8080/api/devices"

export const getDevices= async()=>{
    return await axios.get(`${URL}/`)
}

export const postDevices= async(datos)=>{
    return await axios.get(`${URL}/`, {datos})
}

export const putDevices= async(id)=>{
    return await axios.get(`${URL}/${id}`)
}

export const deleteDevices= async(id)=>{
    return await axios.get(`${URL}/${id}`)
}