import axios from "axios"

const URL="http://localhost:8080/api/devicesStats"

export const getDeviceStats= async(id)=>{
    return await axios.get(`${URL}/${id}`)
}

export const getPromediosDevices= async(id)=>{
    return await axios.get(`${URL}/${id}/promedios`)
}
