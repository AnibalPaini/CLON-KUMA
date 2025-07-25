import React from "react";
import { postDevices } from "../APIS/deviceAPI";
import { useState } from "react";

const AgregarDevice = () => {
  const [formCreateDevice, setFormCreateDevice] = useState({
    ip: "",
    name: "",
    isConnected: "",
    notifications: "",
    description: "",
    tag: "",
  });

  const crearDevice = async () => {
    try {
      await postDevices();
    } catch (error) {
      console.log(error);
    }
  };

  const handlerCreateDeviceForm = (e) => {
    const { name, value } = e.target;
    setFormCreateDevice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-gray-400 font-semibold text-3xl mb-6">
        Agregar nuevo dispositivo
      </h2>
      <form className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-5 text-white">
        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="tipo">
            Tipo de monitor
          </label>
          <select
            id="tipo"
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ping">Ping</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="name">
            Nombre del dispositivo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="ip">
            IP del dispositivo
          </label>
          <input
            type="text"
            id="ip"
            name="ip"
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="tag">
            Etiqueta
          </label>
          <input
            type="text"
            name="tag"
            id="tag"
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="description">
            Descripción
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-x-10">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isConnected"
              name="isConnected"
              className="accent-blue-500 w-5 h-5"
            />
            <label htmlFor="isConnected" className="font-medium">
              Conectado?
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="notifications"
              className="accent-blue-500 w-5 h-5"
              name="notifications"
            />
            <label htmlFor="notifications" className="font-medium">
              Notificaciones
            </label>
          </div>
        </div>
        <div className="flex ">
          <button type="submit" className="font-semibold px-4 py-2 text-gray-900 bg-green-400 cursor-pointer">
            Crear dispositivo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarDevice;
