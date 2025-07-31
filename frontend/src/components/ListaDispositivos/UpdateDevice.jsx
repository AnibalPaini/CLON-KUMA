import React, { useEffect, useState } from "react";
import { putDevices } from "../../APIS/deviceAPI";

const UpdateDevice = ({ updateDevice, setUpdateDevice }) => {
  const [formUpdateDevice, setFormUpdateDevice] = useState({
    ip: "",
    name: "",
    isConnected: false,
    notifications: false,
    description: "",
    tag: "",
  });

  useEffect(() => {
    if (updateDevice) {
      setFormUpdateDevice({
        ip: updateDevice.ip || "",
        name: updateDevice.name || "",
        isConnected: updateDevice.isConnected || false,
        notifications: updateDevice.notifications || false,
        description: updateDevice.description || "",
        tag: updateDevice.tag || "",
      });
    }
  }, [updateDevice]);

  const handlerUpdateDeviceForm = (e) => {
    const { name, type, value, checked } = e.target;

    setFormUpdateDevice((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const actualizarDevice = async () => {
    try {
      await putDevices(updateDevice._id, formUpdateDevice);
      setUpdateDevice(null)
    } catch (error) {}
  };
  return (
    <div>
      <h2 className="text-gray-400 font-semibold text-3xl mb-6">Editar</h2>
      <form
        className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-5 text-white"
        onSubmit={(e) => {
          e.preventDefault();
          actualizarDevice();
        }}
      >
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
            value={formUpdateDevice.name}
            name="name"
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handlerUpdateDeviceForm}
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
            value={formUpdateDevice.ip}
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handlerUpdateDeviceForm}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="tag">
            Etiqueta
          </label>
          <input
            type="text"
            name="tag"
            value={formUpdateDevice.tag}
            id="tag"
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handlerUpdateDeviceForm}
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
            value={formUpdateDevice.description}
            className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handlerUpdateDeviceForm}
          />
        </div>

        <div className="flex gap-x-10">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isConnected"
              name="isConnected"
              checked={formUpdateDevice.isConnected}
              className="accent-blue-500 w-5 h-5"
              onChange={handlerUpdateDeviceForm}
            />
            <label htmlFor="isConnected" className="font-medium">
              Conectado?
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="notifications"
              checked={formUpdateDevice.notifications}
              className="accent-blue-500 w-5 h-5"
              name="notifications"
              onChange={handlerUpdateDeviceForm}
            />
            <label htmlFor="notifications" className="font-medium">
              Notificaciones
            </label>
          </div>
        </div>
        <div className="flex ">
          <button
            type="submit"
            className="font-semibold px-4 py-2 text-gray-900 bg-green-400 cursor-pointer"
          >
            Actualizar dispositivo
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDevice;
