import axios from "axios";

const URL = "http://localhost:8080/api/devices";

export const getDevices = async () => {
  return await axios.get(`${URL}/`);
};

export const getDevicesById = async (id) => {
  return await axios.get(`${URL}/${id}`);
};

export const postDevices = async (datos) => {
  return await axios.post(`${URL}/`, datos);
};

export const putDevices = async (id, datos) => {
  console.log(datos);
  console.log(id);
  
  
  return await axios.put(`${URL}/${id}`, datos);
};

export const deleteDevices = async (id) => {
  return await axios.delete(`${URL}/${id}`);
};

export const pauseDevice = async (id) => {
  return await axios.put(`${URL}/pause/${id}`);
};
